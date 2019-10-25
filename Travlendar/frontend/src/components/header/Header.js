import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';

/*
    Author: Kanchan Wakchaure
    Date: 10-04-2019
    Description: Header component for homepage
    References: https://material-ui.com
*/

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontSize: 30,
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" style = {{height: '50px'}}>
        <Toolbar style={{height: '20px'}}>
          <Typography variant="h6" className={classes.title}>
            Travlendar
          </Typography>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" href="/Homepage">
            <HomeIcon/>
          </IconButton>
          <Button color="inherit"  href="/CreateEvent">Create Event</Button>
          <Button color="inherit"  href="/listevent">View List</Button>
          <Button color="inherit"  href="/map">View Map</Button>
          <Button color="inherit" href="/login">Login</Button>
          <Button color="inherit" href="/Signup">Sign Up</Button>
          <Button color="inherit" href="/textalert">TextAlert</Button>
          <Button color="inherit" href="/emailalert">EmailAlert</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
