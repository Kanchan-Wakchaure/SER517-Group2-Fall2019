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
            show:false

        };

    }
    componentDidMount() {
    //
        var  self  =  this;
        eventService.getEvents().then(function (result) {
            //console.log("status:",result.status)
            self.setState({ events:  result.data})
            self.setState({show:true})

        }).catch(function (error){
            if (error.response){
                if(error.response.status===404){
                    self.setState({no_event_text:"You have no events on today's date to display. Please add some events on today's date."})
                    self.setState({show:false})

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

            if(this.state.show){

                return (
                <div className="event_list">
                    <ul>
                        <li>
                            <div>Description</div>
                            <div>Time</div>
                            <div>Duration</div>
                            <div>Location</div>
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
            else{

                return(
                    <div>
                        <h1 className="no_event">{this.state.no_event_text}</h1>
                    </div>

                )

            }

        }   
    }
}

export default ListEvent;