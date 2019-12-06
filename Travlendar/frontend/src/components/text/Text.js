//@author raisa 10-08-19
import  React, { Component } from  'react';
import Alert from '../../Services/AlertService';
import Homepage from '../home/Homepage';
import { NotificationManager } from 'react-notifications';

const alertService=new Alert();

class Text extends Component{

    constructor(props) {
        super(props);
        this.state  = {
            events: []
        };
    }
    componentDidMount() {
        var  self  =  this;
        alertService.getText().then(function (result) {
            console.log(result);
            self.setState({ events:  result.data})
        }).catch(()=>{
          NotificationManager.error("Unable to send text notifications at the moment.", "Error");
        });
    }

    render(){
            NotificationManager.success('A text message is sent to you phone number') ;
            this.props.history.push('/');
            return <Homepage/>;
    }
}

export default Text;