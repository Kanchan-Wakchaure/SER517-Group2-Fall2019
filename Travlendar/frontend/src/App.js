import React from 'react';
import './App.css';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Header from './components/header/Header';
import Homepage from './components/home/Homepage';
import Footer from './components/footer/Footer';
import Signup from './components/register/Signup';
import Login from './components/login/Login';
import CreateEvent from './components/createEvent/CreateEvent';
import ListEvent from './components/eventsList/ListEvent';
import Map from './components/map/MapView';
import { HOMEPAGE, SIGNUP, LOGIN, CREATE_EVENT, EVENTS_LIST, EVENTS_MAP } from './Routes.js';

function App() {
  return (
  <div>
    <Header />
    <div className="cover" >
        <BrowserRouter>
            <div>
                <Switch>
                    <Route exact path={HOMEPAGE} component={Homepage} />
                    <Route path={SIGNUP} component={Signup} />
                    <Route path={LOGIN} component={Login} />
                    <Route path={CREATE_EVENT} component={CreateEvent} />
                    <Route path={EVENTS_LIST} component={ListEvent}/>
                    <Route path={EVENTS_MAP} component={Map}/>

                </Switch>
            </div>
        </BrowserRouter>
    </div>
    <Footer />
    </div>
  );
}

export default App;