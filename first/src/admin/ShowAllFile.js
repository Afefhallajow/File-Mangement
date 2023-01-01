import { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
//import Button from "@restart/ui/esm/Button";
import { Button, Col,div, Row,Table } from 'react-bootstrap'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import "./ReadFile.css"
import axios from "axios";
let token=localStorage.getItem("token")

class ShowAllFile extends Component
{state={
    files:[],
    groups:[]
}
GetFiles = () => {
  
    axios.get('http://localhost:8000//files//findall',{headers:{
      "Content-Type":"application/json",
      "Authorization":token
    },}).then((res)=>{
console.log(JSON.stringify( res.data));
this.setState( {  files:res.data});
console.log(this.state.files)
}).catch((reason) => {
    if (reason.response.status === 403) {
        toast.error('you should login first your are not admin  !', {
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
<button onClick={this.GetFiles}>GetFiles</button>

<Table>
<thead>
<tr>
                            <th>#</th>
                            <th>FileName</th>
                            <th>Owner</th>
                            <th>activeuser</th>
                       
                        </tr>
                        </thead>
                        <tbody>            
    {this.state.files.map((file,index) =>
    <tr key={index}> 
    <td>{index}</td>
   <td>{file.fileName}</td>
   <td>{file.owner}</td>
   <td>{file.activeuser}</td>
<td></td>
</tr> )}
</tbody>
</Table>
</div>




)}


}
export default ShowAllFile;