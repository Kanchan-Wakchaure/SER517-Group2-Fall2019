import axios from 'axios';

/*
    Author: Kanchan Wakchaure
    Date: 10-05-2019
    Description: Signup service to post user details
    References: https://material-ui.com
*/

const API_URL = 'http://localhost:8000';

export default class SignupService{

    signup(user){
        const url = API_URL+'/api/signup/';
        return axios.post(url,user);
    }

}