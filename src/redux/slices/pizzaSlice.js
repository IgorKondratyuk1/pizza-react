import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { pizzaAPI } from '../../api/api';

export const fetchPizzas = createAsyncThunk(
    'pizzas/fetchPizzas',
    async (params) => {
        const response = await pizzaAPI.getPizzas(params);
        return response;
    }
)

const initialState = {
    items: [],
    status: 'loading' // loading | success | error
}

export const pizzaSlice = createSlice({
    name: "pizza",
    initialState,
    reducers: {
        setItems: (state, action) => {
            state.items = action.payload;
        }
    },
    extraReducers: {
        [fetchPizzas.pending]: (state) => {
            state.status = "loading";
            state.items = [];
        },
        [fetchPizzas.fulfilled]: (state, action) => {
            state.status = "success";
            state.items = action.payload;
        },
        [fetchPizzas.rejected]: (state) => {
            state.status = "error";
            state.items = [];
        }
    }
});

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;