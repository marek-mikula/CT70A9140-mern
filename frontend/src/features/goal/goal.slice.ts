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

export const getGoals = createAsyncThunk<
    Goal[],
    unknown,
    {rejectValue: string}
>('goal/getGoals', async (_, thunkAPI) => {
    try {
        // @ts-ignore
        const token = thunkAPI.getState().auth.user.token
        return await goalService.getGoals(token)
    } catch (error: any) {
        const message = error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const deleteGoal = createAsyncThunk<
    string,
    string,
    {rejectValue: string}
>('goal/deleteGoal', async (id, thunkAPI) => {
    try {
        // @ts-ignore
        const token = thunkAPI.getState().auth.user.token
        return await goalService.deleteGoal(id, token)
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
            .addCase(getGoals.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getGoals.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.goals = action.payload
            })
            .addCase(getGoals.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload || action.error.message || 'Unknown error'
            })
            .addCase(deleteGoal.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteGoal.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.goals = state.goals.filter(item => item.id !== action.payload)
            })
            .addCase(deleteGoal.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload || action.error.message || 'Unknown error'
            })
    }
})

export const {reset}  = goalSlice.actions

export default goalSlice.reducer
