import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/auth';
import CircularProgress from '@material-ui/core/CircularProgress';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

/*
    Author: Kanchan Wakchaure
    Date: 10-04-2019
    Description: Header component for homepage
    References: https://material-ui.com
*/

class Header extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          anchorEl: null,
          isLoggedIn: null,
        };
      }

      handleClick = (event) => {
        this.setState({
          anchorEl: event.currentTarget,
        })
      };


      handleClose = () => {
        this.setState({
          anchorEl: null,
        })
      };

      handleLogoutClick = (event) => {
        this.setState({
          isLoggedIn: event.currentTarget,
        })
      };


      handleLogoutClose = () => {
        this.setState({
          isLoggedIn: null,
        })
      };


   render() {
      return (
        <div className="root">
              {
                    this.props.loading ?

                    <CircularProgress color="secondary"
                    style={{
                      align: 'center'}}/>

                    :
          <AppBar position="fixed" style = {{height: '50px', alignContent: 'right'}}>
            <Toolbar style={{height: '20px'}}>
             <Button color="inherit" href="/Homepage">
              <Typography variant="h4" className="title" style={{textTransform: "none"}}>
                Travlendar
              </Typography>
              </Button>
              <IconButton edge="start" className="menuButton" color="inherit" aria-label="menu" href="/Homepage" style={{'marginLeft':'0px'}}>
                        <HomeIcon/>
              </IconButton>
              {
                this.props.isAuthenticated ?
                (
                  <div style={{marginLeft: 'auto'}}>
                    <Button color="inherit" href="/CreateEvent" style={{textTransform: "none", fontSize: '16px'}}>Add Event</Button>
                    <Button color="inherit" href="/listevent" style={{textTransform: "none", fontSize: '16px'}}>Agenda</Button>
                    <Button color="inherit" href="/map" style={{textTransform: "none", fontSize: '16px'}}>View Events</Button>
                    <Button color="inherit" href="/previewroute" style={{textTransform: "none", fontSize: '16px'}}>Preview Route</Button>
                    <Button color="inherit" 
                            style={{textTransform: "none", fontSize: '16px'}}
                            className="menu_button" 
                            aria-controls="simple-menu" 
                            aria-haspopup="true" 
                            onClick={this.handleClick}>
                    Alert
                    </Button>
                    <Menu
                      id="simple-menu"
                      anchorEl={this.state.anchorEl}
                      keepMounted
                      open={Boolean(this.state.anchorEl)}
                      onClose={this.handleClose}
                    >
                    <MenuItem>
                      <Button color="inherit" href="/textalert" style={{textTransform: "none", fontSize: '16px'}}>Send Text Alert</Button>
                    </MenuItem>
                    <MenuItem>
                      <Button color="inherit" href="/emailalert" style={{textTransform: "none", fontSize: '16px'}}>Send Email Alert</Button>
                    </MenuItem>
                    </Menu>
                    <Button color="inherit" href="/about" style={{textTransform: "none", fontSize: '16px'}}>About Us</Button>

                    <Button color="inherit" 
                            style={{textTransform: "none", fontSize: '16px'}}
                            className="menu_button" 
                            aria-controls="simple-menu" 
                            aria-haspopup="true" 
                            onClick={this.handleLogoutClick}>
                    Hi {localStorage.getItem('name')}
                    </Button>
                    <Menu
                      id="simple-menu"
                      anchorEl={this.state.isLoggedIn}
                      keepMounted
                      open={Boolean(this.state.isLoggedIn)}
                      onClose={this.handleLogoutClose}
                    >
                    <MenuItem>
                      <Button color="inherit" onClick={this.props.logout} style={{textTransform: "none", fontSize: '16px'}}>Logout</Button>
                    </MenuItem>
                    </Menu>

                    </div>)
                    :
                    (
                      <div style={{marginLeft: 'auto'}}>
                        <Button color="inherit" href="/about" style={{textTransform: "none", fontSize: '16px'}}>About Us</Button>
                        <Button color="inherit" href="/Login" style={{textTransform: "none", fontSize: '16px'}}>Login</Button>
                        <Button color="inherit" href="/Signup" style={{textTransform: "none", fontSize: '16px'}}>Sign Up</Button>
                      </div>
                    )
                }
            </Toolbar>
          </AppBar>
              }
        </div>
      );
    }
}

const mapStateToProps = (state) => {
  return {
      loading: state.loading,
      error: state.error
  }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout())
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(Header));