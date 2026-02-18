import {configureStore} from "@reduxjs/toolkit";
import authReducer from "../features/auth/auth.slice.ts";
import flowerReducer from '../features/flower/flower.slice.ts'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        flower: flowerReducer
    }
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
