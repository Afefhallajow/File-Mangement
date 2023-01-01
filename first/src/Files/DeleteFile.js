import "./add.css"
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

import { Component } from "react";
let token=localStorage.getItem("token")
       
class DeleteFile extends Component
{state={
    files:[]
}
    GetFiles = () => {
        axios.get('http://localhost:8000//files//findbyowner',{headers:{
          "Content-Type":"application/json",
          "Authorization":token
        },}).then((res)=>{
    console.log(JSON.stringify( res.data));
 this.setState( {  files:res.data});
console.log(this.state.files)
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
    kkk=()=>{

let ss=document.getElementById("user_select")

console.log(ss.value);
    }
    deletefile = () => {
        let user_select=document.getElementById("user_select")
let id=user_select.value
        axios.post('http://localhost:8000//files//delete',id,{headers:{
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


    render()
{return(
<div id="Add">
    <br></br>
<button onClick={this.GetFiles} >
    Get the Files you can Delete
</button>
<select id="user_select" >
{   this.state.files.map((file,index) => <option key={index} value={file.id}>
    {file.fileName}
    {console.log(file.id)}
</option> )}

</select>
<br></br>
<button onClick={this.deletefile}>DeleteFile</button>

</div>


)}



}
export default DeleteFile;