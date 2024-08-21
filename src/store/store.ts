// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import omdbReducer from './slices/omdbSlice';

const store = configureStore({
    reducer: {
        omdb: omdbReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
