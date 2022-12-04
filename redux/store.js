import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./filterSlice";
import settings from "./settings";




export const store = configureStore({
    reducer: {
        filter: filterSlice,
        settings: settings
    }
})