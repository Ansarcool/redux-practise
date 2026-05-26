import {configureStore} from "@reduxjs/toolkit";
import {reducer} from "./slices.ts";
export const store = configureStore({
    reducer: reducer
})
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof reducer>;
