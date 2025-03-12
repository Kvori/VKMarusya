import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name: 'profile',
    initialState: null,
    reducers: {
        setProfile: (state, action) => state = action.payload
    }
})

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: null,
    reducers: {
        setFavorites: (state, action) => state = action.payload
    }
})

const modalSlice = createSlice({
    name: 'modal',
    initialState: false,
    reducers: {
        modalLoginState: (state) => state = !state
    }
})

export const { setProfile } = profileSlice.actions;
export const { modalLoginState } = modalSlice.actions;
export const { setFavorites } = favoritesSlice.actions;

export const profileReducer = profileSlice.reducer;
export const modalReducer = modalSlice.reducer;
export const favoritesReducer = favoritesSlice.reducer;