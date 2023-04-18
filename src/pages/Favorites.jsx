import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { favoritesSelector } from "../redux/favorites/favoritesSlice";
import {Card} from '../components';




const Favorites = () => {
    
    const {favoritesItems} = useSelector(favoritesSelector);
    
    const renderFavorites = () => (
        favoritesItems.length < 1 ?
        <EmtyFavorites/> :
        favoritesItems.map((item, index) => (
            <Card
                key={index}
                {...item}
            />
        ))
    )

    return (
        <div className="content p-40">
            <div className="d-flex justify-between mb-40 align-center">
                <h1 >My favorites sneakers</h1>
            </div>
            <div className="d-flex flex-wrap">
                {renderFavorites()}
            </div>
        </div>
    );
}

const EmtyFavorites = () => (
    <div className="cartEmpty d-flex align-center justify-content flex-column flex">
    <img className="mb-20" width={120} src="/img/empty-cart.jpg" alt="empty" />
    <h2>"You don't heve any favorites sneakers"</h2>
    <p className="opacity-6">
    "Add some which you like more"
    </p>
    <Link to={'/'}>
      <button style={{width: 200}} className='greenButton' ><img src="img/arrow-left.svg" alt="arrow" />
      Get back 
      </button>
    </Link>
    
    </div>
);

export default Favorites;