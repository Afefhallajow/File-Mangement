import { Component } from "react";
import { Table } from "react-bootstrap";
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
  
let token=localStorage.getItem("token")

class ShoweReport extends Component
{
    state={
    files:[],
reports:[]
}

GetFiles = () => {
    axios.get('http://localhost:8000//files//findbyowner',{headers:{
      "Content-Type":"application/json",
      "Authorization":token
    },}).then((res)=>{
console.log(JSON.stringify( res.data));
this.setState( {  files:res.data});
console.log(this.state.files)
}) .catch((reason) => {
    if (reason.response.status === 403) {
        toast.error('you should login first  !', {
            position: toast.POSITION.TOP_RIGHT
        });
        
    }else 
    toast.error('somethingWrong  !', {
        position: toast.POSITION.TOP_RIGHT
    });
    console.log("asdsadasdsad")
  })

}

GetReport = () => {
    let File_select=document.getElementById("File_select")
  let   id=File_select.value;
  console.log(id);
    axios.post('http://localhost:8000//report//getreport',id,{headers:{
      "Content-Type":"application/json",
      "Authorization":token
    },}).then((res)=>{
console.log(JSON.stringify( res.data));
this.setState( {  reports:res.data});
toast.success('Success Notification !', {
    position: toast.POSITION.TOP_RIGHT
});

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

}

    render()
    {
        return(<div>

<button onClick={this.GetFiles} >
    Get the files 
</button>


<select id="File_select" >
{   this.state.files.map((file,index) => <option key={index} value={file.id}>
    {file.fileName}
    {console.log(file.id)}
</option> )}

</select>
<br></br>
<br></br>

<button onClick={this.GetReport} >
    GetReport
</button>


<Table>
<thead>
<tr>
                            <th>#</th>
                            <th>typeOfProcees</th>
                            <th>mydDate</th>
                            <th>user_name</th>
                        </tr>
       </thead>            
    {this.state.reports.map((report,index) =><tbody> <tr key={index}> 
    <td>{index}</td>
   <td>{report.typeOfProcees}</td>
   <td>{report.mydDate}</td>
   <td>{report.user_name}</td>

</tr> 
</tbody>)}
</Table>
<ToastContainer />
        </div>)
    }
    }
    export default ShoweReport;