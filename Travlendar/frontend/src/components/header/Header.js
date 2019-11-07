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
    Author: Kanchan Wakchaure,Vijaya Mounika Gadde
    Date: 10-04-2019
    Description: Header component for homepage
    References: https://material-ui.com
*/

class Header extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          anchorEl: null
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
   render() {
      return (
        <div className="root">
              {
                    this.props.loading ?

                    <CircularProgress color="secondary"
                    style={{
                      align: 'center'}}/>

                    :
          <AppBar position="fixed" style = {{height: '50px'}}>
            <Toolbar style={{height: '20px'}}>
             <Button color="inherit" href="/Homepage">
              <Typography variant="h6" className="title">
                Travlendar
              </Typography>
              </Button>
              <IconButton edge="start" className="menuButton" color="inherit" aria-label="menu" href="/Homepage">
                <HomeIcon/>
              </IconButton>

                {
                    this.props.isAuthenticated ?
                    (<span>
                     <Button color="inherit" className="menu_button" aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}>
                      Event
                     </Button>
                     <Menu
                      id="simple-menu"
                      anchorEl={this.state.anchorEl}
                      keepMounted
                      open={Boolean(this.state.anchorEl)}
                      onClose={this.handleClose}
                      >
                     <MenuItem>
                      <Button color="inherit" href="/CreateEvent">Add Event</Button>
                     </MenuItem>
                     <MenuItem>
                      <Button color="inherit" href="/listevent">Agenda</Button>
                     </MenuItem>
                     <MenuItem>
                      <Button color="inherit"  href="/map">View Events</Button>
                     </MenuItem>
                     </Menu>
                      <Button color="inherit" className="menu_button" aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}>
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
                        <Button color="inherit" href="/textalert">Send Text Alert</Button>
                      </MenuItem>
                      <MenuItem>
                        <Button color="inherit" href="/emailalert">Send Email Alert</Button>
                      </MenuItem>
                      </Menu>
                      <Button color="inherit" href="/about">About Us</Button>
                      <Button color="inherit" onClick={this.props.logout}>Logout</Button>
                    </span>)
                    :
                    (
                      <span>
                         <Button color="inherit" href="/Login">Login</Button>
                         <Button color="inherit" href="/Signup">Sign Up</Button>
                         <Button color="inherit" href="/about">About Us</Button>
                      </span>
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