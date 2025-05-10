import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { adminReducer } from './admin/adminSlice';
import studentReducer from './student/studentSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Correct import for storage

// Combine all reducers
const rootReducer = combineReducers({ 
  admin: adminReducer,
  student: studentReducer, // Add the student reducer
});

// Configure persist
const adminPersistConfig = {
  key: 'root',
  storage,
  version: 1,
};

// Apply persistReducer to the root reducer
const adminPersistedReducer = persistReducer(adminPersistConfig, rootReducer);

// Configure the store
export const store = configureStore({
  reducer: adminPersistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Configure persistor
export const persistor = persistStore(store);
