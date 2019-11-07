/*
    Author: Namratha Olety Venkatesh
    Date: 11-01-2019
    Description: Preview events for Map
    References: https://dev.to/zerquix18/
    let-s-play-with-google-maps-and-react-making-a-car-move-through-the-road-like-on-uber-part-1-4eo0
*/
import React from 'react';
import { withGoogleMap, withScriptjs, GoogleMap, Polyline, Marker } from 'react-google-maps'
import EventsService from '../../Services/EventsService';
import './MapView.css';

const eventService=new EventsService();
class MapPreview extends React.Component {
  state = {
    progress: [],

  }

  path = []

  velocity = 2000
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
  }
renderData = () => {
let t = this;
let es = []
  eventService.getEvents().then(function (result) {
  var items = result.data
  for(var i = 0; i<items.length; i++) {

    t.path.push({lat: Number(items[i]["lat"]), lng: Number(items[i]["long"])})
  }
  console.log(t.path)
}).catch(()=>{
          alert('Some error occurred at 32');
        }).finally(()=>{
        this.path = this.path.map((coordinates, i, array) => {
      if (i === 0) {
        return { ...coordinates, distance: 0 } // it begins here!
      }
      const { lat: lat1, lng: lng1 } = coordinates
      const latLong1 = new window.google.maps.LatLng(lat1, lng1)

      const { lat: lat2, lng: lng2 } = array[0]
      const latLong2 = new window.google.maps.LatLng(lat2, lng2)

      // in meters:
      const distance = window.google.maps.geometry.spherical.computeDistanceBetween(
        latLong1,
        latLong2
      )

      return { ...coordinates, distance }
    })

    console.log(this.path)

        })
}
  componentWillMount = () => {
  this.renderData();
  }

  render = () => {
    return (
      <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: 33.4255, lng: -111.9400 }}
        >
          { this.state.progress && (
            <>
              <Polyline path={this.state.progress} options={{ strokeColor: "#FF0000 "}} />
              <Marker position={this.state.progress[this.state.progress.length - 1]} />
            </>
          )}
      </GoogleMap>
    )
  }
}

const MapComponent = withScriptjs(withGoogleMap(MapPreview))

export default () => (
  <MapComponent
  googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
          process.env.REACT_APP_GOOGLE_KEY
        }`}
  loadingElement={<div style={{ height: `100%` }} />}
  containerElement={<div style={{ height: `400px`, width: '500px' }} />}
  mapElement={<div style={{ height: `100%` }} />}
  />
)
