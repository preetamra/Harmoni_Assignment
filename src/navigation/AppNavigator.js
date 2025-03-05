import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '../redux/store';
import TaskListScreen from '../screens/TaskListScreen';
// Create a stack navigator
const Stack = createNativeStackNavigator();
const AppNavigator = () => {
return (
<ReduxProvider store={store}>
<PaperProvider>
<NavigationContainer>
<Stack.Navigator
initialRouteName="TaskList"
screenOptions={{
headerStyle: {
backgroundColor: '#f4f4f4',
},
headerTintColor: '#333',
headerTitleStyle: {
fontWeight: 'bold',
},
}}
>
<Stack.Screen
name="TaskList"
component={TaskListScreen}
options={{
title: 'My Tasks',
headerTitle: 'Task Management App'
}}
/>
{/* You can add more screens here in the future */}
</Stack.Navigator>
</NavigationContainer>
</PaperProvider>
</ReduxProvider>
);
};
export default AppNavigator