import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { FAB, Text, Chip } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import TaskItem from '../components/TaskItem';
import AddEditTaskModal from '../components/AddEditTaskModal';
import { loadTasksFromStorage, saveTasks } from '../redux/tasksSlice';

const TaskListScreen = () => {
const [modalVisible, setModalVisible] = useState(false);
const [editingTask, setEditingTask] = useState(null);
const [filter, setFilter] = useState('All');
const tasks = useSelector(state => state.tasks.tasks);
const dispatch = useDispatch();
// Load tasks from storage on component mount
useEffect(() => {
dispatch(loadTasksFromStorage());
}, []);
// Save tasks to storage whenever tasks change
useEffect(() => {
dispatch(saveTasks(tasks));
}, [tasks]);
// Filter tasks based on selected filter
const filteredTasks = tasks.filter(task => {
switch (filter) {
case 'Active':
return !task.completed;
case 'Completed':
return task.completed;
default:
return true;
}
});
// Open modal for editing a task
const handleEditTask = (task) => {
setEditingTask(task);
setModalVisible(true);
};
// Render empty list component
const renderEmptyList = () => (
<View style={styles.emptyContainer}>
<Text variant="titleMedium">No tasks found</Text>
<Text variant="bodySmall">Add a new task to get started!</Text>
</View>
);
return (
<View style={styles.container}>
{/* Filter Chips */}
<View style={styles.filterContainer}>
    
{['All', 'Active', 'Completed'].map(filterOption => (
<Chip
key={filterOption}
selected={filter === filterOption}
onPress={() => setFilter(filterOption)}
style={styles.filterChip}
>
{filterOption}
</Chip>
))}
</View>
{/* Task List */}
<FlatList
data={filteredTasks}
keyExtractor={(item) => item.id}
renderItem={({ item }) => (
  <TaskItem 
    task={item} 
    onEditPress={handleEditTask} 
  />
)}
ListEmptyComponent={renderEmptyList}
contentContainerStyle={styles.listContainer}
/>

{/* Add Task Floating Action Button */}
<FAB
icon="plus"
style={styles.fab}
onPress={() => {
  setEditingTask(null);
  setModalVisible(true);
}}
/>

{/* Add/Edit Task Modal */}
<AddEditTaskModal
visible={modalVisible}
onDismiss={() => {
  setModalVisible(false);
  setEditingTask(null);
}}
existingTask={editingTask}
/>
</View>
);
};
const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#f4f4f4',
},
filterContainer: {
flexDirection: 'row',
justifyContent: 'center',
padding: 10,
backgroundColor: 'white',
},
filterChip: {
marginHorizontal: 5,
},
listContainer: {
paddingBottom: 80, // Space for FAB
},
emptyContainer: {
flex: 1,
justifyContent: 'center',
alignItems: 'center',
marginTop: 50,
},
fab: {
position: 'absolute',
margin: 16,
right: 0,
bottom: 0,
},
});
export default TaskListScreen