import { createSlice } from "@reduxjs/toolkit";
import { getCartItemsFromLS } from "../../services/getCartItemsFromLS";

const {items} = getCartItemsFromLS('favoritesSneakers');
const initialState = {
    favoritesItems: items,
}

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {   
        addFavorItems(state,action){
                state.favoritesItems.push(action.payload); 
        },
        removeFavorItem(state, action){
                state.favoritesItems = state.favoritesItems.filter((item)=> item.id !== action.payload);
        }, 
    },
});


export const favoritesSelector = (state => state.favorites);
const {reducer, actions} = favoritesSlice;
export const {
    addFavorItems,
    removeFavorItem
} = actions;

export default reducer;