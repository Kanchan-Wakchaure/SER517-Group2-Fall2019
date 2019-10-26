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
            events: []
            //nextPageURL:  ''
        };
        //this.nextPage  =  this.nextPage.bind(this);
        //this.handleDelete  =  this.handleDelete.bind(this);
    }
    componentDidMount() {
    //
        var  self  =  this;
        eventService.getEvents().then(function (result) {
            console.log(result);
            self.setState({ events:  result.data})
        }).catch(()=>{
          alert('Some error occurred');
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
                <ul>
                    {this.state.events.map(e=>
                        <li key={e.id}>
                            <div>{e.title}</div>
                            <div className="event_list_date">{e.time}</div>
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