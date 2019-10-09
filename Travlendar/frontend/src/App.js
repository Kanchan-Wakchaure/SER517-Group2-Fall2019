import React from 'react';
import './App.css';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Header from './components/header/Header';
import Homepage from './components/home/Homepage';
import Footer from './components/footer/Footer';
import Signup from './components/register/Signup';
import Login from './components/login';
import CreateEvent from './components/CreateEvent';

import { HOMEPAGE, SIGNUP, LOGIN, CREATE_EVENT } from './Routes.js';

function App() {
  return (
    <div className="App" >
        <Header />
        <BrowserRouter>
            <div>
                <Switch>
                    <Route exact path={HOMEPAGE} component={Homepage} />
                    <Route path={SIGNUP} component={Signup} />
                    <Route path={LOGIN} component={Login} />
                    <Route path={CREATE_EVENT} component={CreateEvent} />
                </Switch>
            </div>
        </BrowserRouter>
        <Footer/>
    </div>
  );
}

export default App;