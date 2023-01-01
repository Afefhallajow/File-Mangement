import { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
//import Button from "@restart/ui/esm/Button";
import { Button, Col,div, Row } from 'react-bootstrap'
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import "./ReadFile.css"
class EditeFile extends Component
{state={
  file:{id:"",title:"",content:""},
  files:[],
    groups:[]
}
Change=()=>{
  let id=document.getElementById("file_id");
 
  let content=document.getElementById("file_content");
let title=document.getElementById("file_title");
this.setState({file:{id:id.value,title:title.value,content:content.value}})
}
GetFiles = () => {
  let token=localStorage.getItem("token")

    axios.get('http://localhost:8000//files//findbyowner',{headers:{
      "Content-Type":"application/json",
      "Authorization":token
    },}).then((res)=>{
console.log(JSON.stringify( res.data));
this.setState( {  files:res.data});
console.log(this.state.files)
});
}

Checkin = () => {
  let File_select=document.getElementById("File_select")
  let id=File_select.value;
this.setState({file:{id:id}});
  let token=localStorage.getItem("token")

  console.log(id)
  axios.post('http://localhost:8000//files//checkin',id,{headers:{
      "Content-Type":"application/json",
      "Authorization":token
    },}).then((res)=>{
console.log(JSON.stringify( res.data));
this.setState({file:{title:res.data.title,content:res.data.content}})

});
}
Editetheinput=()=>{
  let token=localStorage.getItem("token")
  let id=document.getElementById("file_id");
 
  let content=document.getElementById("file_content");
let title=document.getElementById("file_title");
this.setState({file:{id:id.value,title:title.value,content:content.value}})

  console.log(this.state.file.id);

  axios.post('http://localhost:8000//files//editefile',this.state.file,{headers:{
      "Content-Type":"application/json",
      "Authorization":token
        },}).then((res)=>{
          toast.success(res.data, {
            position: toast.POSITION.TOP_RIGHT
        });
this.setState({file:{id:"",title:"",content:""}})
          console.log(res.data);
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
};

checkout=()=>{
  let token=localStorage.getItem("token")
  let id=document.getElementById("file_id");
 
  let content=document.getElementById("file_content");
let title=document.getElementById("file_title");
this.setState({file:{id:id.value,title:title.value,content:content.value}})
console.log(this.state.file.id)
  axios.post('http://localhost:8000//files//checkout',this.state.file.id,{headers:{
      "Content-Type":"application/json",
      "Authorization":token
    },}).then((res)=>{
      toast.success(res.data, {
        position: toast.POSITION.TOP_RIGHT
    });
this.setState({file:{id:"",title:"",content:""}})
    
      console.log(res.data);
    });
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
<button onClick={this.Checkin} >
    checkin
</button>

<div id="ReadFileContent" >

</div>
<div  id="Editeform" >
<button onClick={this.checkout}>checkout</button>

<br></br>
<br></br><br></br>
<input type="number" id="file_id" onChange={this.Change}  value={this.state.file.id}></input>

<br></br>
<br></br>

<input type="text" id="file_title" onChange={this.Change} type="text" value={this.state.file.title}></input>
<br></br>
<br></br>

<textarea  id="file_content" onChange={this.Change} value={this.state.file.content}></textarea>
<br></br>
<button onClick={this.Editetheinput}>EditeFile</button>

</div>
<ToastContainer />
</div>




)}


}
export default EditeFile