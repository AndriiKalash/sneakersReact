import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {fetchItems} from "../../services/SneakersService";


export const fetchSneakers = createAsyncThunk(
    'sneakers/fetchSneakers',
     async(url) => await fetchItems(url) 
)

const initialState = {
    sneakers: [],
    loadingStatus: 'loading',
    searchValue:''
}

const sneakersSlice = createSlice({
    name: 'sneakers',
    initialState,
    reducers: {  
        setSearchValue(state ,action){
            state.searchValue = action.payload;
        }      
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSneakers.pending, state => {
                    state.loadingStatus = 'loading'
                })
            .addCase(fetchSneakers.fulfilled, (state, action) => {
                state.sneakers = action.payload;
                state.loadingStatus = 'idle'
            })  
            .addCase(fetchSneakers.rejected, state => {
                state.loadingStatus = 'error'
            })  
            .addDefaultCase(() => {})
    }
});


export const sneakersSelector = (state => state.sneakers);
const {reducer, actions} = sneakersSlice;
export const {setSearchValue} = actions;

export default reducer;