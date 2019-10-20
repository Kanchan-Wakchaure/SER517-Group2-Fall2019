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
import { HOMEPAGE, SIGNUP, LOGIN, CREATE_EVENT, EVENTS_LIST } from './Routes.js';
import { connect } from 'react-redux';
import * as actions from './store/actions/auth';

class App extends Component{

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render(){
      return (
      <div>
        <Header {...this.props}/>
        <div className="cover" >
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route exact path={HOMEPAGE} component={Homepage} />
                        <Route path={SIGNUP} component={Signup} />
                        <Route path={LOGIN} component={Login} />
                        <Route path={CREATE_EVENT} component={CreateEvent} />
                        <Route path={EVENTS_LIST} component={ListEvent}/>
                    </Switch>
                </div>
            </BrowserRouter>
        </div>
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