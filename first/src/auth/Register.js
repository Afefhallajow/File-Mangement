import "./Register.css"
import { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import * as bs from 'bootstrap/dist/css/bootstrap.css';
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
//import Header from "./header";
//import Sidbar from "./sidbar";
//import {BrowserRouter,route} from "react-router-dom";
import { Button, Col,div, Row } from 'react-bootstrap';
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

class Register extends Component {

  test = () => {
    axios.get('http://localhost:8000//kk',{headers:{
      "Content-Type":"application/json",
      "Accept":"*/*",
      "Access-Control-Allow-Origin":"*",  
      "Authorization":"BearereyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZmVmIiwiY3JlYXRlZCI6MTY2OTkzNDczOTg5OCwiZXhwIjoxNjcwNTM5NTM5fQ.chx6CPpn22X6kNx2uArEFMUP8GM3UWmZSK8dKzl_7mBnoqh2iDAU6R2x-w0JHfiNO0cC4c5w35ei8zb0obyzbA"
    },})
  }
    loging = () => {
  
      let JWtRespons={
        "username":this.state.username,
        "email":this.state.email,
        "password":this.state.password
      } 
      
      console.log(this.state.username);
   axios.post('http://localhost:8000//register',JSON.stringify(JWtRespons),{headers:{
      "Content-Type":"application/json",
      "Accept":"*/*",
      "Access-Control-Allow-Origin":"*"  
    },}
).then(res=>{
  console.log(res.data)
  toast.info('Proccess done', {
    position: toast.POSITION.TOP_RIGHT
});

}).catch((reason) => {
  if (reason.response.status === 403) {
      toast.error('you should login first  !', {
          position: toast.POSITION.TOP_RIGHT
      });
      
  }
  toast.error('somethingWrong  !', {
      position: toast.POSITION.TOP_RIGHT
  });
   })


      }

    state={
    username: "",
    password: "",
email:""
  }


    render()
{

return(
<div id="reg" className="col-sm-4 offset-sm-4">
<Row >
    <Col   >  
    <div className="form-outline mb-4">
  <label className="form-label offset-sm-5" htmlFor="form2Example1">User Name</label>

    <input type="text" id="form2Example1" value={this.state.username} onChange={(e)=>this.setState({username:e.target.value})} className="form-control" />
      </div>
      <div className="form-outline mb-4">
  <label className="form-label offset-sm-5" htmlFor="form2Example1">Email</label>

    <input type="text" id="form2Example1" value={this.state.email} onChange={(e)=>this.setState({email:e.target.value})} className="form-control" />
      </div>
 
      <div className="form-outline mb-4">
  <label className="form-label offset-sm-5" htmlFor="form2Example2">Password</label>

    <input type="password" id="form2Example2" value={this.state.password} onChange={(e)=>this.setState({password:e.target.value})} className="form-control" />
  </div>
  <button type="button" onClick={this.loging} className="btn btn-primary btn-block mb-4 offset-sm-5">Register in</button>
  
  </Col>
</Row>
<ToastContainer />
</div>
    )


}




}
export default Register;