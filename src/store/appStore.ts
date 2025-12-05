import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";

import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // stores in localStorage
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

// ---------------------
// Persist Configuration
// ---------------------
const persistConfig = {
  key: "root",
  storage,
};

// ---------------------
// Combine All Reducers
// ---------------------
const rootReducer = combineReducers({
  user: userSlice,
});

// Wrap reducers with persist
const persistedReducer = persistReducer(persistConfig, rootReducer);

// ---------------------
// Create Store
// ---------------------
export const appStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Persistor to use in main.tsx
export const persistor = persistStore(appStore);

// Infer Types
export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;