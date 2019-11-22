import React, { useState, useEffect } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow,
  DirectionsRenderer,
} from "react-google-maps";
import Button from '@material-ui/core/Button';
import mapStyles from "./mapStyles/retromapStyles";
import EventsService from '../../Services/EventsService';
import './MapView.css';
import Homepage from '../home/Homepage';
import { NotificationManager } from 'react-notifications';
import MapControl from './MapControl';
import VisibilityIcon from '@material-ui/icons/Visibility';
import {FormGroup, TextField } from '@material-ui/core';
import MyLocationIcon from '@material-ui/icons/MyLocation';



const eventService=new EventsService();



function Map() {
    const [events, setEvents]=useState([]);
    const [wayPoints, setWayPoints]=useState([]);
    const [directions, setDirections] = useState(null);
    const [selectedPark, setSelectedPark] = useState(null);
    const [error, setError] = useState(null);
    const [latitude, setLat]=useState(33.327800);
    const [longitude, setLong]=useState(-111.823040);
    var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1;
        var yyyy = today.getFullYear();

        if(dd<10)
        {
            dd='0'+dd;
        }
        if(mm<10)
        {
            mm='0'+mm;
        }
    const [date, setDate]=useState(yyyy+'-'+mm+'-'+dd);
    const google=window.google;
    let labels='ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');


    useEffect(() => {
    if ("geolocation" in navigator) {

      navigator.geolocation.getCurrentPosition(
       function success(position) {
         setLat(position.coords.latitude);
         setLong(position.coords.longitude);
         console.log('latitude', position.coords.latitude,
                     'longitude', position.coords.longitude);
       },
      function error(error_message) {

        console.log('An error has occurred while retrieving location', error_message)
      }
    );
    }
    else {

      console.log('geolocation is not enabled on this browser')
    }
    eventService.getEvents(date).then(function (result) {
    setEvents(result.data);
    }).catch(function (error){
            if (error.response){
                if(error.response.status===404){
                    setEvents([]);

                    NotificationManager.info("You have no events on today's date to display.")

                }
            }
    });

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

    useEffect(()=>{


        console.log("Events",events);
        var Points=events.map(p => ({
        location: { lat: parseFloat(p.lat), lng: parseFloat(p.long)},
        stopover: true
        }));
        const origin = { lat:33.377210, lng:-111.908560}//waypoints.shift().location;
        const destination = { lat:33.377210, lng:-111.908560} //waypoints.pop().location;//
        const directionsService = new google.maps.DirectionsService();

        directionsService.route(
        {
            origin: origin,
            destination: destination,
            travelMode: google.maps.TravelMode.DRIVING,
            waypoints: Points,

        },
        (result, status) => {

            if (status === google.maps.DirectionsStatus.OK) {
                setDirections(result);
                console.log("Directions",result)
            } else {
            setError(result);
            }
        });

    },[events])

    if (error){

        NotificationManager.error("Could not find routes for the events.")
    }


    let originMarker = null;

    let homeIcon=new window.google.maps.MarkerImage(
                'https://image.flaticon.com/icons/svg/25/25694.svg',
                null, /* size is determined at runtime */
                null, /* origin is 0,0 */
                null, /* anchor is bottom center of the scaled image */
                new window.google.maps.Size(32, 32)
            );
    originMarker = (
        <Marker
          //defaultLabel="HOME"
          defaultIcon={homeIcon}
          position={{
            lat: 33.377210,
            lng: -111.908560
          }}
        />
      );
    let currentPos=null;
    let iconMarker = new window.google.maps.MarkerImage(
                'https://image.flaticon.com/icons/svg/1004/1004305.svg',
                null, /* size is determined at runtime */
                null, /* origin is 0,0 */
                null, /* anchor is bottom center of the scaled image */
                new window.google.maps.Size(32, 32)
            );
    currentPos=(
        <Marker
          //defaultLabel="My Location"
          defaultIcon={iconMarker}
          position={{
            lat: latitude,
            lng: longitude
          }}
           onClick={() => {

            }}
        />
    );
        return (


            <div id="google-map">
            <GoogleMap
                defaultZoom={10}
                defaultCenter={{ lat: 33.4255, lng: -111.9400 }}
                defaultOptions={{ styles: mapStyles }}

            >

            <MapControl position={google.maps.ControlPosition.TOP_RIGHT}>
            <div className="container-date-picker map-events">
                        <FormGroup className="form-date-picker">
                            <TextField variant="outlined"
                                   required
                                   type="date"
                                   id="date"
                                   name="date"
                                   value={date}
                                   InputLabelProps={{ shrink: true }}
                                   className="input-date-picker"
                                   onChange = { e =>  setDate(e.target.value) }/></
                                   FormGroup>
                                   <button className="btn-date-picker" onClick={e=>{eventService.getEvents(date).then(function (result) {
                                        setEvents(result.data);
                                        console.log(result);

                                        }).catch(function (error){
                                                if (error.response){
                                                    if(error.response.status===404){

                                                        setEvents([]);
                                                        NotificationManager.info("You have no events on selected date to display.")

                                                    }
                                                }
                                        })
                                        }}>Submit
                                    </button>
             </div>
            <Button id="btn-preview" color="inherit" href="/previewroute"><VisibilityIcon/> &nbsp;PREVIEW</Button>

            </MapControl>
            {originMarker}

            {currentPos}

            {
                directions && (
                <DirectionsRenderer

                 directions={directions}
                 options={{
                 /*
                    polylineOptions: {
                    storkeColor: "#2249a3",
                    strokeOpacity: 0.4,
                    strokeWeight: 4
                    },
                    preserveViewport: true,
                    */
                    suppressMarkers: true,


                  }}

                 />
                )

            }

            {
            events.map((park,i) => (
                <Marker
                    key={park.id}
                    defaultLabel={labels[i]}
                    position={{
                        lat: parseFloat(park.lat),
                        lng: parseFloat(park.long)
                    }}
                    onClick={() => {
                        setSelectedPark(park);
                    }}

                />
            )
            )}

            {selectedPark && (
                <InfoWindow
                onCloseClick={() => {
                setSelectedPark(null);
            }}

            position={{
                lat: parseFloat(selectedPark.lat),
                lng: parseFloat(selectedPark.long)
            }}
            >
            <div>
                <h2>{selectedPark.title}</h2>
                <p>{selectedPark.destination}</p>
                <p>{selectedPark.title}</p>
                <p>{selectedPark.time}</p>
            </div>
                </InfoWindow>
            )}
                </GoogleMap>
            </div>

            );




}

const MapWrapped = withScriptjs(withGoogleMap(Map));



export default function MAP() {
  if(localStorage.getItem('token')==null){
    return <Homepage/>
  }
  else
  {
        return (

        <div className="map">
          <MapWrapped
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
              process.env.REACT_APP_GOOGLE_KEY
            }`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%`}} />}
            mapElement={<div style={{ height: `100%`}} />}
          />
        </div>

        );


  }
}



//directionsService taken from https://github.com/tomchentw/react-google-maps/blob/master/src/components/DirectionsRenderer.md