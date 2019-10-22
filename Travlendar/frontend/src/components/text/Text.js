//@author raisa 10-08-19
import  React, { Component } from  'react';
import Alert from '../../Services/AlertService';

const alertService=new Alert();

class Text extends Component{

    constructor(props) {
        super(props);
        this.state  = {
            events: []
            //nextPageURL:  ''
        };
        //this.nextPage  =  this.nextPage.bind(this);
        //this.handleDelete  =  this.handleDelete.bind(this);
    }
    componentDidMount() {
    //
        var  self  =  this;
        alertService.getText().then(function (result) {
            console.log(result);
            self.setState({ events:  result.data})
        }).catch(()=>{
          alert('User is not logged in');
        });
    }

    render(){
        return(
            <div className="alertStatus">
                
             "Text Alert Activated"
             
            </div>
        )
    }
}

export default Text;