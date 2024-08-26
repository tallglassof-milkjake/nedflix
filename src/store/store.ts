import { configureStore } from '@reduxjs/toolkit';
import omdbReducer from './slices/omdbSlice';
import wishlistReducer from './slices/wishlistSlice';

const loadState = () => {
    try {
        const serialisedState = localStorage.getItem('wishlist');
        if (serialisedState === null) {
            return undefined;
        }
        return JSON.parse(serialisedState);
    } catch(error) {
        console.error('Cannot load state', error);
        return undefined;
    }
};

const saveState = (state: any) => {
    try {
        const serialisedState = JSON.stringify(state.wishlist.items);
        localStorage.setItem('wishlist', serialisedState);
    } catch(error) {
        console.error('Cannot save state', error);
        return undefined;
    }
};

const preloadedState = {
    wishlist: {
        items: loadState() || [],
    },
};

const store = configureStore({
    reducer: {
        omdb: omdbReducer,
        wishlist: wishlistReducer,
    },
});

store.subscribe(() => {
    saveState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;