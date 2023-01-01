import { Component } from "react";
import { Table } from "react-bootstrap";
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

let token =localStorage.getItem("token");

class Showfileinsidegroups extends Component
{
    state={
    files:[],
groups:[]
}

GetFiles = () => {
    let Group_select=document.getElementById("Group_select")
     let id=Group_select.value;
    axios.post('http://localhost:8000//files//getfilesfromgroup',id,{headers:{
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

    GetGroups=()=>{
        axios.get('http://localhost:8000//group//getbyowner',{headers:{
            "Content-Type":"application/json",
            "Authorization":token        },}).then((res)=>{
        console.log(JSON.stringify( res.data));
        this.setState( {  groups:res.data});
        if(this.state.groups.length==0)
        {console.log("no groups found")
        }
        console.log(this.state.groups)
        
        });
        
    }

    render()
    {
        return(<div>

<button onClick={this.GetGroups} >
    Get the Groups 
</button>


<select id="Group_select" >
{   this.state.groups.map((group,index) => <option key={index} value={group.id}>
    {group.name}
</option> )}

</select>
<br></br>
<br></br>

<button onClick={this.GetFiles} >
    GetFiles
</button>


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
    export default Showfileinsidegroups