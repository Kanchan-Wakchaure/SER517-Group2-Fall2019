import React from 'react';
import { compose, withStateHandlers } from "recompose";
import { withGoogleMap, withScriptjs, GoogleMap, Marker } from 'react-google-maps';
import { Button, TextField, InputAdornment } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddCircleOutlineTwoToneIcon from '@material-ui/icons/AddCircleOutlineTwoTone';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Homepage from '../home/Homepage';
import Geocode from "react-geocode";
import EventsService from '../../Services/EventsService';
import '../createEvent/CreateEvent.css';
import { NotificationManager } from 'react-notifications';

/*
    Author: Kanchan Wakchaure
    Date: 11-05-2019
    Description: Create event page to schedule events
*/

Geocode.setApiKey( "AIzaSyBUopytfPOU40AvS9RkEk0SSg1awyNxNqA" );
Geocode.enableDebug();

const eventService=new EventsService();

const Map = compose(
             withStateHandlers(() => ({ isMarkerShown: false, markerPosition: null, openForm: false}), 
                                     { onMapClick: 
                                        ({ isMarkerShown }) => (e) => ({ markerPosition: e.latLng, isMarkerShown:true})
                                     },
                              ),
             withScriptjs,
             withGoogleMap
            )(props => 
            <GoogleMap
                defaultZoom={14}
                defaultCenter={{ lat: 33.424564, lng: -111.928001 }}
                onClick={props.onMapClick}>
                {props.isMarkerShown && <Marker position={props.markerPosition} 
                                                onClick={props.onMarkerClick} 
                                                {...props}
                                        />
                }
            </GoogleMap>
    )

const initialState = {
    eventDetails: {
        title: '',
        date: '',
        time:'',
        duration: ''
    },
    address: '',
    notifyUsers: [],
    email: '',
    phone: '',
    open: false
}

export default class CreateEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          eventDetails: {
            title: '',
            date: '',
            time:'',
            duration: '',
          },
          address: '',
          notifyUsers: [],
          email: '',
          phone: '',
          open: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleMarkerClick = (event) => {
        Geocode.fromLatLng( event.latLng.lat() , event.latLng.lng() ).then(
            response => {
              const address = response.results[0].formatted_address;
              this.setState( {
                address: ( address ) ? address : '',
              } )
            },
            error => {
              console.error(error);
            }
          );
        this.togglePopUp();
    }  

    togglePopUp = () => {
      const { open } = this.state;
      this.setState({ open : !open});
    }

    handleCancel = () => {
        this.setState(initialState);
    }

    handleCreate(ref){
        eventService.createEvent(
          {
            "title": this.state.eventDetails.title,
            "date": this.state.eventDetails.date,
            "time": this.state.eventDetails.time,
            "duration": this.state.eventDetails.duration,
            "destination": this.state.address,
            "notifyUsers": JSON.stringify(this.state.notifyUsers)
          }
        ).then((response)=>{
          NotificationManager.success("You have successfully created an event!", "Successful");
          this.setState(initialState);
        }).catch(function (error){
          if (error.response) {
    
            if(error.response.status===406){
                NotificationManager.warning("This event conflicts with another event. Please check your agenda.","",6000);
            }
            else if(error.response.status===412){
                console.log("text: ",error.response.data);
                if(error.response.data==='next'){
                    NotificationManager.warning("Travel time between this event and next event is too short. Cannot insert."," ",6000);
    
                }
                if(error.response.data==='prev'){
                    NotificationManager.warning("Travel time between previous event and this event is too short. Cannot insert."," ",6000);
                }
                if(error.response.data==='both'){
                    NotificationManager.warning("Travel time between both the previous event and next event with respect to this event is too short. Cannot insert."," ",6000);
                }
    
    
            }
            else if(error.response.status===400){
    
                if(error.response.data.title!==undefined){
                    NotificationManager.error("Please provide an event description", "Error");
                }
                if(error.response.data.date!==undefined){
                    NotificationManager.error("Please provide a date", "Error");
                }
                if(error.response.data.time!==undefined){
                    NotificationManager.error("Please provide a time", "Error");
                }
                if(error.response.data.destination!==undefined){
                    NotificationManager.error("Please provide a location", "Error");
                }
    
            }
            else if(error.response.status===500){
    
                if(error.response.data==='API'){
                    NotificationManager.error("Internal server error due to google MAP API","Error");
                }
    
                if(error.response.data==='unreachable')
                {
                    NotificationManager.error("Address entered is unreachable.","Error");
                }
    
            }
            else{
                NotificationManager.error("Unable to create an event at the moment.", "Error");
            }
    
        }
    
        });
    
      }
    
    handleSubmit(event) {
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
        else{
            return (
            <div style={{ height: '100%', marginTop: '-60px' }}>
                <Map
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBUopytfPOU40AvS9RkEk0SSg1awyNxNqA"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `1000px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    onMarkerClick={this.handleMarkerClick}
                />
                <Dialog open = {this.state.open} onClose={this.togglePopUp} aria-labelledby="form-dialog-title">
                  <DialogTitle id="form-dialog-title">Add Event</DialogTitle>
                  <DialogContent>
                    <TextField autoFocus
                               margin="dense"
                               id="title"
                               label="Description"
                               type="title"   
                               fullWidth 
                               InputLabelProps={{ shrink: true }}
                               value={this.state.eventDetails.title}
                               onChange = { event => this.handleInputChange(event, 'title') }/>
                    <TextField autoFocus
                               margin="dense"
                               id="date"
                               label="Date"
                               type="date"
                               InputLabelProps={{ shrink: true }}
                               fullWidth 
                               value={this.state.eventDetails.date}
                               onChange = { event => this.handleInputChange(event, 'date') }/>
                    <TextField autoFocus
                               margin="dense"
                               id="time"
                               label="Time"
                               type="time"
                               InputLabelProps={{ shrink: true }}
                               fullWidth 
                               value={this.state.eventDetails.time}
                               onChange = { event => this.handleInputChange(event, 'time') }/>
                    <TextField autoFocus
                               margin="dense"
                               id="duration"
                               label="Duration"
                               type="duration"
                               InputLabelProps={{ shrink: true }}
                               fullWidth 
                               value={this.state.eventDetails.duration}
                               onChange = { event => this.handleInputChange(event, 'duration') }/>
                    <TextField autoFocus
                               margin="dense"
                               id="address"
                               label="Address"
                               type="Address"
                               InputLabelProps={{ shrink: true }}
                               InputProps={{readOnly: true}}
                               defaultValue={this.state.address}
                               disabled
                               fullWidth 
                               value={this.state.address}
                               onChange = { event => this.handleInputChange(event, 'address') }/> 
                    <br/><br/>
                    <div onClick={this.handleInputs}>
                        <InputAdornment position="end"
                                        style={{height: '50px'}}>
                            <AddCircleOutlineTwoToneIcon style={{marginLeft:'-15px', marginRight: '5px'}}/>
                            <label>Send text messages to users</label>
                        </InputAdornment>
                    </div>   
                    <br/>
                    <div>
                        {this.state.notifyUsers.map((notifyUser, idx) => (
                            <div>
                                <TextField value={notifyUser.email}
                                           variant="outlined"
                                           style={{paddingLeft: '5px',paddingRight:'5px',paddingBottom:'5px', width:'45%'}}
                                           label="Attendee Email ID"
                                           onChange={this.handleEmailChange(idx)}/>
                                <TextField value={notifyUser.phone}
                                           variant="outlined"
                                           style={{paddingRight:'5px', paddingBottom:'5px', width:'45%'}}
                                           label="Attendee Phone Number"
                                           onChange={this.handlePhoneChange(idx)}/>
                                <HighlightOffIcon type="button"
                                                  onClick={this.handleRemoveInput(idx)}/>
                            </div>
                        ))}
                    </div>                          
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleCancel} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={this.handleSubmit} color="primary">
                      Create Event
                    </Button>
                  </DialogActions>
                </Dialog>             
            </div>
            )
        }
    }
}
