
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import AppContext from './context';

import Header from './components/Header';
import Drawer from './components/Drawer';
import Home from './pages/Home';
import Orders from './pages/Orders';
import Favorites from './pages/Favorites';


function App() {


  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setsearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {

    async function fetchData() {
      try {
        const favoritesResponse = await axios.get('https://62837f4792a6a5e46224e2a6.mockapi.io/Favorites');
        const cartResponse = await axios.get('https://62837f4792a6a5e46224e2a6.mockapi.io/Cart');
        const itemsResponse = await axios.get('https://62837f4792a6a5e46224e2a6.mockapi.io/Items');

        setIsLoading(false);
        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);

      } catch (error) {
        alert('Ошибка при запросе данных');
        console.log(error);
      }
    }
    fetchData();
  }, []);

  // добавление в корзину
  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));

      if (findItem) {
        setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
        await axios.delete(`https://62837f4792a6a5e46224e2a6.mockapi.io/Cart/${findItem.id}`);
      } else {
        const { data } = await axios.post('https://62837f4792a6a5e46224e2a6.mockapi.io/Cart', obj);
        setCartItems((prev) => [...prev, data]);
      }
    }
    catch (error) {
      alert('Ошибка при добавлении в корзину');
      console.log(error);
    }
  };

  //  удаления товаров из корзины
  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://62837f4792a6a5e46224e2a6.mockapi.io/Cart/${id}`);
      setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
    } catch (error) {
      alert('Ошибка при удалении из корзины');
      console.log(error);
    }
  };

  // добавлениe favorites
  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://62837f4792a6a5e46224e2a6.mockapi.io/Favorites/${obj.id}`);
        setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
      }
      else {
        const { data } = await axios.post('https://62837f4792a6a5e46224e2a6.mockapi.io/Favorites', obj);
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert('Не удалось добавить в фавориты');
      console.log(error);
    }
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  return (

    <AppContext.Provider value={{
      items, cartItems, favorites, isItemAdded, onAddToFavorite, setCartOpened, setCartItems
    }}>

      <div className="wrapper  clear">

        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
          opened={cartOpened} />

        <Header onClickCart={() => setCartOpened(true)} />

        <Routes>
          <Route path="/" element={
            <Home
              items={items}
              cartItems={cartItems}
              searchValue={searchValue}
              onsearchValue={setsearchValue}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart}
              isLoading={isLoading} />} />

          <Route path="/orders" element={<Orders />} />

          <Route path="/favorites" element={<Favorites />} />
        </Routes>

      </div>
    </AppContext.Provider>
  );
}

export default App;
