/*
    Author: Namratha Olety Venkatesh
    Date: 11-01-2019
    Description: Preview events for Map
    References: https://dev.to/zerquix18/
    let-s-play-with-google-maps-and-react-making-a-car-move-through-the-road-like-on-uber-part-1-4eo0
    let-s-play-with-google-maps-and-react-making-a-car-move-through-the-road-like-on-uber-part-2-295e
    "http://cliparts.co/cliparts/kiK/nqo/kiKnqoaRT.svg"
*/
import React from 'react';
import { withGoogleMap, withScriptjs, GoogleMap, Polyline, Marker, DirectionsRenderer } from 'react-google-maps'
import EventsService from '../../Services/EventsService';
import './MapView.css';
import mapStyles from "./mapStyles/retromapStyles";
import { NotificationManager } from 'react-notifications';

const eventService=new EventsService();

class MapPreview extends React.Component {
  state = {
    progress: [],
    directions: [],
    error: "",
    labels:'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
    latitude: 33.327800,
    longitude: -111.823040
  }
  home = []
  path = []
  events = []
  velocity = 200
  initialDate = new Date()

  getDistance = () => {
    // seconds between when the component loaded and now
    const differentInTime = (new Date() - this.initialDate) / 1000 // pass to seconds
    return differentInTime * this.velocity // d = v*t -- thanks Newton!
  }

  componentDidMount = () => {
    this.interval = window.setInterval(this.moveObject, 1000)
  }

  componentWillUnmount = () => {
    window.clearInterval(this.interval)
  }

  moveObject = () => {
    const distance = this.getDistance()
    if (! distance) {
      return
    }
    let progress = this.path.filter(coordinates => coordinates.distance < distance)

    const nextLine = this.path.find(coordinates => coordinates.distance > distance)

    if (! nextLine) {
      this.setState({ progress })
      return // it's the end!
    }
    const lastLine = progress[progress.length - 1]

    const lastLineLatLng = new window.google.maps.LatLng(
      lastLine.lat,
      lastLine.lng
    )

    const nextLineLatLng = new window.google.maps.LatLng(
      nextLine.lat,
      nextLine.lng
    )

    // distance of this line
    const totalDistance = nextLine.distance - lastLine.distance
    const percentage = (distance - lastLine.distance) / totalDistance

    const position = window.google.maps.geometry.spherical.interpolate(
      lastLineLatLng,
      nextLineLatLng,
      percentage
    )

    progress = progress.concat(position)
    this.setState({ progress })

    const angle = window.google.maps.geometry.spherical.computeHeading(lastLineLatLng, nextLineLatLng)
    const actualAngle = angle - 90

    const markerUrl = 'http://cliparts.co/cliparts/kiK/nqo/kiKnqoaRT.svg'
    const marker = document.querySelector(`[src="${markerUrl}"]`)

    if (marker) { // when it hasn't loaded, it's null
      marker.style.transform = `rotate(${actualAngle}deg)`
    }
  }

renderData = () => {
let t = this;
t.path = eventService.getPreviewEvents()
eventService.getUserAddress().then(function(result) {
  t.home = result
  }).catch(function(error) {
  NotificationManager.error("Error displaying home address")
  })
if ("geolocation" in navigator) {

      navigator.geolocation.getCurrentPosition(
       function success(position) {
         t.setState({"latitude":position.coords.latitude});
         t.setState({"longitude": position.coords.longitude});
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
eventService.getEvents().then(function(result) {
    t.events = result.data

}).catch(function(error) {
    if (error.response){
            if(error.response.status===404){
                NotificationManager.info("You have no events on today's date to display. Please add some events on today's date.")
            }
    }
})
}

  UNSAFE_componentWillMount = () => {
  this.renderData();

  }
  render = () => {
    const icon = {
      url:
        "http://cliparts.co/cliparts/kiK/nqo/kiKnqoaRT.svg",
      scaledSize: new window.google.maps.Size(37, 37),
      anchor: { x: 10, y: 15 }
    };
let homeIcon=new window.google.maps.MarkerImage(
                'https://image.flaticon.com/icons/svg/25/25694.svg',
                null, /* size is determined at runtime */
                null, /* origin is 0,0 */
                null, /* anchor is bottom center of the scaled image */
                new window.google.maps.Size(32, 32)
            );
  let originMarker = null, markers = null, pinDirections = null;
    originMarker = (
        <Marker
          defaultIcon={homeIcon}
          position={{
          lat: this.home.lat,
          lng: this.home.long}}
        />
      );
     markers = (
            this.events.map((park,i) => (
                <Marker
                    key={park.id}
                    defaultLabel={this.state.labels[i]}
                    defaultIcon={null}
                    position={{
                        lat: parseFloat(park.lat),
                        lng: parseFloat(park.long)
                    }}

                />
            )
            ));
    pinDirections = (
                this.state.directions && (
                <DirectionsRenderer
                 directions={this.state.directions}
                 options={{
                    suppressMarkers: true,
                  }}

                 />
                )
    );
    let iconMarker = new window.google.maps.MarkerImage(
                'https://image.flaticon.com/icons/svg/1004/1004305.svg',
                null, /* size is determined at runtime */
                null, /* origin is 0,0 */
                null, /* anchor is bottom center of the scaled image */
                new window.google.maps.Size(32, 32)
            );
    let currentPos=(
        <Marker
          //defaultLabel="My Location"
          defaultIcon={iconMarker}
          position={{
            lat: this.state.latitude,
            lng: this.state.longitude
          }}
           onClick={() => {

            }}
        />
    );
    return (
      <GoogleMap
        defaultZoom={14}
        //center={{ lat: this.home.lat, lng: this.home.long}}
        center={this.state.progress[this.state.progress.length - 1]}
        defaultCenter={{lat: this.home.lat, lng: this.home.long}}
        defaultOptions={{ styles: mapStyles }}
        >


          { this.state.progress && (
            <>
              <Polyline path={this.state.progress} options={{ strokeColor: "#1a1aff "}} />
              <Marker icon = {icon}
              position={this.state.progress[this.state.progress.length - 1]} />
            </>
          )}
          {originMarker}
          {markers}
          {pinDirections}
          {currentPos}
      </GoogleMap>
    )
  }
}

const MapComponent = withScriptjs(withGoogleMap(MapPreview))

export default () => (
<div className="map">
  <MapComponent
  googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
          process.env.REACT_APP_GOOGLE_KEY
        }`}
  loadingElement={<div style={{ height: `100%` }} />}
  containerElement={<div style={{ height: `100%` }} />}
  mapElement={<div style={{ height: `100%` }} />}
  />
  </div>
)