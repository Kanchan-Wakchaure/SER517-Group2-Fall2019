import React, { Component } from 'react';
import './App.css';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Header from './components/header/Header';
import Homepage from './components/home/Homepage';
import Footer from './components/footer/Footer';
import Signup from './components/register/Signup';
import Login from './components/login/Login';
import CreateEvent from './components/createEvent/CreateEvent';
import ListEvent from './components/eventsList/ListEvent';
import { connect } from 'react-redux';
import * as actions from './store/actions/auth';
import Map from './components/map/MapView';
import { HOMEPAGE, SIGNUP, LOGIN, CREATE_EVENT, EVENTS_LIST, EVENTS_MAP, EMAIL, TEXT, ABOUT } from './Routes.js';
import Email from './components/email/Email';
import Text from './components/text/Text';
import About from './components/about/About';


import { NotificationContainer, NotificationManager } from 'react-notifications';

import 'react-notifications/lib/notifications.css';

class App extends Component{

  componentDidMount() {
    this.props.onTryAutoSignup();
  }


  render(){
      return (
      <div>
        <Header {...this.props}/>

            <NotificationContainer />
        <div className="cover">
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route exact path={HOMEPAGE} component={Homepage} />
                        <Route path={SIGNUP} component={Signup} />
                        <Route path={LOGIN} component={Login} />
                        <Route path={CREATE_EVENT} component={CreateEvent} />
                        <Route path={EVENTS_LIST} component={ListEvent}/>
                        <Route path={EVENTS_MAP} component={Map}/>
                      <Route path={EMAIL} component={Email}/>
                      <Route path={TEXT} component={Text}/>
                      <Route path={ABOUT} component={About}/>
                    </Switch>
                </div>
            </BrowserRouter>
        </div>
        <Footer/>
        </div>
      );
  }

}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.token !== null
    }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);