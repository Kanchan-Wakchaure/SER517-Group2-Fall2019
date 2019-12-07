import React from 'react';
import Container from '@material-ui/core/Container';
import {FormGroup, TextField} from '@material-ui/core';
import Homepage from '../home/Homepage';
import UserDetailsService from '../../Services/UserDetailsService';

const userDetailsService = new UserDetailsService();

class Profile extends React.Component{
  constructor(props) {
    super(props);

  this.state = {
    firstname: '',
    lastname: '',
    phone: '',
    address: '',
    email: ''
  }

  userDetailsService.getUserDetails().then(result => {
    this.setState({
      firstname: result.first_name,
      lastname: result.last_name,
      phone: result.phone_number,
      address: result.address,
      email: result.email
    })
   }).catch(()=> {});
}
    render(){
        if(localStorage.getItem('token')==null){
            return <Homepage/>
        }
        else{           
          return(
                <Container>
                <form style={{backgroundColor: 'white', marginTop: '30px', marginBottom: '0px'}}>
                  <FormGroup>
                    <h2 style={{textAlign: 'center', color: "#3f51b5"}}> <u>View Profile</u ></h2><br/>
                  </FormGroup>
                  <FormGroup>
                    <TextField variant="outlined"
                               required
                               id="firstname"
                               label="First Name"
                               name="firstname"
                               value={this.state.firstname}
                               style={{paddingLeft: '5px',paddingRight:'5px', height:'45px'}}
                    />
                  </FormGroup>
                  <br/> <br/>
                  <FormGroup>
                    <TextField variant="outlined"
                               required
                               id="lastname"
                               label="Last Name"
                               name="lastname"
                               value={this.state.lastname}
                               style={{paddingLeft: '5px',paddingRight:'5px', height:'45px'}}
                      />
                  </FormGroup><br/><br/>
                  <FormGroup>
                    <TextField variant="outlined"
                               required
                               id="phone"
                               label="Phone Number"
                               name="phone"
                               value={this.state.phone}
                               style={{paddingLeft: '5px',paddingRight:'5px', height:'45px'}}
                    />
                  </FormGroup><br/><br/>
                  <FormGroup>
                    <TextField variant="outlined"
                               required
                               id="address"
                               label="Home address"
                               name="address"
                               value={this.state.address}
                               style={{paddingLeft: '5px',paddingRight:'5px', height:'45px'}}
                    /><br/>
                  </FormGroup><br/><br/>
                  <FormGroup>
                    <TextField variant="outlined"
                               required
                               id="email"
                               label="Email"
                               name="email"
                               readOnly="readOnly"
                               value={this.state.email}
                               style={{paddingLeft: '5px',paddingRight:'5px'}}
                    />
                  </FormGroup> <br/>
                <br/><br/><br/>         
                </form>
                </Container>
            );
        }

    }
}

export default Profile;
