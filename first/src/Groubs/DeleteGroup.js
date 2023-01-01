import "./add.css"
import { render } from "@testing-library/react"
import { Component } from "react"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";

let token=localStorage.getItem("token")

class  DeleteGroup extends Component{
state={
    groups:[]
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
              DeleteGroup = () => {
                let Group_select=document.getElementById("Group_select")
         
        let my_group_id=Group_select.value ;
        axios.post('http://localhost:8000//group//deletegroup',my_group_id,{headers:{
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
{
return(
<div id="Add">
<br></br>

<button onClick={this.GetGroups} >
    Get the Groups 
</button>


<select id="Group_select" onClick={this.GetTheUserForthisGroup}>
{   this.state.groups.map((group,index) => <option key={index} value={group.id}>
    {group.name}
</option> )}

</select>
<br></br>
<br></br>

<button onClick={this. DeleteGroup} >
    DeleteGroup
</button>

<ToastContainer />
</div>



)

}

  
    

} 
export default DeleteGroup;