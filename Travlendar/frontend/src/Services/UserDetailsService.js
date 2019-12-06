import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class UserDetailsService{

    getUserDetails() {
    	const url = API_URL+'/api/users/userdetails/';	
        return axios.get(url,{ headers :{"Authorization":"Token "+localStorage.token}}).then(response => response.data);
    }

}
