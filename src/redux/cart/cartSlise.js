import { createSlice } from "@reduxjs/toolkit";
import { getCartItemsFromLS } from "../../services/getCartItemsFromLS";

const {items, totalPrice} = getCartItemsFromLS('cartSneakers');

const initialState = {
    cartItems: items,
    totalPrice: totalPrice,
    cartOpen: false,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {   
        setCartOpen(state) {
            state.cartOpen = true;
        },
        setCartClose(state) {
            state.cartOpen = false;
        },
        addCartItems(state,action){
                state.cartItems.push(action.payload); 
                state.totalPrice = state.cartItems.reduce((sum,obj) => obj.price + sum,0); 
        },
        removeCartItem(state, action){
                state.cartItems = state.cartItems.filter((item)=> item.id !== action.payload);
                state.totalPrice = state.cartItems.reduce((sum,obj) => obj.price + sum,0); 
        }, 
        clearCart(state){
            state.cartItems = [];
            state.totalPrice = 0;
        }
    },
});


export const cartSelector = (state => state.cart);
const {reducer, actions} = cartSlice;
export const {
    setCartOpen,
    setCartClose,
    addCartItems,
    removeCartItem,
    clearCart
} = actions;

export default reducer;