import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import './Footer.css';

/*
    Author: Kanchan Wakchaure
    Date: 10-04-2019
    Description: Footer component for homepage
    References: https://material-ui.com
*/

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Travlendar
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

class Footer extends React.Component{
    render(){
        return(
            <footer className="footer" style={{backgroundColor: '#3F51B5'}}>
                <Container maxWidth="lg">
                    <Typography variant="h6" align="center" style={{color: '#fafafa'}} gutterBottom>
                        <b>Travlendar</b>
                    </Typography>
                    <Copyright />
                </Container>
            </footer>
        );
    }

}

export default Footer;