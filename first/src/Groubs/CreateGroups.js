import "./add.css"
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Col,div, Row } from 'react-bootstrap';
import axios from 'axios'

import { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

let token=localStorage.getItem("token")

class CreateGroups extends Component{
    state={
    group_name:""

    }
    CreatGroup = () => {
        let group_name=this.state.group_name;

        axios.post('http://localhost:8000//group//create',group_name,{headers:{
          "Content-Type":"application/json",
          "Accept":"*/*",
          "Access-Control-Allow-Origin":"*",  
          "Authorization":token
        },}).then((res)=>{
          toast.success(res.data , {
            position: toast.POSITION.TOP_RIGHT
        });
       
          console.log(JSON.stringify( res.data));
       }).catch((reason) => {
        if (reason.response.status === 403) {
            toast.error('you should login first  !', {
                position: toast.POSITION.TOP_RIGHT
            });
            
        }
        toast.error('somethingWrong  !', {
            position: toast.POSITION.TOP_RIGHT
        });})
       
      }
    
    render()

    {

return(
<div id="Add" className="col-sm-4 offset-sm-4">
<br></br>
<Row >
    <Col>      
  <div className="form-outline mb-4">
    <input type="text" id="form2Example1" value={this.state.group_name} onChange={(e)=>this.setState({group_name:e.target.value})} className="form-control" placeholder="Group Name" / >
      </div>
  
  <button type="button" onClick={this.CreatGroup} >Create Group</button>

  </Col>
</Row>
<ToastContainer />
</div>
    )
    
}
}
export default CreateGroups;