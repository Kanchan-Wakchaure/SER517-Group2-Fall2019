//@author raisa 10-08-19
import  React, { Component } from  'react';
import Alert from '../../Services/AlertService';
import Homepage from '../home/Homepage';
import { NotificationManager } from 'react-notifications';

const alertService=new Alert();

class Email extends Component{

    constructor(props) {
        super(props);
        this.state  = {
            events: []
            //nextPageURL:  ''
        };
        //this.nextPage  =  this.nextPage.bind(this);
        //this.handleDelete  =  this.handleDelete.bind(this);
    }
    componentDidMount() {
    //
        var  self  =  this;
        alertService.getEmail().then(function (result) {
            console.log(result);
            self.setState({ events:  result.data})
        }).catch(()=>{
          NotificationManager.error("Unable to send email notifications at the moment.", "Error");
        });
    }

    render(){
        NotificationManager.success('Email is sent to your account successfully', "Successful") ;
        this.props.history.push('/');
        return <Homepage/>;
    }
}

export default Email;