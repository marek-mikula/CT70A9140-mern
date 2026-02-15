import {configureStore} from "@reduxjs/toolkit";
import authReducer from "../features/auth/auth.slice.ts";
import goalReducer from '../features/goal/goal.slice.ts'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        goal: goalReducer
    }
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
