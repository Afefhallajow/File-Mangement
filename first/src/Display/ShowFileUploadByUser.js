import Button from "@restart/ui/esm/Button";
import { Component } from "react";
import { Table } from "react-bootstrap";
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

let token =localStorage.getItem("token");

class ShowFileUploadByUser extends Component
{
    state={
    files:[]
    }


    GetFiles = () => {
        axios.get('http://localhost:8000//files//findbyowner',{headers:{
          "Content-Type":"application/json",
          "Authorization":token   },}).then((res)=>{
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
    


    render()
    {
        return(<div>

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

        </div>)
    }
}
export default ShowFileUploadByUser;