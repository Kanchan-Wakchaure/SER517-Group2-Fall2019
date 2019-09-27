//@author Raisa 9-21-19
import React , {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {AppBar, TextField}  from 'material-ui';
import EventsService from '../EventsService';
import {FormLabel, Input, Button}  from '@material-ui/core';

const eventService=new EventsService();

class CreateEvent extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            eventDetails: {
                name: '',
                location: '',
                date: ''
            }
        };
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	//https://www.digitalocean.com/community/tutorials/how-to-build-a-modern-web-application-to-manage-customer-information-with-django
	handleCreate(){
	//Sending dummy data to server
	eventService.createEvent(
          {
            "name": this.state.eventDetails.name,
            "location": this.state.eventDetails.location,
            "date": this.state.eventDetails.date,
        }          
        ).then((result)=>{
          alert("Event created!");
        }).catch(()=>{
          alert('There was an error! Please re-check your form.');
        });
      }
	//https://www.digitalocean.com/community/tutorials/how-to-build-a-modern-web-application-to-manage-customer-information-with-django-and-react-on-ubuntu-18-04  
	handleSubmit(event) {
	    event.preventDefault();
        this.handleCreate();
    }

    handleInputChange(event, inputPropName) {
        const newState = Object.assign({}, this.state);
        newState.eventDetails[inputPropName] = event.target.value;
        this.setState(newState);
     }

	render() {
		return(
			<div>
                <MuiThemeProvider>
                    <FormLabel htmlFor="name">Event Title</FormLabel> &nbsp;&nbsp;
                    <Input type="text" name="name" id="name" required
                        value={this.state.eventDetails.name}
                        onChange={event => this.handleInputChange(event, 'name')}/>
                   <br/>
                   <FormLabel htmlFor="location"> Location </FormLabel> &nbsp;&nbsp;
                   <Input type="text" name="location" id="location" required
                        value={this.state.eventDetails.location}
                        onChange = {event => this.handleInputChange(event, 'location')} />
                   <br/>
                   <FormLabel> Date </FormLabel>&nbsp;&nbsp;
                   <Input type="date" name="date" id="date" required
                        value={this.state.eventDetails.date}
                        onChange = {event => this.handleInputChange(event, 'date')}/>
                   <br/>
                   <Button onClick={this.handleSubmit} style={style}> Send </Button>
                </MuiThemeProvider>
            </div>
			);
	}
}

const style = {
 margin: 15,
};

export default CreateEvent;
