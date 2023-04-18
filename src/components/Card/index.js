import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';
import { useInView } from 'react-intersection-observer';
import { useDispatch, useSelector } from 'react-redux';

import { addCartItems, removeCartItem, cartSelector } from "../../redux/cart/cartSlise";
import {addFavorItems, favoritesSelector, removeFavorItem} from "../../redux/favorites/favoritesSlice";
import { registrationSelector, trigerModal } from '../../redux/registration/registrationSlice';
import { Loader } from '../../components';
import styles from './Card.module.scss';



export const Card = ({ id, imageUrl,title, price,}) => {
    
    const {ref, inView} = useInView({
        threshold:0.7,
        triggerOnce: true,
    })
    const {cartItems} = useSelector(cartSelector);
    const {favoritesItems} = useSelector(favoritesSelector);
    const {isUserFined} = useSelector(registrationSelector);
    const dispatch = useDispatch();
    const {pathname} = useLocation();
    const isMounted = useRef(false);

    const findCartItem = cartItems.find(obj => obj.id === id);
    const findFavoriteItem = favoritesItems.find(obj => obj.id === id);
    const addedItem = { id,title,imageUrl,price };
    const addToLS = (arr, name) => {
        const json = JSON.stringify(arr);
        localStorage.setItem(name, json);
    }
    useEffect(()=>{
        if (isMounted.current) {
            addToLS(cartItems,'cartSneakers');
            addToLS(favoritesItems,'favoritesSneakers');
        } 
        isMounted.current = true;
    },[cartItems, favoritesItems]);

    const onClickPlus = () => {
        if (isUserFined) {
            findCartItem ? dispatch(removeCartItem(id)):
            dispatch(addCartItems(addedItem));
        } else {
            dispatch(trigerModal(true));
        }  
    }

    const onClickFavorite = () => {
        findFavoriteItem ? dispatch(removeFavorItem(id)): 
         dispatch(addFavorItems(addedItem)); 
    };

  
        return (
                
            <div ref={ref}>
                {
                    inView ? 
                        ( <div  className={styles.card}>
                        <div className={styles.favorite} > 
                            {
                                 pathname !== '/orders' &&
                                 (<img
                                 onClick={onClickFavorite}
                                 src={findFavoriteItem ? "/img/heart-like.svg" : "/img/heart-unlike.svg"}    alt="unlike" 
                                 />)
                            }
                            </div>
                            <img width={133} height={112} src={imageUrl} alt="sneakers" />
                            <h5>{title}</h5>
                            <div className="d-flex justify-between align-center" >
                                <div className="d-flex flex-column">
                                    <span>Price:</span>
                                    <p>{price}</p>
                                </div>
                                {
                                    pathname !== '/orders' &&
                                    (<img className={styles.plus}
                                     onClick={onClickPlus}
                                     src={findCartItem ? "/img/btn-cheked.svg" : "/img/btn-plus.svg"} alt="plus" 
                                    />  )  
                                }
                                        
                            </div>              
                    </div>  
                    
                    ) : (
                       <Loader/> 
                    )
                }
            </div>
            
);   
}
