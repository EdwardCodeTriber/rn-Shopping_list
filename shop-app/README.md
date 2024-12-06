## Shopping List App
 -A simple and user-friendly React Native Expo application for managing your shopping list. The app uses Redux for state management and AsyncStorage for data persistence.

## Features
 - Add Items
 - Add items to the shopping list with a name and quantity.

## Edit Items
 - Update the details of any item in the list.

## Delete Items
 - Remove items from the list with ease.

## Mark Items as Purchased
 - Use checkboxes to mark items as purchased.

## Persistent Storage
 -Save your shopping list locally and restore it when you reopen the app.

## User Feedback
 - Get visual feedback when actions are performed (e.g., adding, editing, or deleting items).

## Getting Started
## Prerequisites
 - Node.js and npm installed.
 - Expo CLI installed globally:
 - bash
# Copy code
 - npm install -g expo-cli
## Installation
## Clone the repository:

bash
Copy code
 - git clone https://github.com/your-repo/shopping-list-app.git
 - cd shopping-list-app
## Install dependencies:

bash
Copy code
 - npm install
## Start the development server:

 - bash
 - Copy code
 - expo start
 - Scan the QR code displayed in the terminal using the Expo Go app on your phone (available on iOS and Android) or run the app on an emulator.

## Project Structure
plaintext
Copy code
ShoppingListApp/
├── src/
│   ├── components/      # Reusable React components
│   ├── redux/           # Redux setup: actions, reducers, and store
│   ├── screens/         # App screens
│   ├── utils/           # Utility functions (e.g., AsyncStorage handlers)
│   └── App.js           # Entry point of the app
├── App.js               # Root of the project
└── package.json         # Project configuration
## State Management (Redux)
 - Actions: Define how the state can be modified (e.g., addItem, editItem, deleteItem).
 - Reducer: Update the state based on the dispatched actions.
 - Store: Centralized location for the app’s state.
## Persistence
 - The app uses AsyncStorage to store the shopping list locally. It automatically loads saved items when the app restarts.

## Feedback and Error Handling
 - React Native Toasts: Provide visual feedback for actions like adding or deleting items.
 - Validation: Display error messages if the user tries to perform invalid actions (e.g., adding an empty item).
## Running Tests
 - Currently, no tests are implemented. You can set up testing using Jest and React Native Testing Library:

 - bash
 - Copy code
 - npm install --save-dev jest @testing-library/react-native
Built With
React Native
Expo
Redux
AsyncStorage

## Figma Design
 - https://www.figma.com/design/kIpIdUV8CBDxdwZIDzKTDF/Shopping-List-UI?node-id=0-1&node-type=canvas&t=IaFd6uT4qH4Dhaaw-0
## Documentation
 - https://docs.google.com/document/d/1RHgitrZBY5IWrULfsCvxrzJ3m2rK2KMapPOb0Bslq7k/edit?usp=sharing