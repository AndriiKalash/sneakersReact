import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchItems, postOrderItems } from "../../services/SneakersService";

export const fetchOrder = createAsyncThunk(
    'orders/fetchOrder',
     async(url) => await fetchItems(url) 
);

export const postOrder = createAsyncThunk(
    'order/postOrder',
     async(obj) => await postOrderItems(obj) 
)

const initialState = {
    orderedItems: [],
    orderId:'',
    status: '',
    isOrderComplite: false
};

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
         orderComplited(state){
            state.isOrderComplite = false;
         }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrder.pending, state => {
                    state.status = 'loading'
                })
            .addCase(fetchOrder.fulfilled, (state, action) => {
                const orderArr = action.payload.filter((obj) => obj.id === state.orderId);
                state.orderedItems = (orderArr[0].items) 
                state.status = 'idle';
            })  
            .addCase(fetchOrder.rejected, state => {
                state.status = 'error'
            })  
             .addCase(postOrder.pending, state => {
                    state.status = 'loading'
                })
            .addCase(postOrder.fulfilled, (state, action) => {
                state.orderId = action.payload.id
                state.status = 'idle';
                state.isOrderComplite = true;
            })  
            .addCase(postOrder.rejected, state => {
                state.status = 'error'
            })   
            .addDefaultCase(() => {}) 
    }
});


export const ordersSelector = (state => state.orders);
const {reducer, actions} = ordersSlice;
export const {orderComplited} = actions;
export default reducer;