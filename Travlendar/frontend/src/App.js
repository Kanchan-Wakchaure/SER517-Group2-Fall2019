import React, {Component}  from 'react';
import { BrowserRouter } from  'react-router-dom'
import { Route, Link } from  'react-router-dom'
import CreateEvent from './components/CreateEvent'
import logo from './logo.svg';
import './App.css';
//import Homepage from './components/homepage';

const BaseLayout=()=>(
	 <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
	  <div  className="content">

        <Route  path="/events/"  component={CreateEvent}  />
        
	  </div>
    </div>

)
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <BaseLayout/>
      </BrowserRouter>
    );
  }
}

export default App;
