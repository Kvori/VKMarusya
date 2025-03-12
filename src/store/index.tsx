import { configureStore } from "@reduxjs/toolkit";
import { favoritesReducer, modalReducer, profileReducer } from "./slices";

const store = configureStore({
    reducer: {
        profile: profileReducer,
        modal: modalReducer,
        favorites: favoritesReducer
    }
})

export default store;