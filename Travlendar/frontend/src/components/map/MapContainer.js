import React, {Component} from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

/*
    Author: Kanchan Wakchaure
    Date: 11-05-2019
    Description: Google Map to schedule events
    References: https://www.digitalocean.com; 
                https://github.com/imranhsayed/google-maps-in-react

*/

const mapStyles = {
  width: '100%',
  height: '100%'
};

class MapContainer extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        showingInfoWindow: false,  //Hides or the shows the infoWindow
        activeMarker: {},          //Shows the active marker upon click
        selectedPlace: {},          //Shows the infoWindow to the selected place upon a marker
        userLocation: { lat: 32, lng: 32 },
        loading: true 
      };    
    } //end of constructor

    //get the browser's current location
    componentDidMount(props) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                this.setState({
                    userLocation: { lat: latitude, lng: longitude },
                    loading: false
                });
            },
            
            () => {this.setState({ loading: false });}
        );
    }

    //Shows the information window on click of a marker
    onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
    
    //closes the information window on a marker
    onClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };
    
    render()
    {
        const { loading, userLocation } = this.state;
        const { google } = this.props;
    
        if (loading) {
          return null;
        }
    
        return (
            <Map google={google}
                 zoom={14}
                 style={mapStyles}
                 initialCenter={userLocation}>
                <Marker onClick={this.onMarkerClick}
                        name={'You are here'} />
                <InfoWindow marker={this.state.activeMarker}
                            visible={this.state.showingInfoWindow}
                            onClose={this.onClose}>
                    <div>
                        <h4>{this.state.selectedPlace.name}</h4>
                    </div>
                </InfoWindow>

            </Map>
        );
    } //end of render method


} //end of class MapContainer

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBUopytfPOU40AvS9RkEk0SSg1awyNxNqA'
  })(MapContainer);