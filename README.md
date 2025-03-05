# Task Management App

## Overview
A mobile task management application built with React Native, Expo, Redux Toolkit, and React Native Paper. The app allows users to create, edit, delete, and track tasks with priority levels and completion status.

## Features
- Add new tasks with title, description, and priority
- Edit existing tasks
- Delete tasks
- Mark tasks as completed
- Filter tasks (All, Active, Completed)
- Persistent storage using AsyncStorage
- Responsive and clean UI with React Native Paper

## Prerequisites
- Node.js (v16 or later)
- npm (v8 or later)
- Expo CLI
- Smartphone or Emulator (Expo Go recommended)

## Installation Steps

### 1. Clone the Repository
```bash
git clone https://your-repository-url.git
cd task-management-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Development Server
```bash
npx expo start
```

## Running the App

### Using Expo Go (Recommended)
1. Install Expo Go on your smartphone
   - iOS: App Store
   - Android: Google Play Store
2. Scan the QR code displayed in the terminal when you run `npx expo start`

### Using Emulator/Simulator
- For Android: Press `a` in the terminal
- For iOS: Press `i` in the terminal

![Demo](https://imgur.com/a/YfBw6hG)

## Project Structure
```
task-management-app/
│
├── src/
│   ├── components/
│   │   ├── TaskItem.js         # Individual task display component
│   │   └── AddEditTaskModal.js # Modal for adding/editing tasks
│   │
│   ├── screens/
│   │   └── TaskListScreen.js   # Main screen displaying task list
│   │
│   ├── redux/
│   │   ├── store.js            # Redux store configuration
│   │   └── tasksSlice.js       # Redux slice for task management
│   │
│   └── navigation/
│       └── AppNavigator.js     # App navigation setup
│
├── App.js                      # Main application entry point
└── package.json                # Project dependencies and scripts
```

## State Management
- **Redux Toolkit**: Manages application state
- **Async Storage**: Provides persistent local storage for tasks
- **Slices**: Organized actions and reducers for task operations

## UI Components
- **React Native Paper**: Provides pre-built, customizable UI components
- **Responsive Design**: Adaptive layout for different device sizes