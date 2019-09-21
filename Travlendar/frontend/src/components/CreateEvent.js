import React , {Component} from 'react';
import EventService from '../EventsService';

const eventService=new EventService();

class CreateEvent extends Component {
	constructor(props) {
        super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleCreate(){
        eventService.createEvent(
          {
            "name": "XYZ",
            "location": "Tempe,AZ",
            "date": "09-21-2019",
        }          
        ).then((result)=>{
          alert("Event created!");
        }).catch(()=>{
          alert('There was an error! Please re-check your form.');
        });
      }
	//https://www.digitalocean.com/community/tutorials/how-to-build-a-modern-web-application-to-manage-customer-information-with-django-and-react-on-ubuntu-18-04  
	handleSubmit(event) {   
        this.handleCreate();       
    }
	render() {
		return(
			
			<div>
				<h1>Create Event page</h1>
				<button onClick={this.handleSubmit}> Send </button>
			</div>
			

			);
	}
	
}
export default CreateEvent;
