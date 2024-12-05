import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './Redux/Store';
import ShoppingListScreen from './screens/ShoppingListScreen';
import ShoppingList from './screens/ShoppingList';
import { SafeAreaView, StyleSheet } from 'react-native';
import HouseholdScreen from './screens/HouseholdList';

export default function App() {
  return (
    // <Provider store={store}>
    //   <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={styles.container}>
           {/* <ShoppingListScreen />  */}
            <ShoppingList/>
            <HouseholdScreen />
        </SafeAreaView>
    //   </PersistGate>
    // </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
