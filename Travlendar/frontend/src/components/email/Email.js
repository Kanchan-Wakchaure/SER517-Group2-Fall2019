//@author raisa 10-08-19
import  React, { Component } from  'react';
import Alert from '../../Services/AlertService';
import Homepage from '../home/Homepage';

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
          alert('User is not logged in');
        });
    }

    render(){
        alert('Email is sent to your account successfully') ;
        this.props.history.push('/');
        return <Homepage/>;
    }
}

export default Email;