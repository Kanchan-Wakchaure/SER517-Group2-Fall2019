import React , {Component} from 'react';
import logo from '../log.svg';
import '../App.css'

class Homepage extends Component {


		render() {
			return(

				<div className="homepage">

				<img src={logo} width="115" height="115" />
				<br/>
				<h3  style = {{fontFamily : 'PT Serif'}} > TRAVLENDAR </h3>
				<br/>
				<br />
				<button   style={{color: 'white', backgroundColor: '#C53E3E', width : '160px', fontFamily: 'PT Serif'}} > Login </button>
				<br/>
				<button style={{color: 'white', backgroundColor: '#C53E3E', width : '160px',  fontFamily: 'PT Serif'}} > Sign Up </button>
				<br/>
				<button style={{color: 'white', backgroundColor: '#C53E3E', width : '160px',  fontFamily: 'PT Serif'}} > Social Login </button>


				</div>

				);
		}
	
}
export default Homepage;
