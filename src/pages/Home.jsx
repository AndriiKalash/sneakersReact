import React from 'react';
import Card from '../components/Card';

const Home = ({
    items,
    searchValue,
    onsearchValue,
    onAddToFavorite,
    onAddToCart,
    isLoading,

}) => {

    const renderItems = () => {

        return (isLoading
            ? [...Array(8)]
            : items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase())))

            .map((item, index) => (
                <Card
                    key={index}
                    onFavorite={(obj) => onAddToFavorite(obj)}
                    onPlus={(obj) => onAddToCart(obj)}
                    loading={isLoading}
                    {...item}
                />
            ));
    };

    return (
        <div className="content p-40">
            <div className="d-flex justify-between mb-40 align-center">
                <h1 >{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кросовки'}</h1>
                <div className="search-block d-flex">
                    <img src="img/search.svg" alt="Search" />
                    {searchValue && <img onClick={() => onsearchValue('')} className="clear removeBtn" src="img/btn-remove.svg" alt="cleare" />}
                    <input
                        value={searchValue}
                        name={searchValue}
                        onChange={(e) => onsearchValue(e.target.value)}
                        placeholder="Поиск..." type="text"
                    />
                </div>
            </div>

            <div className="d-flex flex-wrap">

                {renderItems()}

            </div>
        </div>
    );
}

export default Home;