import React, { Component } from "react";
import { BrowserRouter as Router, Route,Switch, Redirect} from 'react-router-dom';
import logo from '../log.svg';
import '../App.css'
import Login from './login';
import Signup from './signup';
import CreateEvent from './CreateEvent';


class Homepage extends Component {

			login = () => {
			      this.props.history.push('/login');
			  }
			  signup = () => {
			      this.props.history.push('/signup');
			  }
			   CreateEvent = () => {
			      this.props.history.push('/CreateEvent');
			  }
		render() {




			

			return(

				<div className="homepage">

				<img src={logo} width="115" height="115" />
				<br/>
				<h3  style = {{fontFamily : 'PT Serif'}} > TRAVLENDAR </h3>
				<br/>
				<br />
				<Route path="/login" component={Login}/>
				<Route path="/signup" component={Signup}/>
				<Route path="/CreateEvent" component={CreateEvent}/>

				<button   style={{color: 'white', backgroundColor: '#C53E3E', width : '160px', fontFamily: 'PT Serif'}}  onClick={this.login} > Login </button>
				<br/>

				<button style={{color: 'white', backgroundColor: '#C53E3E', width : '160px',  fontFamily: 'PT Serif'}}  onClick={this.signup} > Sign Up </button>
				<br/>
				<button style={{color: 'white', backgroundColor: '#C53E3E', width : '160px',  fontFamily: 'PT Serif'}} onClick={this.CreateEvent}> Create Event </button>


            



				</div>

				);
		}
	
}
export default () => (
   <div>
      <Router>
           <Route component={Homepage} />
      </Router>
  </div>
);

