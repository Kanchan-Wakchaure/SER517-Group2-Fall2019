//@author Raisa 9-21-19
import React , {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {AppBar}  from 'material-ui';
import {Grid, FormGroup, FormLabel, InputLabel, Input, Button, TextField, FilledInput, InputAdornment }  from '@material-ui/core';
import EventsService from '../EventsService';
import DescriptionIcon from '@material-ui/icons/Description';
import EventIcon from '@material-ui/icons/Event';
import ScheduleIcon from '@material-ui/icons/Schedule';
import RoomIcon from '@material-ui/icons/Room';


const eventService=new EventsService();

class CreateEvent extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            eventDetails: {
                title: '',
                date: '',
                time:'',
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
            "title": this.state.eventDetails.title,
            "date": this.state.eventDetails.date,
            "time": this.state.eventDetails.time,
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
			<div>
                <MuiThemeProvider>
                    <h4 style={{"textAlign": 'center'}}> Create Event </h4>
                    <FormGroup row = "true">
                    <InputLabel className="createEvent">Description</InputLabel>
                   <FilledInput  type="text" name="title" id="title" required
                        value={this.state.eventDetails.name}
                        onChange={event => this.handleInputChange(event, 'title')}
                        className ="createEventField1"
                   />
                   <InputAdornment style={{height: '50px'}}>
                        <DescriptionIcon />
                   </InputAdornment>
                   </FormGroup>
                   <br/>
                   <FormGroup row = "true">
                   <InputLabel className="createEvent">Date</InputLabel>
                   <FilledInput className ="createEventField1" type="date" name="date" id="date"
                        required value={this.state.eventDetails.date}
                        onChange = {event => this.handleInputChange(event, 'date')}/>
                   <InputAdornment style={{height: '50px'}}>
                        <EventIcon />
                   </InputAdornment>
                   </FormGroup><br/>
                   <FormGroup row = "true">
                   <InputLabel className="createEvent">Start Time</InputLabel>
                   <FilledInput className ="createEventField1" type="time" name="time" id="time"
                        required value={this.state.eventDetails.time}
                        onChange = {event => this.handleInputChange(event, 'time')}/>
                   <InputAdornment style={{height: '50px'}}>
                        <ScheduleIcon />
                   </InputAdornment>
                   </FormGroup><br/>
                   <FormGroup row = "true">
                   <InputLabel className="createEvent">Duration (minutes)</InputLabel>
                   <FilledInput className ="createEventField1"  type="number" name="duration" id="duration" required
                        value={this.state.eventDetails.duration}
                        onChange = {event => this.handleInputChange(event, 'duration')}/>
                   <InputAdornment style={{height: '50px'}}>
                        <ScheduleIcon />
                   </InputAdornment>
                   </FormGroup><br/>
                   <FormGroup row = "true">
                   <InputLabel className="createEvent">Source</InputLabel>
                   <FilledInput className ="createEventField1"  type="text" name="source" id="source" required
                        value={this.state.eventDetails.source}
                        onChange = {event => this.handleInputChange(event, 'source')} />
                   <InputAdornment style={{height: '50px'}}>
                        <RoomIcon />
                   </InputAdornment>
                   </FormGroup><br/>
                   <FormGroup row = "true">
                   <InputLabel className="createEvent">Destination</InputLabel>
                   <FilledInput className ="createEventField1"  type="text" name="destination" id="destination" required
                        value={this.state.eventDetails.destination}
                        onChange = {event => this.handleInputChange(event, 'destination')} />
                    <InputAdornment style={{height: '50px'}}>
                        <RoomIcon />
                   </InputAdornment>
                   </FormGroup><br/>
                   <Button onClick={this.handleSubmit} style={{alignItems: 'center', justifyContent: 'center'}}> Create Event </Button>
                </MuiThemeProvider>
            </div>
			);
	}
}
export default CreateEvent;
