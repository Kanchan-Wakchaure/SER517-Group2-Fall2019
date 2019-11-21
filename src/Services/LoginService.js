import axios from 'axios';
const API_URL = 'https://travalendar.herokuapp.com/';

export default class LoginService{

    login(user){
        const url = API_URL+'/api/users/login/';
        return axios.post(url,user);
    }

}
