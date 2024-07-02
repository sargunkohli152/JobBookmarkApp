import { applyMiddleware, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { thunk } from 'redux-thunk';
import rootReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['bookmarks'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [thunk];

export const store = createStore(persistedReducer, applyMiddleware(...middleware));
export const persistor = persistStore(store);

export default{ store, persistor };
