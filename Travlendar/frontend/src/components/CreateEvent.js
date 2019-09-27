//@author Raisa 9-21-19
import React , {Component} from 'react';
import EventsService from '../EventsService';

const eventService=new EventsService();

class CreateEvent extends Component {
	constructor(props) {
        super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	//https://www.digitalocean.com/community/tutorials/how-to-build-a-modern-web-application-to-manage-customer-information-with-django
	handleCreate(){
	//Sending dummy data to server
        eventService.createEvent(
          {

            "name": "XYZ",
            "location": "Tempe,AZ",
            "date": "2019-09-2019",
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
				<p>Create a form here for creating Event</p>
				<button onClick={this.handleSubmit}> Send </button>
			</div>
			

			);
	}
	
}
export default CreateEvent;
