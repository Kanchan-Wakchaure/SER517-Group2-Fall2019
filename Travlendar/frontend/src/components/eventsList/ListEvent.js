//@author raisa 10-08-19
import  React, { Component } from  'react';
import EventsService from '../../Services/EventsService';
import DeleteService from '../../Services/DeleteService';
import './ListEvent.css';
import Homepage from '../home/Homepage';
import { NotificationManager } from 'react-notifications';

const eventService=new EventsService();
const deleteService=new DeleteService();
class ListEvent extends Component{

    constructor(props) {
        super(props);
        this.state  = {
            events: [],
            show:false

        };
        this.handleDelete  =  this.handleDelete.bind(this);

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
                    self.setState({show:false})
                    NotificationManager.info("You have no events on today's date to display. Please add some events on today's date.");
                }

            }

        });

    }

    handleDelete(e,pk){
        var  self  =  this;
        deleteService.deleteEvents(pk).then(()=>{
            var  newArr  =  self.state.events.filter(function(obj) {
                return  obj.pk  !==  pk;
            });
            self.setState({events:  newArr})
            window.location.reload();
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
                        {this.state.events.map(ev=>

                            <li key={ev.id} >
                                <div>{ev.title}</div>
                                <div className="event_list_date">{ev.time}</div>
                                <div>{ev.duration}</div>
                                <div>{ev.destination}</div>
                                <button onClick={(e)=>  this.handleDelete(e,ev.id) }>-</button>

                            </li>


                        )}
                    </ul>
                </div>
                );

            }
            else{

                return(
                    <div>
                    </div>

                )

            }

        }   
    }
}

export default ListEvent;