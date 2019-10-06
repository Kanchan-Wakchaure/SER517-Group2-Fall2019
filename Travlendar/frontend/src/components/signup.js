import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import './signup.css';
import SignupService from '../Services/SignupService';

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
                firstname: '',
                lastname: '',
                phone: '',
                email: '',
                password: ''
            }
        };

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handlechange = this.handlechange.bind(this);
	}

    handleRegister(){
        console.log(this.state.userDetails);
        signupService.signup(
            {
                "firstname": this.state.userDetails.firstname,
                "lastname": this.state.userDetails.lastname,
                "phone": this.state.userDetails.phone,
                "email": this.state.userDetails.email,
                "password": this.state.userDetails.password
            }
        ).then((result)=>{
          alert("You are registered successfully!");
        }).catch(()=>{
          alert('There was an error! Please re-check your form.');
        });

    }

    handleSubmit(user){
        user.preventDefault();
        this.handleRegister();
    }



    handlechange(user, inputPropName)
    {
        const newState = Object.assign({}, this.state);
        newState.userDetails[inputPropName] = user.target.value;
        this.setState(newState);
    }

    render(){

        return(
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className="paper">
                    <form className="form" noValidate>
                        <Grid container spacing={2} style={{backgroundColor: 'white', margin:'-60px'}} >
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
                                           name="firstname"
                                           variant="outlined"
                                           required
                                           fullWidth
                                           id="firstname"
                                           label="First Name"
                                           autoFocus
                                           value={this.state.userDetails.firstname}
                                           onChange = { user => this.handlechange(user, 'firstname') }/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField variant="outlined"
                                           required
                                           fullWidth
                                           id="lastname"
                                           label="Last Name"
                                           name="lastName"
                                           autoComplete="lname"
                                           value={this.state.userDetails.lastname}
                                           onChange = { user => this.handlechange(user, 'lastname') }/>

                            </Grid>
                            <Grid item xs={12}>
                                <TextField variant="outlined"
                                           required
                                           fullWidth
                                           id="phone"
                                           label="Phone Number"
                                           name="phone"
                                           autoComplete="phone"
                                           value={this.state.userDetails.phone}
                                           onChange = { user => this.handlechange(user, 'phone') }/>
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
                                           value={this.state.userDetails.password}
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
                                <Link href="/login" variant="body2">
                                    Already have an account? Sign in
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