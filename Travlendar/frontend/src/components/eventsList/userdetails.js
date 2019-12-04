//@author raisa 10-08-19
import  React, { Component } from  'react';
import EventsService from '../../Services/EventsService';
import DeleteService from '../../Services/DeleteService';
import './ListEvent.css';
import Homepage from '../home/Homepage';
import { NotificationManager } from 'react-notifications';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import {FormGroup, TextField } from '@material-ui/core';

const eventService=new EventsService();
class UserDetails extends Component{
    constructor(props) {
        super(props);
        this.state  = {
            userdetails: []


        };
    }
    componentDidMount() {
        var  self  =  this;
        eventService.getUserDetails().then(function (result) {
            self.setState({ userdetails:  result})

        }).catch(function (error){
            if (error.response){

              NotificationManager.info("Error in user details");


            }

        });

    }
    render(){
        if(localStorage.getItem('token')==null){
            return <Homepage/>
        }
        else{
        return(
            //<div>
            //{this.state.userdetails.map(ev=>
                <>
                    <div>{this.state.userdetails.username}</div>
                    <div>{this.state.userdetails.first_name}</div>
                    <div>{this.state.userdetails.last_name}</div>
                    <div>{this.state.userdetails.phone_number}</div>
                    <div>{this.state.userdetails.address}</div>
               </>
             // )}
            //</div>
        )

        }

    }

}

export default UserDetails;