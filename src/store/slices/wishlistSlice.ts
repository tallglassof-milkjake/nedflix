import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store/store";

interface Wishlist {
    items: Record<string, any>;
}

const initialState: Wishlist = {
    items: [],
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
            }
        },
        removeFromWishlist(state, action: PayloadAction<string>) {
            state.items = state.items.filter((item: any) => item.imdbID !== action.payload);
        },
        loadWishlist(state, action: PayloadAction<Record<string, any>>) {
            state.items = action.payload;
        },
    },
});

export const { addToWishlist, removeFromWishlist, loadWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;

export const selectWishlistItems = (state: RootState) => state.wishlist.items;