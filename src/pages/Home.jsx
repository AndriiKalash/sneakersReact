import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { sneakersSelector, fetchSneakers } from '../redux/sneakers/sneakersSlice';
import useDebounce from '../hooks/useDebounce';
import {Loader, Card, Search}from '../components'



const Home = () => {

    const {sneakers, loadingStatus, searchValue} = useSelector(sneakersSelector);
    const dispatch = useDispatch();
    const delay = useDebounce(searchValue, 1000);
    
    const requestSneakers = () => dispatch(fetchSneakers(`https://62837a1092a6a5e46224964a.mockapi.io/items`));

    useEffect(() => {
        window.scrollTo(0, 0);
        requestSneakers()},[]);

    const renderItems = () => {
        return ((loadingStatus === "loading") ?
             ([...Array(8)].map((_, index) => <Loader key={index}/>))
            : 
         (sneakers.filter((item) => item.title.toLowerCase().includes(delay.toLowerCase())))
            .map((item, index) => (
                <Card
                    key={index}
                    {...item}
                />
            )));
    };

    return (
        <div className="content p-40">
            <Search/>
            <div className="d-flex flex-wrap">
                {renderItems()}
            </div>
        </div>
    );
}

export default Home;