import React , {Component} from 'react';
//import CreateEvent from './CreateEvent';
import EventsService from '../EventsService';

const eventService=new EventsService();
class Homepage extends Component {


    constructor(props) {
        super(props);

	}
	
    render() {
        return(

            <div>

            <h1>Welcome to Travelander</h1>

            <button> Send </button>

            </div>

            );
    }
	
}
export default Homepage;
