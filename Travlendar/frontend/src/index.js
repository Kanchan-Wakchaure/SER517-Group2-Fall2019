import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import "bootstrap/dist/css/bootstrap.css";

import Homepage from './components/homepage';
import Signup from './components/signup';
import Login from './components/login';
import CreateEvent from './components/CreateEvent';


ReactDOM.render(<Signup />, document.getElementById('root'));
ReactDOM.render(<Login />, document.getElementById('root'));
ReactDOM.render(<CreateEvent />, document.getElementById('root'));
ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();


