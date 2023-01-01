import "./add.css";
import { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
//import Button from "@restart/ui/esm/Button";
import { Button, Col,div, Row } from 'react-bootstrap'
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

let token=localStorage.getItem("token")


class AddUserToGroup extends Component
{state={
    users:[],
    groups:[]
}
GetUsers = () => {
    axios.get('http://localhost:8000//group//find',{headers:{
      "Content-Type":"application/json",
      "Authorization":token
    },}).then((res)=>{

             console.log(JSON.stringify( res.data));
this.setState( {  users:res.data});
console.log(this.state.users)
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

GetGroups=()=>{
    axios.get('http://localhost:8000//group//findbyuser',{headers:{
        "Content-Type":"application/json",
        "Authorization":token
      },}).then((res)=>{
    console.log(JSON.stringify( res.data));
    this.setState( {  groups:res.data});
    if(res.data.length==0)
    {console.log("no groups found")
    }
    console.log(this.state.groups)
    
    });
}    
      AddFile = () => {
        let  user_select=document.getElementById("User_select")
        let Group_select=document.getElementById("Group_select")
        let id=user_select.value

let my_group_id=Group_select.value ;
let Group={
    id_user:id,
    id_group:my_group_id
} 
axios.post('http://localhost:8000//group//adduser',Group,{headers:{
          "Content-Type":"application/json",
          "Authorization":token
        },}).then((res)=>{
            toast.success(res.data, {
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
    });
});
   

}
render(){
    return(

<div id="Add">
<div id="sss">

<button onClick={this.GetUsers} >
    Get the Users
</button>

<select id="User_select" >
{   this.state.users.map((user,index) => <option key={index} value={user.id}>
    {user.username}
</option> )}

</select>
<br>
</br>

<button onClick={this.GetGroups} >
    Get the Groups 
</button>
<select id="Group_select" >
{   this.state.groups.map((group,index) => <option key={index} value={group.id}>
    {group.name}
</option> )}

</select>
<br>
</br>
<br>
</br>

<Button onClick={this.AddFile}>AddtheUserToTheGroup</Button>

<ToastContainer />
</div>
</div>

    )
}

}
export default AddUserToGroup;