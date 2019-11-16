//@author raisa 10-08-19
import  React, { Component } from  'react';
import EventsService from '../../Services/EventsService';
import DeleteService from '../../Services/DeleteService';
import './ListEvent.css';
import Homepage from '../home/Homepage';
import { NotificationManager } from 'react-notifications';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import {FormGroup, Button, TextField, InputAdornment } from '@material-ui/core';

const eventService=new EventsService();
const deleteService=new DeleteService();
class ListEvent extends Component{

    constructor(props) {
        super(props);
        this.state  = {
            events: [],
            show:false,
            showPopup: false,
            event_id:0,
            date:''

        };
        this.handleDelete  =  this.handleDelete.bind(this);
        //this.getEventsBasedOnDate =this.getEventsBasedOnDate.bind(this);

    }



    componentDidMount() {

        var  self  =  this;
        eventService.getEvents(this.state.date).then(function (result) {
            //console.log("status:",result.status)
            self.setState({ events:  result.data})
            self.setState({show:true})
        }).catch(function (error){
            if (error.response){
                if(error.response.status===404){
                    var text="You have no events on selected date to display.";
                    NotificationManager.info(text);
                }

            }

        });


    }


    /*
    getEventsBasedOnDate(){
        console.log("date",this.state.date);
        eventService1.getEvents(this.state.date).then(function (result) {
            console.log("new events:",result.data)
            this.setState({ events:  result.data})
            //this.setState({show:true})
        }).catch(function (error){
            if (error.response){
                if(error.response.status===404){

                    NotificationManager.info("You have no events on today's date to display. Please add some events on today's date.");
                }

            }

        });

    }
    */
    dateChange(event){
        this.setState({date:event.target.value});
    }

    handleDelete(pk){
        var  self  =  this;
        console.log("event id ",pk);
        deleteService.deleteEvents(pk).then(()=>{
            var  newArr  =  self.state.events.filter(ev=>ev.id!==pk);
            console.log("new arr: ",newArr);
            self.setState({events:  newArr});
             if(newArr.length<1)
            {
                window.location.reload();
            }
            //window.location.reload();
        });
        this.togglePopup();
    }

    togglePopup() {
        this.setState({
        showPopup: !this.state.showPopup
        });
    }
    setEventId(id){
        this.setState({event_id:id});
        this.togglePopup();
    }

    render(){
        if(localStorage.getItem('token')==null){
            return <Homepage/>
        }
        else
        {

            if(this.state.show){
                return (
                <div>
                     <div className="container-date-picker">
                        <div className="label-date-picker">Select date:</div>
                        <FormGroup className="form-date-picker">
                            <TextField variant="outlined"
                                   required
                                   type="date"
                                   id="date"
                                   name="date"
                                   value={this.state.date}
                                   InputLabelProps={{ shrink: true }}
                                   className="input-date-picker"
                                   onChange = { e => this.dateChange(e) }/></
                                   FormGroup>
                                   <button className="btn-date-picker" onClick={this.componentDidMount.bind(this)}>Submit</button>
                    </div>
                    <div className="event_list">
                        <ul>
                            <li>
                                <div>Description</div>
                                <div>Time</div>
                                <div>Duration</div>
                                <div>Location</div>
                                <div></div>
                            </li>
                            {this.state.events.map(ev=>

                                <li key={ev.id} >
                                    <div>{ev.title}</div>
                                    <div className="event_list_date">{ev.time}</div>
                                    <div>{ev.duration}</div>
                                    <div>{ev.destination}</div>
                                    <div className="delete-event">
                                    <IconButton aria-label="delete" color="secondary" onClick={this.setEventId.bind(this,ev.id)}>
                                            <DeleteIcon />
                                    </IconButton>

                                    </div>
                                     {this.state.showPopup ?
                                      <Popup
                                        text='Do you want to delete this event?'
                                        deleteEvent={this.handleDelete.bind(this,this.state.event_id) }
                                        closePopup={this.togglePopup.bind(this)}
                                      />
                                      : null
                                    }

                                </li>


                            )}
                        </ul>

                    </div>
                </div>
                );

            }
            else{
                console.log("ELSE");
                return(
                     <div className="container-date-picker">
                        <div className="label-date-picker">Select date:</div>
                        <FormGroup className="form-date-picker">
                            <TextField variant="outlined"
                                   required
                                   type="date"
                                   id="date"
                                   name="date"
                                   value={this.state.date}
                                   InputLabelProps={{ shrink: true }}
                                   className="input-date-picker"
                                   onChange = { e => this.dateChange(e) }/></
                                   FormGroup>
                                   <button className="btn-date-picker" onClick={this.componentDidMount.bind(this)}>Submit</button>
                    </div>




                )

            }

        }   
    }
}

/*
class SelectDate extends React.Component{
  render(){
   return(
      <div className="container-date-picker">
        <div className="label-date-picker">Select date:</div>
            <FormGroup className="form-date-picker">
                <TextField variant="outlined"
                    required
                    type="date"
                    id="date"
                    name="date"
                    value={this.props.dateField}
                    InputLabelProps={{ shrink: true }}
                    className="input-date-picker"
                    onChange = {e=>{this.props.dateChangeMethod}}/></
            FormGroup>
        <button className="btn-date-picker" onClick={this.props.getEventsBasedOnDate}>Submit</button>
       </div>
   )
  }
}
*/
class Popup extends React.Component {
  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <h2 className='popup_header'>{this.props.text}</h2><br/><br/>
        <button onClick={this.props.deleteEvent}>Yes</button>
        <button onClick={this.props.closePopup}>No</button>
        </div>
      </div>
    );
  }
}
export default ListEvent;