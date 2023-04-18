export const calcTotalPrice = (arr) => {
   const totalPrice = arr.reduce((sum, obj) => obj.price + sum ,0);
   return totalPrice;
} 