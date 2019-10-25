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

/*
    Author: Kanchan Wakchaure
    Date: 10-04-2019
    Description: Header component for homepage
    References: https://material-ui.com
*/

class Header extends React.Component{
  constructor(props) {
    super(props);
  } 
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
              <Typography variant="h6" className="title">
                Travlendar
              </Typography>
              <span>
              <IconButton edge="start" className="menuButton" color="inherit" aria-label="menu" href="/Homepage">
                <HomeIcon/>
              </IconButton>
                {
                    this.props.isAuthenticated ?
                    (<span>
                      <Button color="inherit" href="/CreateEvent">Create Event</Button>
                      <Button color="inherit" href="/listevent">View Events</Button>                   
                      <Button color="inherit" onClick={this.props.logout}>Logout</Button>
                    </span>)
                    :
                    (
                      <span>
                         <Button color="inherit" href="/Login">Login</Button>
                         <Button color="inherit" href="/Signup">Sign Up</Button>
                      </span>
                    )
                }
    </span>
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