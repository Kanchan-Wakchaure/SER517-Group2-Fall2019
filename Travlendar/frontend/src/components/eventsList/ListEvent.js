//@author raisa 10-08-19
import  React, { Component } from  'react';
import EventsService from '../../Services/EventsService';
import './ListEvent.css';
import Homepage from '../home/Homepage';

const eventService=new EventsService();

class ListEvent extends Component{

    constructor(props) {
        super(props);
        this.state  = {
            events: [],
            no_event_text:" ",
            description:" ",
            time:" ",
            duration:" ",
            location:" "

        };
        //this.nextPage  =  this.nextPage.bind(this);
        //this.handleDelete  =  this.handleDelete.bind(this);
    }
    componentDidMount() {
    //
        var  self  =  this;
        eventService.getEvents().then(function (result) {
            //console.log("status:",result.status)
            self.setState({ events:  result.data})
            self.setState({ description:"Event Description"})
            self.setState({ time:"Time"})
            self.setState({ duration:"Duration"})
            self.setState({ location:"Location"})

        }).catch(function (error){
            if (error.response){
                if(error.response.status===404){
                    self.setState({no_event_text:"You have no events on current date to display."})
                    self.setState({ description:""})
                    self.setState({ time:""})
                    self.setState({ duration:""})
                    self.setState({ location:""})

                }

            }

        });

    }

    render(){
        if(localStorage.getItem('token')==null){
            return <Homepage/>
        }
        else
        {
            return (
                <div className="event_list">
                <div><h1 className="no_event">{this.state.no_event_text}</h1></div>
                <ul>
                    <li>
                        <div>{this.state.description}</div>
                        <div>{this.state.time}</div>
                        <div>{this.state.duration}</div>
                        <div>{this.state.location}</div>
                    </li>
                    {this.state.events.map(e=>
                        <li key={e.id} >
                            <div>{e.title}</div>
                            <div className="event_list_date">{e.time}</div>
                            <div>{e.duration}</div>
                            <div>{e.destination}</div>
                        </li>
                    )}
                </ul>
                </div>
            );
        }   
    }
}

export default ListEvent;