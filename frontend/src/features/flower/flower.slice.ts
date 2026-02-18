import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type {Flower, StoreFlowerData} from "./flower.type.ts";
import flowerService from "./flower.service.ts";

interface FlowerState {
    flowers: Flower[]
    isError: boolean
    isSuccess: boolean
    isLoading: boolean
    message: string
}

const initialState: FlowerState = {
    flowers: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const storeFlower = createAsyncThunk<
    Flower,
    StoreFlowerData,
    {rejectValue: string}
>('flower/store', async (data, thunkAPI) => {
    try {
        // @ts-ignore
        const token = thunkAPI.getState().auth.user.token
        return await flowerService.store(data, token)
    } catch (error: any) {
        const message = error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const listFlowers = createAsyncThunk<
    Flower[],
    unknown,
    {rejectValue: string}
>('flower/list', async (_, thunkAPI) => {
    try {
        // @ts-ignore
        const token = thunkAPI.getState().auth.user.token
        return await flowerService.list(token)
    } catch (error: any) {
        const message = error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const deleteFlower = createAsyncThunk<
    string,
    string,
    {rejectValue: string}
>('flower/delete', async (id, thunkAPI) => {
    try {
        // @ts-ignore
        const token = thunkAPI.getState().auth.user.token
        return await flowerService.delete(id, token)
    } catch (error: any) {
        const message = error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

const flowerSlice = createSlice({
    name: 'flower',
    initialState,
    reducers: {
        reset: (state) => {
            state.flowers = []
            state.isError = false
            state.isSuccess = false
            state.isLoading = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(storeFlower.pending, (state) => {
                state.isLoading = true
            })
            .addCase(storeFlower.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.flowers.push(action.payload)
            })
            .addCase(storeFlower.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload || action.error.message || 'Unknown error'
            })
            .addCase(listFlowers.pending, (state) => {
                state.isLoading = true
            })
            .addCase(listFlowers.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.flowers = action.payload
            })
            .addCase(listFlowers.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload || action.error.message || 'Unknown error'
            })
            .addCase(deleteFlower.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteFlower.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.flowers = state.flowers.filter(item => item._id !== action.payload)
            })
            .addCase(deleteFlower.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload || action.error.message || 'Unknown error'
            })
    }
})

export const {reset}  = flowerSlice.actions

export default flowerSlice.reducer
