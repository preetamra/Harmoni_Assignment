import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { 
  Modal, 
  Portal, 
  Text, 
  TextInput, 
  Button,
  RadioButton 
} from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { addTask, updateTask } from '../redux/tasksSlice';

const AddEditTaskModal = ({ 
  visible, 
  onDismiss, 
  existingTask = null 
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const dispatch = useDispatch();

  useEffect(() => {
    // Populate form if editing an existing task
    if (existingTask) {
      setTitle(existingTask.title);
      setDescription(existingTask.description);
      setPriority(existingTask.priority);
    } else {
      // Reset form for new task
      setTitle('');
      setDescription('');
      setPriority('Medium');
    }
  }, [existingTask, visible]);

  const handleSubmit = () => {
    // Validate inputs
    if (!title.trim()) {
      return;
    }

    if (existingTask) {
      // Update existing task
      dispatch(updateTask({
        id: existingTask.id,
        updates: { title, description, priority }
      }));
    } else {
      // Add new task
      dispatch(addTask({ title, description, priority }));
    }

    // Close modal and reset form
    onDismiss();
  };

  return (
    <Portal>
      <Modal 
        visible={visible} 
        onDismiss={onDismiss}
        contentContainerStyle={styles.modalContainer}
      >
        <Text variant="headlineSmall" style={styles.modalTitle}>
          {existingTask ? 'Edit Task' : 'Add New Task'}
        </Text>

        <TextInput
          label="Title"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
          mode="outlined"
        />

        <TextInput
          label="Description"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
          mode="outlined"
          multiline
          numberOfLines={3}
        />

        <View style={styles.priorityContainer}>
          <Text>Priority:</Text>
          <RadioButton.Group 
            onValueChange={newValue => setPriority(newValue)} 
            value={priority}
          >
            <View style={styles.radioGroup}>
              <View style={styles.radioItem}>
                <RadioButton value="Low" />
                <Text>Low</Text>
              </View>
              <View style={styles.radioItem}>
                <RadioButton value="Medium" />
                <Text>Medium</Text>
              </View>
              <View style={styles.radioItem}>
                <RadioButton value="High" />
                <Text>High</Text>
              </View>
            </View>
          </RadioButton.Group>
        </View>

        <View style={styles.buttonContainer}>
          <Button 
            mode="contained" 
            onPress={handleSubmit}
            disabled={!title.trim()}
          >
            {existingTask ? 'Update Task' : 'Add Task'}
          </Button>
          <Button 
            mode="outlined" 
            onPress={onDismiss}
            style={styles.cancelButton}
          >
            Cancel
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  modalTitle: {
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  priorityContainer: {
    marginBottom: 16,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'column',
    gap: 10,
  },
  cancelButton: {
    marginTop: 10,
  },
});

export default AddEditTaskModal;