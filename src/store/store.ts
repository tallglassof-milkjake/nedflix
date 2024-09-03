import { configureStore } from '@reduxjs/toolkit';
import omdbReducer from './slices/omdbSlice';
import wishlistReducer from './slices/wishlistSlice';

/**
 * Gets a list of wishlist items from the local storage
 * 
 * @returns {Wishlist | undefined}
 */
const loadState = (): Wishlist | undefined => {
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

/**
 * Serialises the selected items and saves them to local storage
 * 
 * @param state Object containing the state of both stores (wishlist & omdb)
 * @param state.omdb - The state of the OMDB
 * @param state.wishlist - Wishlist slice state
 * @param state.wishlist.items - The wishlist items array
 * 
 * @returns {void}
 */
const saveState = (state: { omdb: OMDBState, wishlist: Wishlist }): void => {
    try {
        const serialisedState = JSON.stringify(state.wishlist.items);
        localStorage.setItem('wishlist', serialisedState);
    } catch(error) {
        console.error('Cannot save state', error);
        return undefined;
    }
};

// Preload existing wishlist or empty array
const preloadedState = {
    wishlist: {
        items: loadState() || [],
    },
};

/**
 * Redux store configuration with omdb and wishlist reducers and preloaded
 * state.
 * 
 * @param {Object} options - Configuration options for store.
 * @param {Object} options.reducer - Object containing Redux reducers
 * @param {Function} options.reducer.omdb - Reducer for OMDB
 * @param {Function} options.reducer.wishlist - Reducer for wishlist
 * @param {Object} options.preloadedState - iInitial state for the store
 * @param {Object} options.preloadedState.wishlist - The initial wishlist state
 * @param {Array} options.preloadedState.wishlist.items - The initial wishlist items
 *
 * @returns {Store} A configured Redux store
 */
const store = configureStore({
    reducer: {
        omdb: omdbReducer,
        wishlist: wishlistReducer,
    },
    preloadedState
});

// subscribe to changes to save the wishlist to local storage
store.subscribe(() => {
    saveState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;