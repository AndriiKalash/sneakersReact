import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ordersSelector, fetchOrder } from '../redux/orders/ordersSlice';
import {Loader, Card} from '../components'


const Orders = () => {

    const{orderedItems, orderId, status} = useSelector(ordersSelector);
    const dispatch = useDispatch();
    const getOrders = () => orderId ? dispatch(fetchOrder('https://62837a1092a6a5e46224964a.mockapi.io/orders')) : null;
    useEffect(()=> {
        getOrders();
    },[orderId]);

    return (
        <div className="content p-40">
            <div className="d-flex justify-between mb-40 align-center">
                <h1 >My orders</h1>
            </div>
            {
            !orderId ?
            <div className="cartEmpty d-flex align-center justify-content flex-column flex">
            <img className="mb-20" width={120} src="/img/empty-cart.jpg" alt="empty" />
            <h2>You did not meke an order</h2>
            <p className="opacity-6"></p>
            </div> :
            <div className="d-flex flex-wrap">
                {
                 (status==='loading')?
                 ([...Array(8)].map((_, index) => <Loader key={index}/>))
                 :
                 orderedItems.map((item, index)=>(
                 <Card key={index} {...item}/>)) 
                }    
            </div>
            } 
        </div>
    );
}

export default Orders;