import { Component } from "react"
import('./add.css')
class Groups extends Component
{
render()
{
    return(<div id="Add">
    <h2>please choose what you want</h2>
<a href="creategroub">CreateGroups</a>
<br></br>
<a href="addusertogroup">addusertogroup</a>
<br></br>
<a href="addfiletogroup">addfiletogroup</a>
<br></br>
<a href="deletegroup">delete group</a>
<br></br>
<a href="deleteuserfromGroup">deleteuserfromGroup</a>

</div>)
}

}
export default Groups;