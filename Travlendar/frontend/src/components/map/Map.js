import React from 'react';
import AddCircleOutlineTwoToneIcon from '@material-ui/icons/AddCircleOutlineTwoTone';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Homepage from '../home/Homepage';
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
import {FormGroup, Button, TextField, InputAdornment } from '@material-ui/core';
import Geocode from "react-geocode";
import Autocomplete from 'react-google-autocomplete';
import EventsService from '../../Services/EventsService';
import '../createEvent/CreateEvent.css';
import { NotificationManager } from 'react-notifications';
import Container from '@material-ui/core/Container';

/*
    Author: Kanchan Wakchaure
    Date: 11-05-2019
    Description: Google Map to schedule events
    References: https://www.digitalocean.com; 
                https://github.com/imranhsayed/google-maps-in-react

*/

Geocode.setApiKey( "AIzaSyBUopytfPOU40AvS9RkEk0SSg1awyNxNqA" );
Geocode.enableDebug();

const eventService=new EventsService();

class Map extends React.Component {
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
            mapPosition: {
              lat: this.props.center.lat,
              lng: this.props.center.lng
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
            form_success:' '
        };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  getInitialState() {
    let initialState = {
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
        form_success:' '
    };
    return initialState;
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
      ref.setState({form_success:"You have successfully created an event!"});
      NotificationManager.success("You have successfully created an event!", "Successful");

      this.setState(this.getInitialState());
    }).catch(function (error){
      if (error.response) {

        if(error.response.status===406){
            ref.setState({form_conflict:"This event conflicts with another event. Please check your agenda."});
            NotificationManager.warning("This event conflicts with another event. Please check your agenda.")
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

            NotificationManager.error("Please re-check event information.", "Error");
        }
        else if(error.response.status===500){
            NotificationManager.error("Unable to create an event at the moment.", "Error");
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

  /**
   * Get the current address from the default map position and set those values in the state
   */
  componentDidMount() {
    Geocode.fromLatLng( this.state.mapPosition.lat , this.state.mapPosition.lng ).then(
      response => {
        const address = response.results[0].formatted_address;

        this.setState( {
          address: ( address ) ? address : ''
        } )
      },
      error => {
        console.error( error );
      }
    );
  };
  /**
   * Component should only update ( meaning re-render ), when the user selects the address, or drags the pin
   *
   * @param nextProps
   * @param nextState
   * @return {boolean}
   */
  shouldComponentUpdate( nextProps, nextState ){
    if (
      this.state.markerPosition.lat !== this.props.center.lat ||
      this.state.address !== nextState.address ||
      this.state.city !== nextState.city ||
      this.state.area !== nextState.area ||
      this.state.state !== nextState.state
    ) {
      return true
    } else if ( this.props.center.lat === nextProps.center.lat ){
      return false
    }
  }

  /**
   * Get the address and set the address input value to the one selected
   *
   * @param addressArray
   * @return {string}
   */
  getState = ( addressArray ) => {
    let state = '';
    for( let i = 0; i < addressArray.length; i++ ) {
      for( let i = 0; i < addressArray.length; i++ ) {
        if ( addressArray[ i ].types[0] && 'administrative_area_level_1' === addressArray[ i ].types[0] ) {
          state = addressArray[ i ].long_name;
          return state;
        }
      }
    }
  };
  
  /**
   * This Event triggers when the marker window is closed
   *
   * @param event
   */
  onInfoWindowClose = ( event ) => {

  };
  
    /**
   * When the marker is dragged you get the lat and long using the functions available from event object.
   * Use geocode to get the address, city, area and state from the lat and lng positions.
   * And then set those values in the state.
   *
   * @param event
   */
  onMarkerDragEnd = ( event ) => {
    let newLat = event.latLng.lat(),
        newLng = event.latLng.lng();

    Geocode.fromLatLng( newLat , newLng ).then(
      response => {
        const address = response.results[0].formatted_address;
        this.setState( {
          address: ( address ) ? address : '',
          markerPosition: {
            lat: newLat,
            lng: newLng
          },
          mapPosition: {
            lat: newLat,
            lng: newLng
          },
        } )
      },
      error => {
        console.error(error);
      }
    );
  };


  /**
   * When the user types an address in the search box
   * @param place
   */
  onPlaceSelected = ( place ) => {
    console.log( 'plc', place );
    const address = place.formatted_address,
          latValue = place.geometry.location.lat(),
          lngValue = place.geometry.location.lng();
    // Set these values in the state.
    this.setState({
      address: ( address ) ? address : '',
      markerPosition: {
        lat: latValue,
        lng: lngValue
      },
      mapPosition: {
        lat: latValue,
        lng: lngValue
      },
    })
  };  

  render() {
    if(localStorage.getItem('token')==null){
      return <Homepage/>
    }
    else
    {
      const AsyncMap = withScriptjs(
        withGoogleMap(
          props => (
            <GoogleMap google={ this.props.google }
                       defaultZoom={ this.props.zoom }
                       defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
            >
            
            { /* InfoWindow on top of marker */ }
            <InfoWindow
                onClose={this.onInfoWindowClose}
                position={{ lat: ( this.state.markerPosition.lat + 0.0018 ), lng: this.state.markerPosition.lng }}>   
              <div>
                <span style={{ padding: 0, margin: 0 }}>{ this.state.address }</span>
              </div>
            </InfoWindow>
              
            {/*Marker*/}
            <Marker google={this.props.google}
                    name={'Dolores park'}
                    draggable={true}
                    onDragEnd={ this.onMarkerDragEnd }
                    position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}/>
            <Marker />
            <br/>
            {/* For Auto complete Search Box */}
            <Autocomplete
              style={{
                width: '99%',
                height: '40px',
                align: 'center',
                paddingLeft: '5px',
                paddingRight: '5px',
                marginTop: '2px',
                marginBottom: '500px',
                marginRight: '5px',
                justify: 'center'
              }}
              onPlaceSelected={ this.onPlaceSelected }
              types={['(regions)']}
            />
            
            </GoogleMap>
          )
        )
      );

      let map;
      if( this.props.center.lat !== undefined ) {
        map = 
        <Container>
            <form style={{backgroundColor: 'white', marginTop: '30px', marginBottom: '0px'}}>
              <FormGroup>
                <h2 style={{textAlign: 'center', color: "#3f51b5"}}> <u>CREATE EVENT</u ></h2><br/>
              </FormGroup>
              <FormGroup>
                <TextField variant="outlined"
                           required
                           id="title"
                           label="Event description"
                           name="title"
                           value={this.state.eventDetails.title}
                           style={{paddingLeft: '5px',paddingRight:'5px', height:'45px'}}
                           onChange = { event => this.handleInputChange(event, 'title') }
                />
              </FormGroup>
              <br/> <br/>
              <FormGroup>
                <TextField variant="outlined"
                           required
                           type="date"
                           id="date"
                           label="Date"
                           name="date"
                           value={this.state.eventDetails.date}
                           style={{paddingLeft: '5px',paddingRight:'5px', height:'45px'}}
                           InputLabelProps={{ shrink: true }}
                           onChange = { event => this.handleInputChange(event, 'date') }
                  />
              </FormGroup><br/><br/>
              <FormGroup>
                <TextField variant="outlined"
                           required
                           type="time"
                           id="time"
                           label="Time"
                           name="time"
                           value={this.state.eventDetails.time}
                           style={{paddingLeft: '5px',paddingRight:'5px', height:'45px'}}
                           InputLabelProps={{ shrink: true }}
                           onChange = { event => this.handleInputChange(event, 'time') }
                />
              </FormGroup><br/><br/>
              <FormGroup>
                <TextField variant="outlined"
                           type="number"
                           required
                           id="duration"
                           label="Duration (minutes)"
                           name="duration"
                           value={this.state.eventDetails.duration}
                           style={{paddingLeft: '5px',paddingRight:'5px', height:'45px'}}
                           onChange = { event => this.handleInputChange(event, 'duration') }
                /><br/>
              </FormGroup><br/>
              <FormGroup>
                <TextField variant="outlined"
                           required
                           id="address"
                           label="Address"
                           name="address"
                           readOnly="readOnly"
                           value={this.state.address}
                           style={{paddingLeft: '5px',paddingRight:'5px'}}
                           onChange = { event => this.handleInputChange(event, 'address') }/>
              </FormGroup> <br/>
              <FormGroup>
              <AsyncMap
                  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBUopytfPOU40AvS9RkEk0SSg1awyNxNqA&libraries=places"
                  loadingElement={
                    <div style={{ height: `100%`, paddingLeft: '5px',paddingRight:'5px' }} />
                  }
                  containerElement={
                    <div style={{ height: this.props.height , paddingLeft: '5px', paddingRight:'5px'}} />
                  }
                  mapElement={
                    <div style={{ height: `100%`, paddingLeft: '5px', paddingRight:'5px'}} />
                  } 
              />
              </FormGroup>
            <br/><br/><br/>
            <FormGroup>
                <div>
                    {this.state.notifyUsers.map((notifyUser, idx) => (
                    <div>
                      <TextField value={notifyUser.email}
                                 variant="outlined"
                                 style={{paddingLeft: '5px',paddingRight:'5px',paddingBottom:'5px', width:'45%'}}
                                 label="User email ID"
                                 onChange={this.handleEmailChange(idx)}/>
                      <TextField value={notifyUser.phone}
                                 variant="outlined"
                                 style={{paddingRight:'5px', paddingBottom:'5px', width:'45%'}}
                                 label="User phone number"
                                 onChange={this.handlePhoneChange(idx)}/>
                        <HighlightOffIcon type="button"
                                          onClick={this.handleRemoveInput(idx)}
                        />
                    </div>
                    ))}
                </div>
                <br/>
                <div onClick={this.handleInputs}>
                  <InputAdornment position="end"
                                  style={{height: '50px', paddingRight: '40%'}}>
                    <AddCircleOutlineTwoToneIcon />
                    <label>Send text messages to users</label>
                    </InputAdornment>
                </div>
              </FormGroup>  
              <br/>
            <FormGroup>
            <div style={{textAlign: 'center', marginLeft: '5px', marginRight: '5px'}}> 
            <Button fullWidth variant="contained" size="large" color="primary" onClick={this.handleSubmit} > 
              Create Event                       
            </Button>  
            </div>
            </FormGroup>
            <br/>          
            </form>
            </Container>
      } else {
        map = <div style={{height: this.props.height}} />
      }
      return( map );       
    }
  }
  
}

export default Map;