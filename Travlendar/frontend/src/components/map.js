import React, { useState, useEffect } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import * as parkData from "../data/tempe-schedule.json";
import mapStyles from "../mapStyles/retromapStyles";
import Geocode from "react-geocode";
function Map() {
  const [selectedPark, setSelectedPark] = useState(null);
  this.state = {
      address: '',
      city: '',
      area: '',
      state: '',
      mapPosition: {
          lat: this.props.center.lat,
          lng: this.props.center.lng
      },
      markerPosition: {
          lat: this.props.center.lat,
          lng: this.props.center.lng
      }
  }
  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedPark(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);
  componentDidMount() {
  Geocode.fromLatLng( this.state.mapPosition.lat , this.state.mapPosition.lng ).then(
   response => {
    const address = response.results[0].formatted_address,
     addressArray =  response.results[0].address_components,
     city = this.getCity( addressArray ),
     area = this.getArea( addressArray ),
     state = this.getState( addressArray );

    console.log( 'city', city, area, state );

    this.setState( {
     address: ( address ) ? address : '',
     area: ( area ) ? area : '',
     city: ( city ) ? city : '',
     state: ( state ) ? state : '',
    } )
   },
   error => {
    console.error(error);
   }
  );
 };
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
 onMarkerDragEnd = ( event ) => {
  console.log( 'event', event );
  let newLat = event.latLng.lat(),
   newLng = event.latLng.lng(),
   addressArray = [];
    Geocode.fromLatLng( newLat , newLng ).then(
    response => {
    const address = response.results[0].formatted_address,
        addressArray =  response.results[0].address_components,
        city = this.getCity( addressArray ),
        area = this.getArea( addressArray ),
        state = this.getState( addressArray );
    this.setState( {
        address: ( address ) ? address : '',
        area: ( area ) ? area : '',
        city: ( city ) ? city : '',
        state: ( state ) ? state : ''
    } )
   },
   error => {
    console.error(error);
   }
  );
 };
  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 33.4255, lng: -111.9400 }}
      defaultOptions={{ styles: mapStyles }}
    >
    <Marker
          key={24}
          name="My Marker"
          color="blue"
          position={{ lat: 33.6255, lng: -111.9409 }}
          draggable={true}
          onClick={() => {
            alert("Prev position "+lat+ lng);
          }}
        />
      {parkData.features.map(park => (
        <Marker
          key={park.properties.PARK_ID}
          position={{
            lat: park.geometry.coordinates[0],
            lng: park.geometry.coordinates[1]
          }}
          onClick={() => {
            setSelectedPark(park);
          }}
        />
      ))}

      {selectedPark && (
        <InfoWindow
          onCloseClick={() => {
            setSelectedPark(null);
          }}
          position={{
            lat: selectedPark.geometry.coordinates[0],
            lng: selectedPark.geometry.coordinates[1]
          }}
        >
          <div>
            <h2>{selectedPark.properties.NAME}</h2>
            <p>{selectedPark.properties.ADDRESS}</p>
            <p>{selectedPark.properties.DESCRIPTION}</p>
            <p>{selectedPark.properties.TIME}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

export default function MAP() {
  return (
    <div style={{ width: "45vw", height: "90vh" }}>
      <MapWrapped
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
          process.env.REACT_APP_GOOGLE_KEY
        }`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}