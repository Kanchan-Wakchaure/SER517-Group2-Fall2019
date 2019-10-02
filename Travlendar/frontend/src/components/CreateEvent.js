//@author Raisa 9-21-19
import React , {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {AppBar}  from 'material-ui';
import {FormGroup, FormLabel, Input, Button, TextField}  from '@material-ui/core';
import EventsService from '../EventsService';

const eventService=new EventsService();

class CreateEvent extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            eventDetails: {
                title: '',
                date: '',
                duration: '',
                source: '',
                destination: ''
            }
        };
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	//https://www.digitalocean.com/community/tutorials/how-to-build-a-modern-web-application-to-manage-customer-information-with-django
	handleCreate(){

	eventService.createEvent(
          {
            "title": this.state.eventDetails.name,
            "date": this.state.eventDetails.date,
            "duration": this.state.eventDetails.duration,
            "source": this.state.eventDetails.source,
            "destination": this.state.eventDetails.destination
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
			<div className="createEvent">
                <MuiThemeProvider>
                    <FormGroup>
                    <TextField name="description" id="description" required
                        label="Description"
                        value={this.state.eventDetails.title}
                        onClick={this.boxClick}
                        onChange={event => this.handleInputChange(event, 'title')}/>
                   </FormGroup><br/>
                   <FormGroup>
                   <TextField type="date" name="date" id="date"
                        label = "Date" required
                        value={this.state.eventDetails.date}
                        onChange = {event => this.handleInputChange(event, 'date')}/>
                   </FormGroup><br/>
                   <FormGroup>
                   <TextField type="number" name="duration" id="duration" required
                        label ="Duration (minutes)" value={this.state.eventDetails.duration}
                        onChange = {event => this.handleInputChange(event, 'duration')}/>
                   </FormGroup><br/>
                   <FormGroup>
                   <TextField type="text" name="source" id="source" required
                        label = "Source" value={this.state.eventDetails.source}
                        onChange = {event => this.handleInputChange(event, 'source')} />
                   </FormGroup><br/>
                   <FormGroup>
                   <TextField type="text" name="destination" id="destination" required
                        label = "Destination" value={this.state.eventDetails.destination}
                        onChange = {event => this.handleInputChange(event, 'destination')} />
                   </FormGroup><br/>
                   <Button onClick={this.handleSubmit} style={style}> Create Event </Button>
                </MuiThemeProvider>
            </div>
			);
	}
}

const style = {
 margin: 15,
};

export default CreateEvent;
