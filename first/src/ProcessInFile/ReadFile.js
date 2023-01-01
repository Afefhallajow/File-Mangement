import { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
//import Button from "@restart/ui/esm/Button";
import { Button, Col,div, Row } from 'react-bootstrap'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import "./ReadFile.css"
import axios from "axios";
let token=localStorage.getItem("token")

class ReadFile extends Component
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

readfile=()=>{
    let File_select=document.getElementById("File_select")
    let id=File_select.value;
    
    axios.post('http://localhost:8000//files//readfile',id,{headers:{
        "Content-Type":"application/json",
        "Authorization":token
      },}).then((res)=>{
  console.log(JSON.stringify( res.data));
let ReadFileContent=document.getElementById("ReadFileContent");
let title=document.createElement("h2");
let content=document.createElement("p");
toast.success(res.data.message, {
  position: toast.POSITION.TOP_RIGHT
});

title.innerHTML=res.data.title;
content.innerHTML=res.data.content;

ReadFileContent.appendChild(title);
ReadFileContent.appendChild(content);

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
{return(

<div id="ReadFile" > 
<button onClick={this.GetFiles} >
    Get the Files you can read 
</button>

<select id="File_select">
{   this.state.files.map((file,index) => <option key={index} value={file.id}>
    {file.fileName}
    {console.log(file.id)}
</option> )}

</select>
<br></br>
<button  onClick={this.readfile}>readfile</button>
<div id="ReadFileContent" >

</div>

</div>




)}


}
export default ReadFile