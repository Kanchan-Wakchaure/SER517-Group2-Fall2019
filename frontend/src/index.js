import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import "bootstrap/dist/css/bootstrap.css";

import Homepage from './components/homepage';
import login from './components/login'

ReactDOM.render(<Homepage />, document.getElementById('root'));
ReactDOM.render(<login />, document.getElementById('root'));
serviceWorker.unregister();
