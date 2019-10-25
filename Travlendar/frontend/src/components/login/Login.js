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
import LoginService from '../../Services/LoginService';
import * as actions from '../../store/actions/auth';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';

const loginService = new LoginService();

class Login extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            userDetails: {
                email: '',
                password: ''
            }
        };

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handlechange = this.handlechange.bind(this);
	}

   handleSubmit(user){
        user.preventDefault();
        this.props.onAuth(this.state.userDetails.email, this.state.userDetails.password);
        this.props.history.push('/Homepage');
    } 

    handlechange(user, inputPropName)
    {
        const newState = Object.assign({}, this.state);
        newState.userDetails[inputPropName] = user.target.value;
        this.setState(newState);
    }

    render(){
        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }

        return(
            <div>
                {errorMessage}
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
                                  style={{backgroundColor: 'white', marginTop: '75px' }} >
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
