
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import AppContext from './context';

import Header from './components/Header';
import Drawer from './components/Drawer';
import Home from './pages/Home';
import Orders from './pages/Orders';
import Favorites from './pages/Favorites';


// Переменная, который передает все данные карточек, которая хранит кроссовки
// const arr = [
//   { title: 'Мужские Кроссовки Nike Blazer Mid Suede', price: 12999, imageUrl: '/img/sneakers/1.jpg' },
//   { title: 'Мужские Кроссовки Nike Air Max 270', price: 10999, imageUrl: '/img/sneakers/2.jpg' },
//   { title: 'Мужские Кроссовки Under Armour Curry 8', price: 15199, imageUrl: '/img/sneakers/3.jpg' },
//   { title: 'Кроссовки Puma X Aka Boku Future Rider', price: 8999, imageUrl: '/img/sneakers/4.jpg' }
// ];

function App() {

  // Передаем массив с карточками. Карточки записаны на сервере. Вытаскиваем из бэкенда
  const [items, setItems] = React.useState([]);

  // Масив для хранения товаров в корзине
  const [cartItems, setCartItems] = React.useState([]);

  // Масив для добавления favorites
  const [favorites, setFavorites] = React.useState([]);

  // Для поиска товара при вводе в поиск.  строчка ('')
  const [searchValue, setsearchValue] = React.useState('');

  // Переменные для отображения и скрытия корзины (скрываем ее)
  const [cartOpened, setCartOpened] = React.useState(false);

  // Константа для карточек, при открытии будет серая карточка пока грузит сайт, потом будет оригинальная
  const [isLoading, setIsLoading] = React.useState(true);


  // Первый раз, как только функция обновится, только тогда вызови код
  React.useEffect(() => {
    async function fetchData() {
      try {

        // Вытаскиваем масив по ссылке с помощью axios
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

  // Константа для добавления елементов в корзину
  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
      // Если есть такой же товар в корзине то удали его
      if (findItem) {
        setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
        await axios.delete(`https://62837f4792a6a5e46224e2a6.mockapi.io/Cart/${findItem.id}`);

        // Ели нет, то добавть его и передай на сервер
      } else {
        // Отправлять запрос на сервер, для вывода в корзину
        const { data } = await axios.post('https://62837f4792a6a5e46224e2a6.mockapi.io/Cart', obj);
        // Функция возьмет предедущие данные и выведет setCartItems (все свои данные) и добавит новые данные obj
        setCartItems((prev) => [...prev, data]);


      }
    } catch (error) {
      alert('Ошибка при добавлении в корзину');
      console.log(error);
    }
  };

  // Для удаления товаров из корзины
  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://62837f4792a6a5e46224e2a6.mockapi.io/Cart/${id}`);
      // Для удаления карточки из корзины
      setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
    } catch (error) {
      alert('Ошибка при удалении из корзины');
      console.log(error);
    }
  };

  // Константа для добавления елементов на страницу фавориты при нажатии на favorites
  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://62837f4792a6a5e46224e2a6.mockapi.io/Favorites/${obj.id}`);
        setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
      } else {
        // Отправлять запрос на сервер, для вывода в фавориты
        const { data } = await axios.post('https://62837f4792a6a5e46224e2a6.mockapi.io/Favorites', obj);
        // Функция возьмет предедущие данные и выведет setFavorites (все свои данные) и добавит новые данные obj
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
    <AppContext.Provider value={{ items, cartItems, favorites, isItemAdded, onAddToFavorite, setCartOpened, setCartItems }}>


      <div className="wrapper  clear">

        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
          opened={cartOpened} />



        <Header onClickCart={() => setCartOpened(true)} />


        {/* Разделяем на страницы */}
        <Routes>
          <Route path="/" element={
            <Home
              items={items}
              cartItems={cartItems}
              searchValue={searchValue}
              setsearchValue={setsearchValue}
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
