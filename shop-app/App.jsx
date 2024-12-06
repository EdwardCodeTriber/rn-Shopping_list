import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { store, persistor } from './Redux/shopstore';
import ShoppingList from './screens/ShoppingList';
import ItemsList from './screens/ItemsList'; 

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: '#2D2E37', // Change this to your desired color
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                textAlign: 'center',
                alignSelf: 'center',
              },
              headerTintColor: '#ffffff', // Color of the back button and title
              headerTitleAlign: 'center', // This ensures the title is centered
            }}
          >
            <Stack.Screen 
              name="Categories" 
              component={ShoppingList} 
              options={{ 
                title: 'Shopping Categories',
              }}
            />
            <Stack.Screen 
              name="ItemsList" 
              component={ItemsList} 
              options={({ route }) => ({ 
                title: `${route.params.category.name} Items` 
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}