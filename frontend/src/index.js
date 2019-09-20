import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import "bootstrap/dist/css/bootstrap.css";

import Homepage from './components/homepage';
import Signup from './components/signup';

//ReactDOM.render(<Homepage />, document.getElementById('root'));
ReactDOM.render(<Signup />, document.getElementById('root'));

serviceWorker.unregister();
