import React from 'react';
import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.css";

import Homepage from './components/homepage';
import CreateEvent from './components/CreateEvent';
import SignUp from './components/signup';
import MAP from './components/map';


import background from './background_image.jpg'


/***const style_background = {

width:'100%',
height:'100%',
position: 'fixed',
backgroundImage: `url(${background})`,
backgroundSize: 'cover'  
};
**/

function App() {
  return (
    //<div  style={style_background} >

    <MAP />
    //</div>
  );
}

export default App;