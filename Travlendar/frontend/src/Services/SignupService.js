import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class SignupService{

    signup(user){
        const url = API_URL+'/api/signup/';
        return axios.post(url,user);
    }

}