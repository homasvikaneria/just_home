import { createSlice } from "@reduxjs/toolkit";

// Load initial state from localStorage
const initialUser = JSON.parse(localStorage.getItem("user")) || null;
const initialToken = localStorage.getItem("token") || null;

const initialState = {
    user: initialUser,
    token: initialToken,
    listings: [],
};

// User Slice
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            localStorage.setItem("user", JSON.stringify(action.payload.user));
            localStorage.setItem("token", action.payload.token);
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        },
    },
});

// Listings Slice
export const listingsSlice = createSlice({
    name: "listings",
    initialState: { listings: [] },
    reducers: {
        setListings: (state, action) => {
            state.listings = action.payload.listings;
        },
    },
});

export const { setLogin, setLogout } = userSlice.actions;
export const { setListings } = listingsSlice.actions;

export const userReducer = userSlice.reducer;
export const listingsReducer = listingsSlice.reducer;
