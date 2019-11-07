//@author Raisa 9-21-19
// References: 	//https://www.digitalocean.com

import React from 'react';
import {FormGroup, Button, TextField, InputAdornment } from '@material-ui/core';
import EventsService from '../../Services/EventsService';
import DescriptionIcon from '@material-ui/icons/Description';
import EventIcon from '@material-ui/icons/Event';
import ScheduleIcon from '@material-ui/icons/Schedule';
import RoomIcon from '@material-ui/icons/Room';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import AddCircleOutlineTwoToneIcon from '@material-ui/icons/AddCircleOutlineTwoTone';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Homepage from '../home/Homepage';

import './CreateEvent.css';
import Map from '../map/Map.js';

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
                location: ''
            },
            markerPosition: {
                lat: 33.4255,
                lng: -111.9400
            },
            notifyUsers: [],
            email: '',
            phone: '',
            form_title_error:'',
            form_date_error:'',
            form_time_error:'',
            form_destination_error:'',
            form_conflict:' ',
            form_success:' ',
            form_travel_conflict_next:' '
        };
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	//https://www.digitalocean.com/community/tutorials/how-to-build-a-modern-web-application-to-manage-customer-information-with-django
	handleCreate(ref){

	eventService.createEvent(
          {
            "title": this.state.eventDetails.title,
            "date": this.state.eventDetails.date,
            "time": this.state.eventDetails.time,
            "duration": this.state.eventDetails.duration,
            "destination": this.state.eventDetails.location,
            "notifyUsers": JSON.stringify(this.state.notifyUsers)
        }
        ).then((response)=>{
            ref.setState({form_success:"You have successfully created an event!"});
            ref.setState({form_title_error:""});
            ref.setState({form_date_error:""});
            ref.setState({form_time_error:""});
            ref.setState({form_destination_error:""});
            ref.setState({form_conflict:""});
            ref.setState({form_travel_conflict_next:""});

        }).catch(function (error) {
            if (error.response) {

                if(error.response.status===406){
                    ref.setState({form_conflict:"This event conflicts with another event. Please check your agenda."});
                    ref.setState({form_title_error:""});
                    ref.setState({form_date_error:""});
                    ref.setState({form_time_error:""});
                    ref.setState({form_destination_error:""});
                    ref.setState({form_success:""});
                    ref.setState({form_travel_conflict_next:""});

                }
                else if(error.response.status===412){
                    ref.setState({form_travel_conflict_next:"Travel time between this event and next event is too short."});
                    ref.setState({form_conflict:""});
                    ref.setState({form_title_error:""});
                    ref.setState({form_date_error:""});
                    ref.setState({form_time_error:""});
                    ref.setState({form_destination_error:""});
                    ref.setState({form_success:""});

                }
                else if(error.response.status===400){
                    let msg="";
                    let title_error="";
                    let date_error="";
                    let time_error="";
                    let destination_error="";
                    console.log("title_error",title_error)
                    if(error.response.data.title!==undefined){
                        title_error="Please provide an event description";

                    }
                    if(error.response.data.date!==undefined){
                        date_error="Please provide a date";

                    }
                    if(error.response.data.time!==undefined){
                        time_error="Please provide a time";

                    }
                    if(error.response.data.destination!==undefined){
                        destination_error="Please provide a location";
                      
                    }

                    ref.setState({form_title_error:title_error});
                    ref.setState({form_date_error:date_error});
                    ref.setState({form_time_error:time_error});
                    ref.setState({form_destination_error:destination_error});
                    ref.setState({form_success:""});
                    ref.setState({form_conflict:""});
                    ref.setState({form_travel_conflict_next:""});


                }
                else if(error.response.status===500){
                    console.log("Internal server error");
                }
                else{
                    console.log("some other error occurred.")
                }

            }
        });
      }

	handleSubmit(event) {
	   console.log("this2:", this.state.form_error)
	   event.preventDefault();
       this.handleCreate(this);
    }

    handleInputChange(event, inputPropName) {
        const newState = Object.assign({}, this.state);
        newState.eventDetails[inputPropName] = event.target.value;
        this.setState(newState);
     }

    handleEmailChange = idx => evt => {
        const newNotifyUsers = this.state.notifyUsers.map((notifyUser, sidx) => {
          if (idx !== sidx) return notifyUser;
          return { ...notifyUser, email: evt.target.value };
        });

        this.setState({ notifyUsers: newNotifyUsers });
    };

    handlePhoneChange = idx => evt => {
        const newNotifyUsers = this.state.notifyUsers.map((notifyUser, sidx) => {
          if (idx !== sidx) return notifyUser;
          return { ...notifyUser, phone: evt.target.value };
        });

        this.setState({ notifyUsers: newNotifyUsers });
    };

  handleInputs = () => {
    this.setState({
      notifyUsers: this.state.notifyUsers.concat([{ email: '',phone:'' }])
    });
  };

handleRemoveInput = idx => () => {
    this.setState({
      notifyUsers: this.state.notifyUsers.filter((s, sidx) => idx !== sidx)
    });
  };

	render() {
    if(localStorage.getItem('token')==null){
      return <Homepage/>
    }
    else
    {
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
                               id="location"
                               fullWidth
                               label="Go to"
                               name="location"
                               value={this.state.eventDetails.location}
                               style={{paddingLeft: '5px',paddingRight:'15px'}}
                               onChange = { event => this.handleInputChange(event, 'location') }
                               InputProps={{
                                    endAdornment: ( <InputAdornment position="end" style={{height: '50px'}}>
                                                        <RoomIcon />
                                                    </InputAdornment>
                                                  ) }}/>
                   </FormGroup><br/>
                   <FormGroup>
                       <div>
                           {this.state.notifyUsers.map((notifyUser, idx) => (
                           <div>
                                <TextField
                                    value={notifyUser.email}
                                    variant="outlined"
                                    style={{paddingLeft: '5px',paddingRight:'15px',paddingBottom:'5px', width:'45%'}}
                                    label="User email ID"
                                    onChange={this.handleEmailChange(idx)}/>
                                     <TextField
                                    value={notifyUser.phone}
                                    variant="outlined"
                                    style={{paddingRight:'15px', paddingBottom:'5px', width:'45%'}}
                                    label="User phone number"
                                    onChange={this.handlePhoneChange(idx)}/>
                                    <HighlightOffIcon
                                      type="button"
                                      onClick={this.handleRemoveInput(idx)}
                                    />
                           </div>
                           ))}
                       </div>
                       <div onClick={this.handleInputs}>
                       <InputAdornment
                            position="end"
                            style={{height: '50px', paddingRight: '40%'}}>
                            <AddCircleOutlineTwoToneIcon />
                            <label>Send text messages to users</label>
                       </InputAdornment>
                       </div>
                    </FormGroup>
                   <Button fullWidth style={{backgroundColor: "#3f51b5", paddingLeft: '5px',
                           paddingRight:'15px', fontColor: "white"}} onClick={this.handleSubmit} > Create Event </Button>
                   <br/><br/>
                   </form>
                   <div id="form-error">
                    <div>{this.state.form_conflict}</div>
                    <div>{this.state.form_travel_conflict_next}</div>
                    <div>{this.state.form_title_error}</div>
                    <div>{this.state.form_date_error}</div>
                    <div>{this.state.form_time_error}</div>
                    <div>{this.state.form_destination_error}</div>
                   </div>
                   <div id="event-created">{this.state.form_success}</div>
                </div>
                </div>
            </Container>
      );
      }
	}
}

export default CreateEvent;
