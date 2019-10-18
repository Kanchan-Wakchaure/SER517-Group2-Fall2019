//@author Raisa 9-21-19
// References: 	//https://www.digitalocean.com

import React from 'react';
import {FormGroup, Button, TextField, InputAdornment, Input } from '@material-ui/core';
import EventsService from '../../Services/EventsService';
import DescriptionIcon from '@material-ui/icons/Description';
import EventIcon from '@material-ui/icons/Event';
import ScheduleIcon from '@material-ui/icons/Schedule';
import RoomIcon from '@material-ui/icons/Room';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

import './CreateEvent.css';
import Map from './../map.js';

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
            },
            inputs: ['input-0']
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
          alert("See View events tab.");
        }).catch(()=>{
          alert('There was an error! Please re-check your form.');
        });
      }

	handleSubmit(event) {
	    event.preventDefault();
        this.handleCreate();
    }

    handleInputChange(event, inputPropName) {
        const newState = Object.assign({}, this.state);
        newState.eventDetails[inputPropName] = event.target.value;
        this.setState(newState);
     }

    appendInput() {
        var newInput = `input-${this.state.inputs.length}`;
        this.setState(prevState => ({ inputs: prevState.inputs.concat([newInput]) }));
    }
	render() {
		return(
			<Container>
                <CssBaseline />
                <br/><br/><br/>
                    <div className="row">
                    <div className="column">
                    <Map/>
                    </div>
                    <div className="column">
                    <form style={{backgroundColor: 'white'}}>
                    <FormGroup>
                    <h2 style={{"paddingLeft": '40%'}}> Create Event </h2><br/>
                    </FormGroup>
                    <FormGroup>
                    <TextField variant="outlined"
                               required
                               id="title"
                               fullWidth
                               label="Event description"
                               name="title"
                               value={this.state.eventDetails.title}
                               style={{paddingLeft: '5px',paddingRight:'15px', height:'45px'}}
                               onChange = { event => this.handleInputChange(event, 'title') }
                               InputProps={{
                                    endAdornment: ( <InputAdornment position="end" style={{height: '50px'}}>
                                                        <DescriptionIcon />
                                                    </InputAdornment>
                                                  ) }}/>
                   </FormGroup>
                   <br/>
                   <FormGroup>
                   <TextField variant="outlined"
                               required
                               type="date"
                               id="date"
                               fullWidth
                               label="Date"
                               name="date"
                               value={this.state.eventDetails.date}
                               style={{paddingLeft: '5px',paddingRight:'15px', height:'45px'}}
                               onChange = { event => this.handleInputChange(event, 'date') }
                               InputProps={{
                                    endAdornment: ( <InputAdornment position="end" style={{height: '50px'}}>
                                                        <EventIcon />
                                                    </InputAdornment>
                                                  ) }}/>
                   </FormGroup><br/>
                   <FormGroup>
                   <TextField variant="outlined"
                               required
                               type="time"
                               id="time"
                               fullWidth
                               label="Time"
                               name="time"
                               value={this.state.eventDetails.time}
                               style={{paddingLeft: '5px',paddingRight:'15px', height:'45px'}}
                               onChange = { event => this.handleInputChange(event, 'time') }
                               InputProps={{
                                    endAdornment: ( <InputAdornment position="end" style={{height: '50px'}}>
                                                        <ScheduleIcon />
                                                    </InputAdornment>
                                                  ) }}/>
                   </FormGroup><br/>
                   <FormGroup>
                   <TextField variant="outlined"
                               type="number"
                               required
                               id="duration"
                               fullWidth
                               label="Duration (minutes)"
                               name="duration"
                               value={this.state.eventDetails.duration}
                               style={{paddingLeft: '5px',paddingRight:'15px', height:'45px'}}
                               onChange = { event => this.handleInputChange(event, 'duration') }
                               InputProps={{
                                    endAdornment: ( <InputAdornment position="end" style={{height: '50px'}}>
                                                        <ScheduleIcon />
                                                    </InputAdornment>
                                                  ) }}/>
                   </FormGroup><br/>
                   <FormGroup>
                   <TextField variant="outlined"
                               required
                               id="source"
                               fullWidth
                               label="Start At"
                               name="source"
                               value={this.state.eventDetails.source}
                               style={{paddingLeft: '5px',paddingRight:'15px', height:'45px'}}
                               onChange = { event => this.handleInputChange(event, 'source') }
                               InputProps={{
                                    endAdornment: ( <InputAdornment position="end" style={{height: '50px'}}>
                                                        <RoomIcon />
                                                    </InputAdornment>
                                                  ) }}/>
                   </FormGroup><br/>
                   <FormGroup>
                   <TextField variant="outlined"
                               required
                               id="destination"
                               fullWidth
                               label="Go to"
                               name="destination"
                               value={this.state.eventDetails.destination}
                               style={{paddingLeft: '5px',paddingRight:'15px'}}
                               onChange = { event => this.handleInputChange(event, 'destination') }
                               InputProps={{
                                    endAdornment: ( <InputAdornment position="end" style={{height: '50px'}}>
                                                        <RoomIcon />
                                                    </InputAdornment>
                                                  ) }}/>
                   </FormGroup><br/>
                   <FormGroup>
                       <div id="dynamicInput">
                           {this.state.inputs.map(input =>
                           <FormGroup>
                                <TextField key={input}
                                    variant="outlined"
                                    label="User email ID" />
                                <TextField key={input}
                                    variant="outlined"
                                    label="User phone number"/>
                           </FormGroup>
                           )}
                       </div>
                        <button onClick={ () => this.appendInput() }>
                        CLICK ME TO ADD AN INPUT
                        </button>
                    </FormGroup>
                   <Button fullWidth style={{backgroundColor: "#3f51b5", paddingLeft: '5px',
                           paddingRight:'15px', fontColor: "white"}} onClick={this.handleSubmit} > Create Event </Button>
                   <br/><br/>
                   </form>
                </div>
                </div>
            </Container>
			);
	}
}

export default CreateEvent;
