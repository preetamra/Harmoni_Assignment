import { createSlice, nanoid } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: []
  },
  reducers: {
    addTask: {
      reducer: (state, action) => {
        state.tasks.push(action.payload);
      },
      prepare: ({ title, description, priority }) => ({
        payload: {
          id: nanoid(),
          title,
          description,
          priority,
          completed: false,
          createdAt: new Date().toISOString()
        }
      })
    },
    updateTask: (state, action) => {
      const { id, updates } = action.payload;
      const taskToUpdate = state.tasks.find(task => task.id === id);
      if (taskToUpdate) {
        Object.assign(taskToUpdate, updates);
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    toggleTaskCompletion: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    loadTasks: (state, action) => {
      state.tasks = action.payload;
    }
  }
});

// Async action to save tasks to AsyncStorage
export const saveTasks = (tasks) => async () => {
  try {
    await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks', error);
  }
};

// Async action to load tasks from AsyncStorage
export const loadTasksFromStorage = () => async (dispatch) => {
  try {
    const storedTasks = await AsyncStorage.getItem('tasks');
    if (storedTasks) {
      dispatch(loadTasks(JSON.parse(storedTasks)));
    }
  } catch (error) {
    console.error('Error loading tasks', error);
  }
};

export const { 
  addTask, 
  updateTask, 
  deleteTask, 
  toggleTaskCompletion,
  loadTasks 
} = tasksSlice.actions;

export default tasksSlice.reducer;