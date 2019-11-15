import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class EventsService{

    createEvent(event){
        const url = API_URL+'/api/events/';
        return  axios.post(url,event,{ headers :{"Authorization":"Token "+localStorage.token}})
            .then(response => response.data);
    }

    getEvents() {
        const url = API_URL+'/api/events/';
        return axios.get(url,{ headers :{"Authorization":"Token "+localStorage.token}})
            .then(response => response.data);
    }

    getPreviewEvents() {
        const url = API_URL+'/api/previewevents/';

            var path = []
        return axios.get(url,{ headers :{"Authorization":"Token "+localStorage.token}})
            .then((response) => {
            var items = response.data
            let directionsService = new window.google.maps.DirectionsService();
            for(var i = 0; i<items.length-1; i++) {

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
                            path.push({lat: Number(route.toJSON()["lat"]), lng: Number(route.toJSON()["lng"])})
                        });
                    }
                })

                path.push({lat: Number(items[i]["lat"]), lng: Number(items[i]["long"])})
            }

                //path.push({lat: Number(items[items.length-1]["lat"]), lng: Number(items[items.length-1]["long"])})
            });
            return path
    }

    showHomepage(){
        const url = API_URL;
        return axios.get(url);
    }

}