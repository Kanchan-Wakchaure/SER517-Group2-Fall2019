import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import "bootstrap/dist/css/bootstrap.css";
import Login from './components/Login'

ReactDOM.render(<Homepage />, document.getElementById('root'));
ReactDOM.render(<Login />, document.getElementById('root'));
serviceWorker.unregister();
