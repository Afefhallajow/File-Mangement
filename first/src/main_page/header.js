import { Component } from "react";
import "./header.css";
import 'bootstrap/dist/css/bootstrap.css';
import {nav} from "react-bootstrap"
import { BrowserRouter } from "react-router-dom";
class header extends Component{
handle=(e)=>
{
    e.preventDefault();
 console.log(  e.target.value);
}


    render()
{

return(
<div >

<nav id="nav">
  <h3 id="Navbar"  href="/">SourceSafe</h3>
<div id="login">
  <div>
  <a id="log" href="/login">Login</a>
  <a id="log" href="/register">register</a>
 </div>
 <div id="main_process">
 <a id="log" href="/files">Files</a>
  <a id="log" href="/process">ProcessInFile</a>
  <a id="log" href="/groups">Groups</a>
<a id="log" href="/display">Display</a>
<a id="log" href="/report">Report</a>
<a id="log" href="/admin">Admin</a>

</div>
 </div>

</nav></div>)

}




}
export default header;