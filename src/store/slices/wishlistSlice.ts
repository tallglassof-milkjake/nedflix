import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store/store";

const initialState: Wishlist = {
    items: JSON.parse(localStorage.getItem('wishlist') || '[]'),
};

/**
 * Slice for managing the wishlist state in the Redux store.
 * This slice includes actions to add items to the wishlist, remove items from the wishlist,
 * and load the wishlist from local storage.
 *
 * @constant
 * @type {Object}
 * @property {string} name - The name of the slice.
 * @property {Object} initialState - The initial state of the slice.
 * @property {Array} initialState.items - An array of items in the wishlist.
 * @property {Object} reducers - The reducer functions to handle actions related to the wishlist.
 * @property {function} reducers.addToWishlist - Adds a new item to the wishlist if it does not already exist.
 * @property {function} reducers.removeFromWishlist - Removes an item from the wishlist by its IMDb ID.
 * @property {function} reducers.loadWishlist - Loads the wishlist from local storage into the state.
 */
const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addToWishlist(state, action: PayloadAction<Record<string, any>>) {
            const newItem = action.payload;
            const existingItem = state.items.find((item: any) => item.imdbID === newItem.imdbID);

            if (!existingItem) {
                state.items.push(newItem);
                localStorage.setItem('wishlist', JSON.stringify(state.items));
            }
        },
        removeFromWishlist(state, action: PayloadAction<string>) {
            state.items = state.items.filter((item: any) => item.imdbID !== action.payload);
            localStorage.setItem('wishlist', JSON.stringify(state.items));
        },
        loadWishlist(state) {
            const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
            state.items = savedWishlist;
        },
    },
});

export const { addToWishlist, removeFromWishlist, loadWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;

export const selectWishlistItems = (state: RootState) => state.wishlist.items;