/*
    Author: Namratha Olety Venkatesh
    Date: 11-01-2019
    Description: Preview events for Map
    References: https://dev.to/zerquix18/
    let-s-play-with-google-maps-and-react-making-a-car-move-through-the-road-like-on-uber-part-1-4eo0
*/
import React from 'react';
import { withGoogleMap, withScriptjs, GoogleMap, Polyline, Marker, DirectionsRenderer } from 'react-google-maps'
import EventsService from '../../Services/EventsService';
import './MapView.css';
import mapStyles from "./mapStyles/retromapStyles";

const eventService=new EventsService();

class MapPreview extends React.Component {
  state = {
    progress: [],
    directions: [],
    error: "",
    labels:'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  }

  path = []
    events = []
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
callME = () => {
               const waypoints = this.events.map(p => ({
                location: { lat: parseFloat(p.lat), lng: parseFloat(p.long)},
                stopover: true
                }));

                const origin = { lat:33.377210, lng:-111.908560}//waypoints.shift().location;
                //const destination = { lat:33.572400, lng:-112.118540} //waypoints.pop().location;//

                const directionsService = new window.google.maps.DirectionsService();

                directionsService.route(
                {
                    origin: origin,
                    destination: origin,
                    travelMode: window.google.maps.TravelMode.DRIVING,
                    waypoints: waypoints,

                },
                (result, status) => {
                    //console.log("RESULT:"+result)
                    if (status === window.google.maps.DirectionsStatus.OK) {
                        this.setState({directions: result})
                    } else {
                        this.setState({error: result});
                    }
                });
                console.log(this.path)
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
                console.log(distance)
              return { ...coordinates, distance }
            })
}
callMEFirst=(items) => {
let t = this;

  let directionsService = new window.google.maps.DirectionsService();
      for(var i = 0; i<items.length-1; i++) {

        //t.path.push({lat: Number(items[i]["lat"]), lng: Number(items[i]["long"])})
        directionsService.route(
            {
                origin: {lat: Number(items[i]["lat"]), lng: Number(items[i]["long"])},
                destination: {lat: Number(items[i+1]["lat"]), lng: Number(items[i+1]["long"])},
                travelMode: window.google.maps.TravelMode.DRIVING

            },
            (res, status) => {
                if (status === window.google.maps.DirectionsStatus.OK) {
                    //t.path.push(res.routes[0].overview_path)
                    res.routes[0].overview_path.map((route, i) =>  {
                        t.path.push({lat: Number(route.toJSON()["lat"]), lng: Number(route.toJSON()["lng"])})
                        console.log(t.path)
                    });
                }
            })
            t.path.push({lat: Number(items[i]["lat"]), lng: Number(items[i]["long"])})
            t.events.push(items[i])
            }
            t.events.push(items[items.length-1])
            t.path.push({lat: Number(items[items.length-1]["lat"]), lng: Number(items[items.length-1]["long"])})

}
renderData = () => {
let t = this;
let es = []
    //t.path.push({lat: 33.377210,lng: -111.908560})
let items
  eventService.getPreviewEvents().then(function (result) {
        for(var i = 0; i < result.data.length; i++) {
            t.path.push({lat: result.data[i]["lat"], lng: result.data[i]["long"] })
        }

        }).catch((e)=>{
            console.log(e);
          //alert('Create your events for today.');
        }).finally(() => {
            this.callME()
        })
}

  componentWillMount = () => {
  this.renderData();

  }

  render = () => {
  let originMarker = null, markers = null, pinDirections = null;
    let i=0;
    originMarker = (
        <Marker
          defaultLabel="HOME"
          defaultIcon={null}
          position={{
            lat: 33.377210,
            lng: -111.908560
          }}
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
    );
    return (
      <GoogleMap
        defaultZoom={15}
        defaultCenter={{ lat: 33.4255, lng: -111.9400}}
        defaultOptions={{ styles: mapStyles }}
        >


          { this.state.progress && (
            <>
              <Polyline path={this.state.progress} options={{ strokeColor: "#FF0000 "}} />
              <Marker position={this.state.progress[this.state.progress.length - 1]} />
            </>
          )}
          {originMarker}
          {markers}
          {pinDirections}
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