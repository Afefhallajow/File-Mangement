import "./add.css"
import axios from "axios";
import { Component } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

let files=Array;
let token=localStorage.getItem("token")

class FileUpload extends Component{ 
 file= File;
state={
    file:""}
handleUploadClick = () => {
   
    // 👇 Uploading the file using the fetch API to the server
    console.log(this.file.name);
    const formData = new FormData();
    formData.append("file",this.file)
    axios.post('http://localhost:8000//files//create',formData,{
      // 👇 Set headers manually for single file upload
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        "Authorization":token
    },  
    
    }).then(res=>{
      
      toast.success(res.data  , {
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
      });})
     };
     test = () => {
      let token=localStorage.getItem("token")

      axios.get('http://localhost:8000//files//findbyowner',{headers:{
        "Content-Type":"application/json",
        "Authorization":token
      },}).then((res)=>{
console.log(JSON.stringify( res.data));

files=res.data;

});
    }
   show=()=>{

    console.log(files);
   }

render(){
    return (
        <div id="Add">
          <input type="file" onChange={(e)=>this.file=e.target.files[0]} />
    
    
          <button onClick={this.handleUploadClick}>Upload</button>
        
        <ToastContainer />
        </div>
      
);
    }


 



}
export default FileUpload;