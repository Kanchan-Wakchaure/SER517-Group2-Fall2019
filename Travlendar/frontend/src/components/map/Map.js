import React, { useState, useEffect } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import * as parkData from "./data/tempe-schedule.json";
import mapStyles from "./mapStyles/retromapStyles";
import EventsService from '../../Services/EventsService';



function Map() {

  const [selectedPark, setSelectedPark] = useState(null);
  const [events, setEvents]=useState([]);
   /*
  constructor(props){
    super(props);
    this.state={
        events:[]
    };

  }

  componentDidMount() {
        var  self  =  this;
        eventService.getEvents().then(function (result) {
            console.log(result);
            self.setState({ events:  result.data})
        }).catch(()=>{
          alert('User is not logged in');
        });
    }

    */

  useEffect(() => {
    const eventService=new EventsService();
    eventService.getEvents().then(function (result) {
        setEvents(result.data);
        console.log(result);
        }).catch(()=>{
          alert('User is not logged in');
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

  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 33.4255, lng: -111.9400 }}
      defaultOptions={{ styles: mapStyles }}
    >
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