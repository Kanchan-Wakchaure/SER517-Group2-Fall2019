import React from 'react';
import './CreateEvent.css';
import Map from '../map/Map.js';

/*
    Author: Kanchan Wakchaure
    Date: 11-05-2019
    Description: Create event page to schedule events
*/

class CreateEvent extends React.Component {
    render(){
        return(
            <div style={{ marginTop: '-10px' }} >
                <Map
                    google={this.props.google}
                    center={{lat: 33.424564, lng: -111.928001}}
                    height='300px'
                    zoom={15}
                />
            </div>
        )
    }
}
export default CreateEvent;