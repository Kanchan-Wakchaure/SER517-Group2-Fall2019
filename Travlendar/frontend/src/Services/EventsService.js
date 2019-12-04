import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class EventsService{

    createEvent(event){
        const url = API_URL+'/api/events/';
        return  axios.post(url,event,{ headers :{"Authorization":"Token "+localStorage.token}})
            .then(response => response.data);
    }

    getEvents(dt) {
        const url = API_URL+'/api/events/';
        return axios.get(url,{ headers :{"Authorization":"Token "+localStorage.token},
                params: {date: dt}})
            .then(response => response.data);
    }

    getHomeAddress() {
        const url = API_URL+'/api/events/address/';
        return axios.get(url,{headers :{"Authorization":"Token "+localStorage.token}})
            .then(response => response.data);
    }

    getPreviewEvents() {
        const url = API_URL+'/api/previewevents/';
        let path = []
        axios.get(url,{ headers :{"Authorization":"Token "+localStorage.token}})
            .then((response) => {
            var items = response.data;
            const waypoints = items["data"].map(p => ({
                location: { lat: parseFloat(p.lat), lng: parseFloat(p.long)},
                stopover: true
                }));
            let directionsService = new window.google.maps.DirectionsService();
            directionsService.route(
            {
                origin: {lat: Number(items["data"][0]["lat"]), lng: Number(items["data"][0]["long"])},
                destination: {lat: Number(items["data"][items["data"].length-1]["lat"]), lng: Number(items["data"][items["data"].length-1]["long"])},
                travelMode: window.google.maps.TravelMode.DRIVING,
                waypoints: waypoints

            },
            (res, status) => {
                if (status === window.google.maps.DirectionsStatus.OK) {
                    let temp = res.routes[0].overview_path[0].toJSON()
                    let distance = 0
                    res.routes[0].overview_path.forEach((route, i) =>  {
                        let lat1 = Number(route.toJSON()["lat"])
                        let lng1 = Number(route.toJSON()["lng"])
                        let latLong1 = new window.google.maps.LatLng(lat1, lng1)

                        let { lat: lat2, lng: lng2 } = temp
                        let latLong2 = new window.google.maps.LatLng(lat2, lng2)

                        let m = [latLong1, latLong2]
                        distance += window.google.maps.geometry.spherical.computeLength(m)
                        path.push({lat: lat1, lng: lng1, distance: distance})
                        temp = route.toJSON()
                    });
                }
            })
       })
       return path;
    }

    showHomepage(){
        const url = API_URL;
        return axios.get(url);
    }
    getUserHome() {
         const url = API_URL+'/api/userhome/';
        axios.get(url,{ headers :{"Authorization":"Token "+localStorage.token}})
            .then((response) => {
        //return {"lat": 33.377210, "long":  -111.908560};
        return response.data;
    });
    }
}