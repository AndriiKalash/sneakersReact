import React from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { setCartOpen, cartSelector} from '../redux/cart/cartSlise';
import { trigerModal, registrationSelector } from '../redux/registration/registrationSlice'

const Header = () => {

    const {totalPrice} = useSelector(cartSelector);
    const {isUserFined} = useSelector(registrationSelector);
    const dispatch = useDispatch();

    const onCartOpen = () => {
        if (isUserFined) {
            document.body.style.overflow = "hidden";
            dispatch(setCartOpen());
        } else {
            dispatch(trigerModal(true));
        }
    } 
    
                
    return (
        <header className="d-flex justify-between align-center p-40 flex-wrap">
            <Link to="/">
                <div className="d-flex align-center flex-wrap">
                    <img width={40} height={40}
                     src="/img/logo.png"
                      alt="Logo" />
                    <div className="headreInfo">
                        <h3 className="text-uppercase">REACT SNEAKERS</h3>
                        <p className="opasity-5">Best sneakers store</p>
                    </div>
                </div>
            </Link>
            <ul className="d-flex justify-between align-center ">
                <li onClick={onCartOpen}  className="mr-20 cu-p"><img width={18} height={18} src="/img/cart.svg" alt="кoрзина" /><span>{totalPrice}usd.</span></li>
                <Link to="favorites">
                    <li><img className="mr-20 cu-p"
                     src="/img/favorite-heart.svg"
                      alt="заклядки" /></li>
                </Link>
                <Link to="orders">
                    <li ><img width={18} height={18} src="/img/user.svg" alt="пользователь" /></li>
                </Link>
            </ul>
        </header >
    );
}

export default Header;