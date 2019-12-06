import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class DeleteService{

    deleteEvents(pk) {
        const url = API_URL+'/api/events/update/'+pk;
        console.log("url:",url);
        return axios.delete(url,{ headers :{"Authorization":"Token "+localStorage.token}});
    }

}