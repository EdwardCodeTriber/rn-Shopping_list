import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import categoryReducer from './categorySlice';
import itemsReducer from './itemsSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['categories', 'items']
};

const rootReducer = combineReducers({
  categories: categoryReducer,
  items: itemsReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export const persistor = persistStore(store);