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
import { SignupErrors } from './SignupErrors';

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
                first_name: '',
                last_name: '',
                phone_number: '',
                address: '',
                email: '',
                password: '',
                signupErrors: {first_name: '', last_name: '', phone_number: '', address: '', email: '', password: ''},
                emailValid: false,
                passwordValid: false,
                phone_numberValid: false,
                addressValid: false,
                first_nameValid: false,
                last_nameValid: false,
                signupValid: false
        };

		this.handleSubmit = this.handleSubmit.bind(this);
	}

    handleRegister(){
        signupService.signup(
            {
                "first_name": this.state.first_name,
                "last_name": this.state.last_name,
                "phone_number": this.state.phone_number,
                "address": this.state.address,
                "email": this.state.email,
                "password1": this.state.password,
                "password2": this.state.password,
                "username": this.state.email,
            }
        ).then((result)=>{
          NotificationManager.success("You are registered successfully!", "Successful");
        }).catch(()=>{
          NotificationManager.error('There was an error! Please provide a valid email, address, phone number and password.');
        });
    }

    handleSubmit(user){
        user.preventDefault();
        this.handleRegister();
        this.props.history.push('/');
    }

    handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
                  () => { this.validateField(name, value) });
  }

   validateField(fieldName, value) {
    let fieldValidationErrors = this.state.signupErrors;
    let first_nameValid = this.first_nameValid;
    let last_nameValid = this.last_nameValid;
    let phone_numberValid = this.state.phone_numberValid;
    let addressValid = this.state.addressValid;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

    switch(fieldName) {
      case 'first_name':
        first_nameValid = value.match(/^[a-zA-Z '.-]*$/);
        fieldValidationErrors.first_name = first_nameValid ? '': ' is not entered correctly';
        break;
      case 'last_name':
        last_nameValid = value.match(/^[a-zA-Z '.-]*$/);
        fieldValidationErrors.last_name = last_nameValid ? '': ' is not entered correctly';
        break;
      case 'phone_number':
        phone_numberValid = value.match("1?\W*([2-9][0-8][0-9])\W*([2-9][0-9]{2})\W*([0-9]{4})(\se?x?t?(\d*))?");
        fieldValidationErrors.phone_number = phone_numberValid ? '': ' is invalid';
        break;
      case 'address':
	addressValid = value.match(/\b(\d{2,5}\s+)(?![a|p]m\b)(NW|NE|SW|SE|north|south|west|east|n|e|s|w)?([\s|\,|.]+)?(([a-zA-Z|\s+]{1,30}){1,4})/i);
        fieldValidationErrors.address = addressValid ? '': ' should be of format <StreetNumber Direction StreetName, City, State>';
        break;
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid.';
        break;
      case 'password':
        passwordValid = value.match("^(?=.*[!@#\$%\^&\*])(?=.{8,})");
        fieldValidationErrors.password = passwordValid ? '': ' should be atleast 8 characters long and should have one special character.';
        break;
      default:
        break;
    }
    this.setState({signupErrors: fieldValidationErrors,
                    first_nameValid: first_nameValid,
                    last_nameValid: last_nameValid,
                    phone_numberValid: phone_numberValid,
                    addressValid: addressValid,
                    emailValid: emailValid,
                    passwordValid: passwordValid,
                  }, this.validateForm);
  }

  validateForm() {
    this.setState({signupValid: this.state.first_nameValid && this.state.last_nameValid && this.state.phone_numberValid && this.addressValid && this.state.emailValid && this.state.passwordValid});
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

    render(){

        return(
         <div>
             {
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
                                               value={this.state.first_name}
                                               onChange = { this.handleUserInput }/>
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
                                               value={this.state.last_name}
                                               onChange = { this.handleUserInput }/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField variant="outlined"
                                               required
                                               fullWidth
                                               id="phone"
                                               label="Phone Number"
                                               name="phone_number"
                                               autoComplete="phone"
                                               value={this.state.phone_number}
                                               onChange = { this.handleUserInput }/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField variant="outlined"
                                               required
                                               fullWidth
                                               name="address"
                                               label="Address"
                                               id="address"
                                               autoComplete="address"
                                               value={this.state.address}
                                               onChange = { this.handleUserInput }/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField variant="outlined"
                                               required
                                               fullWidth
                                               id="email"
                                               label="Email Address"
                                               name="email"
                                               autoComplete="email"
                                               value={this.state.email}
                                               onChange = { this.handleUserInput }/>
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
                                               value={this.state.password1}
                                               onChange = { this.handleUserInput }/>
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
        }
         <div className="panel panel-default" style={{ fontSize: 15, color: "red" } } align="center">
                                <SignupErrors signupErrors={this.state.signupErrors} />
         </div>
    </div>
        );
    }
}

export default Signup;