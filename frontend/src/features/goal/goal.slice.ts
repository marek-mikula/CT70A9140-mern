import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type {Goal, StoreGoalData} from "./goal.type.ts";
import goalService from "./goal.service.ts";

interface GoalState {
    goals: Goal[]
    isError: boolean
    isSuccess: boolean
    isLoading: boolean
    message: string
}

const initialState: GoalState = {
    goals: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const storeGoal = createAsyncThunk<
    Goal,
    StoreGoalData,
    {rejectValue: string}
>('goal/store', async (data, thunkAPI) => {
    try {
        // @ts-ignore
        const token = thunkAPI.getState().auth.user.token
        return await goalService.store(data, token)
    } catch (error: any) {
        const message = error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

const goalSlice = createSlice({
    name: 'goal',
    initialState,
    reducers: {
        reset: (state) => {
            state.goals = []
            state.isError = false
            state.isSuccess = false
            state.isLoading = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(storeGoal.pending, (state) => {
                state.isLoading = true
            })
            .addCase(storeGoal.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.goals.push(action.payload)
            })
            .addCase(storeGoal.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload || action.error.message || 'Unknown error'
            })
    }
})

export const {reset}  = goalSlice.actions

export default goalSlice.reducer
