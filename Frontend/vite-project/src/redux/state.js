// Frontend/vite-project/src/redux/state.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    listings: [] // ✅ Add listings state
};

// User Slice
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
    },
});

// Listings Slice
export const listingsSlice = createSlice({
    name: "listings",
    initialState,
    reducers: {
        setListings: (state, action) => {
            state.listings = action.payload.listings;
        },
    },
});

export const { setLogin } = userSlice.actions;
export const { setListings } = listingsSlice.actions; // ✅ Export setListings

export default listingsSlice.reducer;
