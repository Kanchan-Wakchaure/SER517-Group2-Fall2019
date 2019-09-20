import React , {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            username: '',
            password: ''
        }
    }
    render() {
        return (
            <div>
        <MuiThemeProvider>
          <div>
          <AppBar
             title="New User"
           />
           <TextField
             hintText="Enter your First Name"
             floatingLabelText="Firstname"
             onChange = {(event,newValue) => this.setState({username:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter your Last Name"
             floatingLabelText="Lastname"
             onChange = {(event,newValue) => this.setState({username:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter your Username"
             floatingLabelText="Username"
             onChange = {(event,newValue) => this.setState({username:newValue})}
             />
           <br/>
             <TextField
               type="password"
               hintText="Enter your Password"
               floatingLabelText="Password"
               onChange = {(event,newValue) => this.setState({password:newValue})}
               />
             <br/>
             <TextField
             hintText="Confirm Password"
             floatingLabelText="Password"
             onChange = {(event,newValue) => this.setState({username:newValue})}
             />
           <br/>
             <RaisedButton label="Sign Up" primary={true} style={style} />
         </div>
         </MuiThemeProvider>
      </div>
            );

        }
}
const style = {
 margin: 15,
};
export default Signup;