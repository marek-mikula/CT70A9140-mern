import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import authService from "./auth.service.ts";
import type {User, UserData, UserWithToken} from "./auth.type.ts";

interface AuthState {
    user: User | null
    isError: boolean
    isSuccess: boolean
    isLoading: boolean
    message: string
}

const initialState: AuthState = {
    user: authService.getStoredUser() ?? null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const register = createAsyncThunk<UserWithToken, UserData, {rejectValue: string}>('auth/register', async (data, thunkAPI) => {
    try {
        return await authService.register(data)
    } catch (error: any) {
        const message = error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false
            state.isSuccess = false
            state.isLoading = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload || action.error.message || 'Unknown error'
            })
    }
})

export const {reset}  = authSlice.actions

export default authSlice.reducer
