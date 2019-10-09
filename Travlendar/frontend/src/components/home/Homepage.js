import React, { Component } from "react";
import { BrowserRouter as Router, Route,Switch, Redirect} from 'react-router-dom';
import './Homepage.css'
import Login from './login';
import Signup from './register/Signup';
import CreateEvent from './CreateEvent';
import Container from '@material-ui/core/Container';
import Calendar from 'react-calendar';

class Homepage extends React.Component{
    render() {
        return(
	        <div className="cover" >

			</div>
	    );
	}
}

export default Homepage;