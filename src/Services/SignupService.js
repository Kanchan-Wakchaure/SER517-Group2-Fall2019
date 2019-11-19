import axios from 'axios';

/*
    Author: Kanchan Wakchaure
    Date: 10-05-2019
    Description: Signup service to post user details
    References: https://material-ui.com
*/

const API_URL = 'https://asutravlendar.herokuapp.com/';

export default class SignupService{

    signup(user){
        const url = API_URL+'/api/users/signup/';
        return axios.post(url,user);
    }

}