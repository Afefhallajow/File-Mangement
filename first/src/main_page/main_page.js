import "./main_page.css"
import { Component } from "react";
import Header from "./header";
import Login from "../auth/login";
import Register from "../auth/Register";
import AddFileToGroup from "../Groubs/AddFileToGroup";
import CreateGroups from "../Groubs/CreateGroups";
import AddUserToGroup from "../Groubs/AddUserToGroup ";
import DeleteUserFromGroup from "../Groubs/DeleteUserfromGroup";
import ReadFile from "../ProcessInFile/ReadFile";
import EditeFile from "../ProcessInFile/EditeFile";
import DeleteGroup from "../Groubs/DeleteGroup";
import ShowFileUploadByUser from "../Display/ShowFileUploadByUser";
import ShowGroups from "../Display/ShowGroups";
import Showfileinsidegroups from "../Display/showfileinsidegroups";
import Display from "../Display/Display";

import File from "../Files/File";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Process from "../ProcessInFile/Process";
import ShoweReport from "../Report/showReport";
import Groups from "../Groubs/Groups";
import Home from "./Home";
import ShowAllFile from "../admin/ShowAllFile";
import ShowAllGroup from "../admin/ShowAllGroup";
import Admin from "../admin/admin";

class main_page extends Component{
componentDidMount(){
}

    handle=(e)=>
{
 
}


    render()
{

return(
<BrowserRouter>

<div id="mainpage">
<Header/>
<Routes>
<Route path ="/login" element={<Login/>}/>
<Route path ="/register" element={<Register/>}/>
<Route path ="/files" element={<File/>}/>
<Route path ="/process" element={<Process/>}/>
<Route path ="/showfileinsidgroup" element={<Showfileinsidegroups/>}/>
<Route path ="/showfileupload" element={<ShowFileUploadByUser/>}/>
<Route path ="/showgroups" element={<ShowGroups/>}/>
<Route path ="/display" element={<Display/>}/>
<Route path ="/report" element={<ShoweReport/>}/>
<Route path ="/creategroub" element={<CreateGroups/>}/>
<Route path ="/addusertogroup" element={<AddUserToGroup/>}/>
<Route path ="/addfiletogroup" element={<AddFileToGroup/>}/>
<Route path ="/deletegroup" element={<DeleteGroup/>}/>
<Route path ="/deleteuserfromGroup" element={<DeleteUserFromGroup/>}/>
<Route path ="/groups" element={<Groups/>}/>
<Route path ="/editefile" element={<EditeFile/>}/>
<Route path ="/readfile" element={<ReadFile/>}/>
<Route exact path ="/" element={<Home/>}/>
<Route path ="/showallfiles" element={<ShowAllFile/>}/>
<Route path ="/showallgroups" element={<ShowAllGroup/>}/>
<Route path ="/admin" element={<Admin/>}/>


</Routes>
</div>
</BrowserRouter>

    )


}




}
export default main_page;