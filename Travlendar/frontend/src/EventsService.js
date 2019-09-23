import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class EventsService{

    createEvent(event){
        const url = API_URL+'/api/events/';
        return axios.post(url,event);
    }

    showHomepage(){
        const url = API_URL;
        return axios.get(url);
    }
}