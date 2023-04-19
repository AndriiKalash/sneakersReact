import  { useCallback} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { cartSelector, setCartClose, removeCartItem, clearCart} from '../../redux/cart/cartSlise';
import { ordersSelector, postOrder, orderComplited } from '../../redux/orders/ordersSlice';
import {FullCart, LoadingSpinner}from '../../components'
import styles from './Drawer.module.scss';


const Drawer = () => {

    const {cartItems, totalPrice, cartOpen} = useSelector(cartSelector);
    const {isOrderComplite, status, orderId} = useSelector(ordersSelector);
    const dispatch = useDispatch();
    
    const cartClose = () => {
        document.body.style.overflow = "visible";
        dispatch(setCartClose());
    } 
    const itemRemove = useCallback((id) => dispatch(removeCartItem(id)) ,[]);
    const sendOrder = () => {
        dispatch(postOrder({items: cartItems})); 
        dispatch(clearCart());
        setTimeout(() => {
            dispatch(orderComplited());
        }, 4500);   
    } 

    const fullCart = (cartItems.length>0) ?
                    <FullCart
                    status={status} 
                    cartItems={cartItems}
                    itemRemove={itemRemove}
                    totalPrice={totalPrice}
                    sendOrder={sendOrder}/> : null;

    const emptyCart = (cartItems.length<1 && !isOrderComplite && status!=='loading') ?
                       <EmtyCart cartClose={cartClose}/> : null;

    const loadOrder = (status==='loading') ? 
                      <LoadingSpinner/>: null;
   
    const orderedCart = (isOrderComplite && cartItems.length<1) ? 
                        <OrderedCart cartClose={cartClose} orderId={orderId}/>:null;
    
        

    return (
        //  корзина скрыта 
        <div className={`${styles.overlay} ${cartOpen ? styles.overlayVisible : ''}`} >
            <div className={styles.drawer} >
                <h2 className=" d-flex justify-between mb-30">Drawer<img 
                onClick={cartClose} className="removeBtn cu-p" src="img/btn-remove.svg" alt="close" /></h2> 
                {fullCart}
                {emptyCart}
                {loadOrder}
                {orderedCart}
            </div>
        // </div>
    )
}


const EmtyCart = ({cartClose}) => (
    <div className="cartEmpty d-flex align-center justify-content flex-column flex">
    <img className="mb-20" width={120} src="/img/empty-cart.jpg" alt="empty" />
    <h2>"Drawer is empty"</h2>
    <p className="opacity-6">
    "Add at least one pair of sneakers for making order"
    </p>
    <button onClick={cartClose} className="greenButton"><img src="img/arrow-left.svg" alt="arrow" />Get back </button>
        </div>
);

const OrderedCart = ({cartClose, orderId}) => (
    <div className="cartEmpty d-flex align-center justify-content flex-column flex">
    <img className="mb-20" width={120} src="/img/order-complite.svg " alt="empty" />
    <h2>"Order is complete"</h2>
    <p className="opacity-6">
    `You order #{orderId} is processed`
    </p>
    <button onClick={cartClose} className="greenButton"><img src="img/arrow-left.svg" alt="arrow" />Get back </button>
</div>
);

export default Drawer;





