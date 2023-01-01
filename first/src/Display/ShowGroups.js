import { Component } from "react";
import { Table } from "react-bootstrap";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

import axios from 'axios'
let token =localStorage.getItem("token");
class ShowGroups extends Component
{
    state={
    files:[],
groups:[]
}


    GetGroups=()=>{
        axios.get('http://localhost:8000//group//getbyowner',{headers:{
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
<button onClick={this.GetGroups}>GetFiles</button>

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
export default ShowGroups;