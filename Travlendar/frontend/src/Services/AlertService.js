import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class Alert{

    getEmail() {
        const url = API_URL+'/api/alert_email/';
        return axios.get(url, { headers :{"Authorization":"Token "+localStorage.token}}).then(response => response.data);
    }

    getText() {
        const url = API_URL+'/api/alert_text/';
        return axios.get(url,{ headers :{"Authorization":"Token "+localStorage.token}}).then(response => response.data);
    }

}