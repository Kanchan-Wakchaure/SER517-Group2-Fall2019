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
import './Login.css';
import * as actions from '../../store/actions/auth';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { LoginErrors } from './LoginErrors';

class Login extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            loginErrors: {email: '', password: ''},
            emailValid: false,
            passwordValid: false,
            loginValid: false
        };
		this.handleSubmit = this.handleSubmit.bind(this);
	}

   handleSubmit(user){
        user.preventDefault();
        this.props.onAuth(this.state.email, this.state.password);
        this.props.history.push('/Homepage');
    }

   handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
                  () => { this.validateField(name, value) });
  }

   validateField(fieldName, value) {
    let fieldValidationErrors = this.state.loginErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

    switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 8;
        fieldValidationErrors.password = passwordValid ? '': ' is invalid.It should be atleast 8 characters long.';
        break;
      default:
        break;
    }
    this.setState({loginErrors: fieldValidationErrors,
                    emailValid: emailValid,
                    passwordValid: passwordValid
                  }, this.validateForm);
  }

  validateForm() {
    this.setState({loginValid: this.state.emailValid && this.state.passwordValid});
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

    render(){
        return(
            <div>
                {
                    this.props.loading ?

                    <CircularProgress color="secondary" style={{align: 'center'}}/>
                    
                    :

                    <Container component="main" maxWidth="xs" className="test">
                    <CssBaseline />
                    <div className="paper">
                        <form className="form">
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
                                        Login
                                    </Typography>
                                </Grid>
                                <div className="panel panel-default">
                                <LoginErrors loginErrors={this.state.loginErrors} />
                                </div>
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
                                        Login
                                    </Button>
                                </Grid>
    
                                <Grid item align="center">
                                    <Link href="/signup" variant="body2">
                                        Not Registered yet? Sign up
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Container>

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
        onAuth: (username, password) => dispatch(actions.authLogin(username, password)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
