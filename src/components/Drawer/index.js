import React from 'react';
import axios from 'axios';

import Info from '../Info'
import { useCart } from '../../hooks/useCart'
import styles from './Drawer.module.scss'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ onClose, items = [], onRemove, opened }) {

    // const { cartItems, setCartItems } = React.useContext(AppContext);
    const { cartItems, setCartItems, totalPrice } = useCart();
    const [orderId, setOrderId] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isOrderComplite, setIsOrderComplite] = React.useState(false);
    // const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);

    //функция для оформления заказа
    const onClickOrder = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.post('https://62837a1092a6a5e46224964a.mockapi.io/orders', { items: cartItems });
            // await axios.put('https://62837a1092a6a5e46224964a.mockapi.io/cart', []);//не работает
            setOrderId(data.id);
            setIsOrderComplite(true);
            setCartItems([]);
            // cartItems.foreEach(item => {
            //     axios.delete('https://62837a1092a6a5e46224964a.mockapi.io/cart', +item.id);
            // });
            //
            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete('https://62837a1092a6a5e46224964a.mockapi.io/cart', + item.id);
                await delay(1000);
            }

        } catch (error) {
            alert('Не удалось создать заказ');
        }
        setIsLoading(false);
    };

    return (
        //   теперь корзина не удаляется , а просто скрыта 
        <div className={`${styles.overlay}  ${opened ? styles.overlayVisible : ''}`} >
            <div className={styles.drawer}>
                <h2 className=" d-flex justify-between mb-30">Корзина<img onClick={onClose} className="removeBtn cu-p" src="img/btn-remove.svg" alt="close" /></h2>

                {items.length > 0 ? (

                    <div className=" d-flex flex flex-column">
                        <div className="items">
                            {items.map((obj) => (
                                <div key={obj.id} className="cartItem d-flex align-center mb-20">
                                    <div style={{ backgroundImage: `url(${obj.imageUrl})` }} className="cartItemImg"></div>
                                    <div className="mr-20 flex">
                                        <p className="mb-5">{obj.title}</p>
                                        <b>{obj.price}руб.</b>
                                    </div>
                                    <img onClick={() => onRemove(obj.id)} className="removeBtn" src="/img/btn-remove.svg" alt="remove" />
                                </div>
                            ))}

                        </div>
                        <div className="cartTotalBlock">
                            <ul>
                                <li className="d-flex">
                                    <span>Итого</span>
                                    <div></div>
                                    <b>{totalPrice} руб.</b>
                                </li>
                                <li className="d-flex">
                                    <span>Налог 5%</span>
                                    <div></div>
                                    <b1> {(totalPrice / 100) * 5}</b1>
                                </li>
                            </ul>
                            <button disabled={isLoading} onClick={onClickOrder} className="greenButton">Оформить заказ <img src="img/arrow.svg" alt="arrow" /></button>
                        </div>
                    </div>
                )
                    :
                    (
                        <Info
                            title={isOrderComplite ? 'Заказ оформлен' : "Корзина пустая"}
                            description={isOrderComplite ? `Ваш заказ #${orderId} передан в обработку` : "Добавьте хотя бы одну пару кроссовок, чтоб сделать заказ"}
                            image={isOrderComplite ? "/img/order-complite.svg " : "/img/empty-cart.jpg"}
                        />
                    )
                }

            </div>
        </div>
    )
}

export default Drawer;

