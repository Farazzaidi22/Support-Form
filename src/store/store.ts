// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./formSlice"; // Import the reducer from your slice

export const store = configureStore({
  reducer: {
    form: formReducer, // Add your form slice reducer here
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
