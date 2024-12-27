import {configureStore} from '@reduxjs/toolkit';
import logger from 'redux-logger';

import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import {IRecipesDataType, recipesDataReducer} from './slices/recipesSection';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Update Store item interface here
export interface IStore {
  recipesData: IRecipesDataType;
}
// Add new reducers here
const Reducers = combineReducers({
  recipesData: recipesDataReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, Reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
