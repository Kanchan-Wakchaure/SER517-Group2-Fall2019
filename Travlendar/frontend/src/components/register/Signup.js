import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import './Signup.css';
import SignupService from '../../Services/SignupService';
import { NotificationManager } from 'react-notifications';

/*
    Author: Kanchan Wakchaure
    Date: 10-01-2019
    Description: Sign up page for new users to register
    References: https://reactstrap.github.io/
*/

const signupService = new SignupService();

class Signup extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            userDetails: {
                first_name: '',
                last_name: '',
                phone_number: '',
                email: '',
                password: ''
            }
        };

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handlechange = this.handlechange.bind(this);
	}

    handleRegister(){
        signupService.signup(
            {
                "first_name": this.state.userDetails.first_name,
                "last_name": this.state.userDetails.last_name,
                "phone_number": this.state.userDetails.phone_number,
                "email": this.state.userDetails.email,
                "password1": this.state.userDetails.password,
                "password2": this.state.userDetails.password,
                "username": this.state.userDetails.email,
            }
        ).then((result)=>{
          NotificationManager.success("You are registered successfully!", "Successful");
        }).catch(()=>{
          NotificationManager.error('There was an error! Please provide valid email, phone and password.');
        });

    }

    handleSubmit(user){
        user.preventDefault();
        this.handleRegister();
        this.props.history.push('/');
    }


    handlechange(event, inputPropName)
    {
        const newState = Object.assign({}, this.state);
        newState.userDetails[inputPropName] = event.target.value;
        this.setState(newState);
    }

    render(){

        return(
                    <Container component="main" maxWidth="xs" className="test">
                    <CssBaseline />
                    <div className="paper">
                        <form className="form" noValidate>
                            <Grid container spacing={2}
                                  alignItems="center"
                                  justify="center"
                                  style={{backgroundColor: 'white', marginTop: '10px' }} >
                                <Grid item xs={12} align="center">
                                    <Avatar className="avatar">
                                        <LockOutlinedIcon />
                                    </Avatar>
                                </Grid>
                                <Grid item xs={12} align="center">
                                    <Typography component="h1" variant="h5" >
                                        Sign up
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField autoComplete="fname"
                                               name="first_name"
                                               variant="outlined"
                                               required
                                               fullWidth
                                               id="firstname"
                                               label="First Name"
                                               autoFocus
                                               value={this.state.userDetails.first_name}
                                               onChange = { event => this.handlechange(event, 'first_name') }/>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField autoComplete="lname"
                                               name="last_name"
                                               variant="outlined"
                                               required
                                               fullWidth
                                               id="lastname"
                                               label="Last Name"
                                               autoFocus
                                               value={this.state.userDetails.last_name}
                                               onChange = { event => this.handlechange(event, 'last_name') }/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField variant="outlined"
                                               required
                                               fullWidth
                                               id="phone"
                                               label="Phone Number"
                                               name="phone_number"
                                               autoComplete="phone"
                                               value={this.state.userDetails.phone_number}
                                               onChange = { user => this.handlechange(user, 'phone_number') }/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField variant="outlined"
                                               required
                                               fullWidth
                                               id="email"
                                               label="Email Address"
                                               name="email"
                                               autoComplete="email"
                                               value={this.state.userDetails.email}
                                               onChange = { user => this.handlechange(user, 'email') }/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField variant="outlined"
                                               required
                                               fullWidth
                                               name="password"
                                               label="Password"
                                               type="password"
                                               id="password"
                                               autoComplete="current-password"
                                               value={this.state.userDetails.password1}
                                               onChange = { user => this.handlechange(user, 'password') }/>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            className="submit"
                                            onClick={this.handleSubmit}>
                                        Sign Up
                                    </Button>
                                </Grid>
    
                                <Grid item align="center">
                                    <Link href="/Login" variant="body2">
                                        Already have an account? Login
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Container>

        );
    }
}

export default Signup;