import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { Provider } from 'react-redux';
import { store } from "./redux/store";
import App from './App';
import 'macro-css';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Router >
      <Provider store={store}>
      <App />
      </Provider>
    </Router>
  // </React.StrictMode>
);


