import { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
//import Button from "@restart/ui/esm/Button";
import { Button, Col,div, Row ,Table} from 'react-bootstrap'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import "./ReadFile.css"
import axios from "axios";
let token=localStorage.getItem("token")

class ShowAllGroup extends Component
{state={
    files:[],
    groups:[]
}

GetGroups=()=>{
    axios.get('http://localhost:8000//group//findall',{headers:{
        "Content-Type":"application/json",
        "Authorization":token     },}).then((res)=>{
    console.log(JSON.stringify( res.data));
    this.setState( {  groups:res.data});
    if(this.state.groups.length==0)
    {console.log("no groups found")
    }
    console.log(this.state.groups)
    
    }).catch((reason) => {
        if (reason.response.status === 403) {
            toast.error('you should login first you are not the admin !', {
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
<button onClick={this.GetGroups}>GetGroups</button>

<Table>
<thead>
<tr>
                        <th>#</th>
                        <th>GroupName</th>
                    </tr>
</thead>
<tbody>                   
{this.state.groups.map((group,index) => <tr key={index}> 
<td>{index}</td>
<td>{group.name}</td>
</tr> )}
</tbody>
</Table>

    </div>)
    }


}
export default ShowAllGroup;