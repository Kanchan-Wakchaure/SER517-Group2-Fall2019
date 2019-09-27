import React, { Component } from "react";
import { BrowserRouter as Router, Route,Switch, Redirect} from 'react-router-dom';
import logo from '../log.svg';
import '../App.css'
import Login from './login';
import Signup from './signup';



class Homepage extends Component {

			login = () => {
			      this.props.history.push('/login');
			  }
			  signup = () => {
			      this.props.history.push('/signup');
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
				<button   style={{color: 'white', backgroundColor: '#C53E3E', width : '160px', fontFamily: 'PT Serif'}}  onClick={this.login} > Login </button>
				<br/>

				<button style={{color: 'white', backgroundColor: '#C53E3E', width : '160px',  fontFamily: 'PT Serif'}}  onClick={this.signup} > Sign Up </button>
				<br/>
				<button style={{color: 'white', backgroundColor: '#C53E3E', width : '160px',  fontFamily: 'PT Serif'}} > Social Login </button>


            



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

