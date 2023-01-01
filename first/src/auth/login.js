import "./login.css";
import { Component } from "react";
import   {Route,Navigate}   from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import Main_page from "../main_page/main_page"
import 'bootstrap/dist/css/bootstrap.css';
import * as bs from 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
//import Header from "./header";
//import Sidbar from "./sidbar";
//import {BrowserRouter,route} from "react-router-dom";
import { Button, Col,div, Row } from 'react-bootstrap';
import axios from 'axios'
 
class login extends Component {
  test = () => {
    axios.get('http://localhost:8000//kk',{headers:{
      "Content-Type":"application/json",
      "Accept":"*/*",
      "Access-Control-Allow-Origin":"*",  
   //   "Authorization":"BearereyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZmVmIiwiY3JlYXRlZCI6MTY2OTkzNDczOTg5OCwiZXhwIjoxNjcwNTM5NTM5fQ.chx6CPpn22X6kNx2uArEFMUP8GM3UWmZSK8dKzl_7mBnoqh2iDAU6R2x-w0JHfiNO0cC4c5w35ei8zb0obyzbA"
    },})
  }
    loging = () => {
  
      let JWtRespons={
        "username":this.state.username,
        "password":this.state.password
      } 
      
      console.log(this.state.username);
 /*
      axios.post('http://localhost:9999//login',JSON.stringify(JWtRespons),{headers:{
      "Content-Type":"application/json",
      "Accept":"*,
      "Access-Control-Allow-Origin":"*"  
    },}
*/     
 axios.post('http://localhost:8000//login',JSON.stringify(JWtRespons),{headers:{
      "Content-Type":"application/json",
      "Accept":"*/*",
      "Access-Control-Allow-Origin":"*"  
    },}
).then((res)=>{
 
  this.setState({token:res.data.token})  
if(localStorage.getItem('token')!==null)
  {localStorage.removeItem("token")}
localStorage.setItem("token","Bearer"+res.data.token);
  console.log(res.data.token)
  toast.success('Success Notification !', {
    position: toast.POSITION.TOP_RIGHT
});
  console.log(this.state.token)
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
 return( <Navigate to="/affass"  replace={true}  />)

}

    state={
    username: "",
    password: "",
      token:  ""
  }


    render()
{

return(

<div id="loginsss" className="col-sm-4 offset-sm-4">
<br></br><br></br><br></br><br></br>
<Row >
    <Col   >  
    
  <div className="form-outline mb-4">
  <label className="form-label offset-sm-5" htmlFor="form2Example1">User Name</label>

    <input type="text" id="form2Example1" value={this.state.username} onChange={(e)=>this.setState({username:e.target.value})} className="form-control" />
      </div>

  <div className="form-outline mb-4">
  <label className="form-label offset-sm-5" htmlFor="form2Example2">Password</label>

    <input type="password" id="form2Example2" value={this.state.password} onChange={(e)=>this.setState({password:e.target.value})} className="form-control" />
  </div>

  
  <button type="button" onClick={this.loging} className="btn btn-primary btn-block mb-4 offset-sm-5">Sign in</button>
  
  </Col>
</Row>
<ToastContainer />
</div>
    )


}




}
export default login;