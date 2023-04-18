import { configureStore } from '@reduxjs/toolkit';
import sneakers from './sneakers/sneakersSlice';
import cart from './cart/cartSlise';
import favorites from './favorites/favoritesSlice';
import orders from "./orders/ordersSlice";
import registration from "./registration/registrationSlice"

export const store = configureStore({
    reducer: {
        sneakers,
        cart,
        favorites,
        orders,
        registration
    },
    devTools: process.env.NODE_ENV !== "production",
})

