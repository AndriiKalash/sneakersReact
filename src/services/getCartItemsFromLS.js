import { calcTotalPrice } from "./calcTotalPrice";

export const getCartItemsFromLS = (name) => {
    const data = localStorage.getItem(name);
    const items = data? JSON.parse(data) : [];
    const totalPrice =  calcTotalPrice(items);
    return {
        items,
        totalPrice
    }
}