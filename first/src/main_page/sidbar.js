import "./Sidbar.css"
import { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
//import {BrowserRouter,route} from "react-router-dom";
import {nav} from "react-bootstrap"
class sidbar extends Component{
handle=(e)=>
{
    e.preventDefault();
 console.log(  e.target.value);
}


    render()
{

return(
<div id="sidbar">
    <section id="sidbar">
<div id="sidbar_content">
    <p id="a_sidbar">
        Files
    </p>
    </div><div id="sidbar_content">
    <p id="a_sidbar">
        ProcessInFile
    </p>
    </div><div id="sidbar_content">
    <p id="a_sidbar">
        Groubs
    </p></div>




    </section>
</div>
)
}




}
export default sidbar;