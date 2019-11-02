import React, { useState, useEffect } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow,
  DirectionsRenderer,
} from "react-google-maps";
import mapStyles from "./mapStyles/retromapStyles";
import EventsService from '../../Services/EventsService';
import './MapView.css';
import Homepage from '../home/Homepage';

function Map() {
    const [events, setEvents]=useState([]);
    const [directions, setDirections] = useState(null);
    const [selectedPark, setSelectedPark] = useState(null);
    const [error, setError] = useState(null);
    const [no_event_text, setNo_event_text]=useState("");
    const [show, setShow]=useState(false);
    const google=window.google;


    useEffect(() => {
    const eventService=new EventsService();
    eventService.getEvents().then(function (result) {
    setEvents(result.data);
    console.log(result);
    setShow(true);
    //events=result.data;
    }).catch(function (error){
            if (error.response){
                if(error.response.status===404){
                    setNo_event_text("You have no events on today's date to display. Please add some events on today's date.")
                    setShow(false);
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

        const waypoints = events.map(p => ({
        location: { lat: parseFloat(p.lat), lng: parseFloat(p.long)},
        stopover: true
        }));
        console.log("Events",events);

        const origin = { lat:33.377210, lng:-111.908560}//waypoints.shift().location;
        const destination = { lat:33.572400, lng:-112.118540} //waypoints.pop().location;//

        const directionsService = new google.maps.DirectionsService();

        directionsService.route(
        {
            origin: origin,
            destination: origin,
            travelMode: google.maps.TravelMode.DRIVING,
            waypoints: waypoints,

        },
        (result, status) => {
            //console.log("RESULT:"+result)
            if (status === google.maps.DirectionsStatus.OK) {
                setDirections(result);
                console.log("Directions",result)
            } else {
            setError(result);
            }
        });

    },[events])



    if (error) {
    return <h1 class="error">one of the location unreachable</h1>;
    }

    if(show==true){

        return (
            <GoogleMap
                defaultZoom={10}
                defaultCenter={{ lat: 33.4255, lng: -111.9400 }}
                defaultOptions={{ styles: mapStyles }}
            >
            {
                directions && (
                <DirectionsRenderer
                 directions={directions} />
                )

            }

            {events.map(park => (
                <div
                    key={park.id}
                    position={{
                        lat: parseFloat(park.lat),
                        lng: parseFloat(park.long)
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
            );

    }
    else{
        return(
            
             <div>
                <h1 className="no_event">{no_event_text}</h1>
             </div>
        )
    }

}

const MapWrapped = withScriptjs(withGoogleMap(Map));



export default function MAP() {
  if(localStorage.getItem('token')==null){
    return <Homepage/>
  }
  else
  {

        return (
        <div className="map" /*style={{ width: "45vw", height: "90vh" }}*/>
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
}

//directionsService taken from https://github.com/tomchentw/react-google-maps/blob/master/src/components/DirectionsRenderer.md