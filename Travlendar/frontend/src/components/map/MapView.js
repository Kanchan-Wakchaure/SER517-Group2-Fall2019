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



function Map() {

  const google=window.google;
  const [selectedPark, setSelectedPark] = useState(null);
  const [events, setEvents]=useState([]);
  const [directions, setDirections] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const eventService=new EventsService();
    eventService.getEvents().then(function (result) {
        setEvents(result.data);
        console.log(result);
        }).catch(()=>{
          alert('Some error occurred');
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
    if(events){
      const waypoints = events.map(p => ({
      location: { lat: parseFloat(p.lat), lng: parseFloat(p.long)},
      stopover: true
      }));
      const origin ={ lat:33.424966, lng:-111.880139} //waypoints.shift().location;
      const destination = { lat:33.327726, lng:-111.823020}//waypoints.pop().location;

      const directionsService = new google.maps.DirectionsService();

      directionsService.route(
          {
            origin: origin,
            destination: destination,
            travelMode: google.maps.TravelMode.DRIVING,
            waypoints: waypoints
          },
          (result, status) => {
            //console.log("RESULT:"+result)
            if (status === google.maps.DirectionsStatus.OK) {
              setDirections(result);
            } else {
              setError(result);
            }
          }
      );

    }

  });
   /*
  if (error) {
    return <h1>{error}</h1>;
  } */
  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 33.4255, lng: -111.9400 }}
      defaultOptions={{ styles: mapStyles }}
    >
      {
        directions && (
        <DirectionsRenderer directions={directions} />
        )

      }

      {events.map(park => (
        <Marker
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

const MapWrapped = withScriptjs(withGoogleMap(Map));

export default function MAP() {
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

//directionsService taken from https://github.com/tomchentw/react-google-maps/blob/master/src/components/DirectionsRenderer.md