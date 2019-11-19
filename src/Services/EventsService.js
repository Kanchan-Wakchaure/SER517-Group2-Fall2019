import axios from 'axios';
const API_URL = 'https://asutravlendar.herokuapp.com/';

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

    showHomepage(){
        const url = API_URL;
        return axios.get(url);
    }

}