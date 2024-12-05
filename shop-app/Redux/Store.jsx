import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import shoppingListReducer from './ShoppingListSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['items'] 
};

const persistedReducer = persistReducer(persistConfig, shoppingListReducer);

export const store = configureStore({
  reducer: {
    shoppingList: persistedReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export const persistor = persistStore(store);