import React from 'react';
import { compose, withStateHandlers } from "recompose";
import { withGoogleMap, withScriptjs, GoogleMap, Marker } from 'react-google-maps';

import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import './MapContainer.css';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const Map = compose(
             withStateHandlers(() => ({ isMarkerShown: false, markerPosition: null, openForm: false}), 
                                     { onMapClick: 
                                        ({ isMarkerShown }) => (e) => ({ markerPosition: e.latLng, isMarkerShown:true})
                                     },
                                     {
                                      onMarkerClick: () => (marker) => {console.log("Get marker position here")},
                                     }
                              ),
             withScriptjs,
             withGoogleMap
            )
    (props =>
        <GoogleMap
            defaultZoom={14}
            defaultCenter={{ lat: 33.424564, lng: -111.928001 }}
            onClick={props.onMapClick}>
            {props.isMarkerShown && 
            <Marker position={props.markerPosition} 
            onClick={props.onMarkerClick} 
            {...props}/>}
        </GoogleMap>
    )

export default class MapContainer extends React.Component {
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
          markerPosition: ''
        };
        this.togglePopUp = this.togglePopUp.bind(this);
    }

    togglePopUp = () => {
      const { open } = this.state;
      this.setState({ open : !open});
    }


    render() {
        return (
            <div style={{ height: '100%', marginTop: '-60px' }}>
                <Map
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBUopytfPOU40AvS9RkEk0SSg1awyNxNqA"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `1000px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
                <div className="add-btn">
                    <Fab color="primary" aria-label="add" onClick={this.togglePopUp}>
                        <AddIcon />
                    </Fab>
                </div>
                <Dialog open = {this.state.open} onClose={this.togglePopUp} aria-labelledby="form-dialog-title">
                  <DialogTitle id="form-dialog-title">Add Event</DialogTitle>
                  <DialogContent>
                    <TextField autoFocus
                               margin="dense"
                               id="title"
                               label="Description"
                               type="title"   
                               fullWidth />
                    <TextField autoFocus
                               margin="dense"
                               id="date"
                               label="Date"
                               type="date"
                               InputLabelProps={{ shrink: true }}
                               fullWidth />
                    <TextField autoFocus
                               margin="dense"
                               id="time"
                               label="Time"
                               type="time"
                               InputLabelProps={{ shrink: true }}
                               fullWidth />
                    <TextField autoFocus
                               margin="dense"
                               id="duration"
                               label="Duration"
                               type="duration"
                               InputLabelProps={{ shrink: true }}
                               fullWidth />
                    <TextField autoFocus
                               margin="dense"
                               id="location"
                               label="Location"
                               type="location"
                               InputLabelProps={{ shrink: true }}
                               InputProps={{readOnly: true}}
                               defaultValue="ASU Tempe"
                               disabled
                               fullWidth />          
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.togglePopUp} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={this.togglePopUp} color="primary">
                      Create Event
                    </Button>
                  </DialogActions>
                </Dialog>             
            </div>
        )
    }
}
