import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store/store";

interface Wishlist {
    items: Record<string, any>;
}

const initialState: Wishlist = {
    items: JSON.parse(localStorage.getItem('wishlist') || '[]'),
};

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