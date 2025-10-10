import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";

const appStore = configureStore({
    reducer: {
        user: userSlice
    }
})

export default appStore;