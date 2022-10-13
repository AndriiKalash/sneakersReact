
import React from 'react';
import AppContext from '../context';

//експорт лучше делать так а не как раньше export default
export const useCart = () => {
    const { cartItems, setCartItems } = React.useContext(AppContext);
    const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);

    return { cartItems, setCartItems, totalPrice };
};