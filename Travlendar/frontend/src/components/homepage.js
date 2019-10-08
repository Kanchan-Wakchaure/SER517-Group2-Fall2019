import React, { Component } from "react";
import { BrowserRouter as Router, Route,Switch, Redirect} from 'react-router-dom';
import logo from '../log.svg';
import '../App.css'
import Login from './login';
import Signup from './signup';
import CreateEvent from './CreateEvent';
import ListEvent from './listevent';





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
			  listevent = () => {
			      this.props.history.push('/listevent');
			  }

		render() {




			

			return(

				<div className="homepage" >

				
				<br/>
				<h1  style = {{fontFamily : 'ProximaNova', top: 5, right: 25, position: 'absolute' , color : 'white'}} > TRAVLENDAR </h1>
				<br/>
				<br />
				<Route path="/login" component={Login}/>
				<Route path="/signup" component={Signup}/>
				<Route path="/CreateEvent" component={CreateEvent}/>
				<Route path="/listevent" component={ListEvent}/>

				<br/>
				<br/>
				<br/>
				<br/>
				<br/>

				<button   style={{color: 'white', backgroundColor: '#C53E3E', width : '230px', height: '50px', fontFamily: 'PT Serif', borderRadius:'24px'}}  onClick={this.login} > Login </button>
				<br/>

				<button style={{color: 'white', backgroundColor: '#C53E3E',  width : '230px', height: '50px' , fontFamily: 'PT Serif', borderRadius:'24px'}}  onClick={this.signup} > Sign Up </button>
				<br/>
				<button style={{color: 'white', backgroundColor: '#C53E3E',  width : '230px', height: '50px', fontFamily: 'PT Serif', borderRadius:'20px'}} onClick={this.CreateEvent}> Create Event </button>
				<br/>
                <button style={{color: 'white', backgroundColor: '#C53E3E',  width : '230px', height: '50px', fontFamily: 'PT Serif', borderRadius:'20px'}} onClick={this.listevent}> List Event </button>


            



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

