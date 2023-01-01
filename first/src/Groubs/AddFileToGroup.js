import "./add.css"
import { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
//import Button from "@restart/ui/esm/Button";
import { Button, Col,div, Row } from 'react-bootstrap'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

import axios from "axios";
let token=localStorage.getItem("token")

class AddFileToGroup extends Component
{state={
    files:[],
    groups:[]
}


    GetFiles = () => {
        axios.get('http://localhost:8000//files//findbyowner',{headers:{
          "Content-Type":"application/json",
          "Authorization":token
          },}).then((res)=>{
    console.log(JSON.stringify( res.data));
 this.setState( {  files:res.data});
console.log(this.state.files)
});
    }
    
    GetGroups=()=>{
axios.get('http://localhost:8000//group//findbyuser',{headers:{
    "Content-Type":"application/json",
    "Authorization":token
  },}).then((res)=>{
console.log(JSON.stringify( res.data));
this.setState( {  groups:res.data});
if(this.state.groups.length==0)
{console.log("no groups found")
}
console.log(this.state.groups)

});



      }

      AddFile = () => {
        let File_select=document.getElementById("File_select")
        let Group_select=document.getElementById("Group_select")
        let id=File_select.value

let my_group_id=Group_select.value ;
let Group={
    file_id:id,
    group_id:my_group_id
} 
axios.post('http://localhost:8000//group//addfile',Group,{headers:{
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

<div id="Add" >
<button onClick={this.GetFiles} >
    Get the Files you can add to Group
</button>
<button onClick={this.GetGroups} >
    Get the Groups 
</button>

<select id="File_select" >
{   this.state.files.map((file,index) => <option key={index} value={file.id}>
    {file.fileName}
    {console.log(file.id)}
</option> )}

</select>
<select id="Group_select" >
{   this.state.groups.map((group,index) => <option key={index} value={group.id}>
    {group.name}
    {console.log(group.id)}
</option> )}

</select>

<Button onClick={this.AddFile}>addFile</Button>
<ToastContainer />
</div>
    )
}

}
export default AddFileToGroup;