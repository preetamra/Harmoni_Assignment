import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { 
  Card, 
  Text, 
  Checkbox, 
  IconButton, 
  Switch 
} from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { 
  deleteTask, 
  toggleTaskCompletion, 
  updateTask 
} from '../redux/tasksSlice';

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'High':
      return 'red';
    case 'Medium':
      return 'orange';
    case 'Low':
      return 'green';
    default:
      return 'gray';
  }
};

const TaskItem = ({ task, onEditPress }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };

  const handleToggleComplete = () => {
    dispatch(toggleTaskCompletion(task.id));
  };

  return (
    <Card style={[
      styles.card, 
      { 
        opacity: task.completed ? 0.5 : 1,
        borderLeftColor: getPriorityColor(task.priority),
        borderLeftWidth: 5
      }
    ]}>
      <View style={styles.taskContainer}>
        <View style={styles.checkboxContainer}>
          <Checkbox
            status={task.completed ? 'checked' : 'unchecked'}
            onPress={handleToggleComplete}
          />
        </View>
        
        <View style={styles.taskDetails}>
          <Text 
            variant="titleMedium" 
            style={{ 
              textDecorationLine: task.completed ? 'line-through' : 'none' 
            }}
          >
            {task.title}
          </Text>
          <Text variant="bodySmall">{task.description}</Text>
          <Text variant="bodySmall" style={{ color: getPriorityColor(task.priority) }}>
            Priority: {task.priority}
          </Text>
        </View>
        
        <View style={styles.actionButtons}>
          <IconButton 
            icon="pencil" 
            onPress={() => onEditPress(task)} 
          />
          <IconButton 
            icon="delete" 
            onPress={handleDelete} 
            color="red" 
          />
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  checkboxContainer: {
    marginRight: 8,
  },
  taskDetails: {
    flex: 1,
    marginRight: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default TaskItem;