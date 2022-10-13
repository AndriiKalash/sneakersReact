import React from 'react';
// import AppContext from '../context';
import { Link } from "react-router-dom";
import { useCart } from '../hooks/useCart'

function Header(props) {
    //передал эти 2 функции в файл hooks/useCart
    // const { cartItems } = React.useContext(AppContext);
    // const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);
    const { totalPrice } = useCart();

    return (
        <header className="d-flex justify-between align-center p-40">
            <Link to="/">
                <div className="d-flex align-center">
                    <img width={40} height={40} src="/img/logo.png" alt="Logo" />
                    <div className="headreInfo">
                        <h3 className="text-uppercase">REACT SNEAKERS</h3>
                        <p className="opasity-5">Магазин лучших кроссовок</p>
                    </div>
                </div>
            </Link>
            <ul className="d-flex justify-between align-center">
                <li onClick={props.onClickCart} className="mr-20 cu-p"><img width={18} height={18} src="/img/cart.svg" alt="кoрзина" /><span>{totalPrice}руб.</span></li>
                <Link to="favorites">
                    <li><img className="mr-20 cu-p" src="/img/favorite-heart.svg" alt="заклядки" /></li>
                </Link>
                <Link to="orders">
                    <li><img width={18} height={18} src="/img/user.svg" alt="пользователь" /></li>
                </Link>
            </ul>
        </header >
    );
}

export default Header;