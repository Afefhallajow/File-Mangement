import { render } from "@testing-library/react"
import { Component } from "react"
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

let token=localStorage.getItem("token")

class  DeleteUserFromGroup extends Component{
state={
    groups:[],
users:[]
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
              GetTheUserForthisGroup=()=>{
                let Group_select=document.getElementById("Group_select")
                let id=Group_select.value
        
        
        axios.post('http://localhost:8000//group//useringroup',id,{headers:{
                  "Content-Type":"application/json",
                  "Authorization":token
                  },}).then((res)=>{
                        this.setState({users:res.data})                        
                    console.log(JSON.stringify( res.data));
         });
        }

              
              DeleteTheUserForthisGroup=()=>{
                let  user_select=document.getElementById("User_select")
                let Group_select=document.getElementById("Group_select")
                let id=user_select.value
        
        let my_group_id=Group_select.value ;
        let Group={
            id_user:id,
            id_group:my_group_id
        } 
        axios.post('http://localhost:8000//group//deleteuser',Group,{headers:{
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
             })
        
        }
        
render()
{
return(
<div id="Add">
<button onClick={this.GetGroups} >
    Get the Groups 
</button>


<select id="Group_select" >
{   this.state.groups.map((group,index) => <option key={index} value={group.id}>
    {group.name}
</option> )}

</select>
<br></br>
<button onClick={this.GetTheUserForthisGroup}>GetTheUserForthisGroup</button>
<select id="User_select" >
{   this.state.users.map((user,index) => <option key={index} value={user.id}>
    {user.username}
</option> )}

</select>
<br></br>
<button onClick={this.DeleteTheUserForthisGroup} >DeleteUserFromGroup</button>
<ToastContainer />
</div>



)

}

  
    

} 
export default DeleteUserFromGroup;