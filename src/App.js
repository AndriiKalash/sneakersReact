import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

import { LoadingSpinner} from './components';
import Header from './components/Header';
import Drawer from './components/Drawer';
import ModalRegistration  from './pages/ModalRagistration';
import Home from './pages/Home';
const Orders = lazy(() => import(/*webpackChunkName: "Orders"*/'./pages/Orders'));
const Favorites = lazy(() => import(/*webpackChunkName: "Favorites"*/'./pages/Favorites'));

const App = () => (

  <div className="wrapper  clear">
        <Drawer/>
        <Header/>
        <ModalRegistration/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/orders" element={
          <Suspense fallback={<LoadingSpinner/>}>
            <Orders />
          </Suspense>} />
          <Route path="/favorites" element={
          <Suspense fallback={<LoadingSpinner/>}>
            <Favorites />
          </Suspense> } />
        </Routes>
      </div>
)


      
  

export default App;


