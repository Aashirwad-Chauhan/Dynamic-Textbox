import { configureStore } from '@reduxjs/toolkit';
import textBoxReducer from './textBoxSlice';

export const store = configureStore({
  reducer: {
    textBox: textBoxReducer
  }
});