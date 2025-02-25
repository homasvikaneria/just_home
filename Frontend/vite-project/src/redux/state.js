// Frontend/vite-project/src/redux/state.js
import { createSlice } from "@reduxjs/toolkit";

// Load initial state from localStorage safely
const initialUser = JSON.parse(localStorage.getItem("user")) || null;
const initialToken = localStorage.getItem("token") || null;

// 🔹 User Slice
const userSlice = createSlice({
    name: "user",
    initialState: {
        user: initialUser,
        token: initialToken,
    },
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

// 🔹 Listings Slice
const listingsSlice = createSlice({
    name: "listings",
    initialState: { listings: [] },
    reducers: {
        setListings: (state, action) => {
            state.listings = action.payload;
        },
    },
});

// ✅ Export actions
export const { setLogin, setLogout } = userSlice.actions;
export const { setListings } = listingsSlice.actions;

// ✅ Export reducers correctly
export const userReducer = userSlice.reducer;
export const listingsReducer = listingsSlice.reducer; // ✅ Ensure this export exists
