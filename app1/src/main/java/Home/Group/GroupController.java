package Home.Group;

import Home.Files.SysFile;
import Home.Security.AppUser;
import Home.Security.JwtResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/group")
public class GroupController {

    @Autowired
    GroupService groupService;
@PostMapping("/create")
public ResponseEntity<String> Create_Group(@RequestBody String group)
{ String message= groupService.Create_Group(group);

return new ResponseEntity<String>(message,HttpStatus.CREATED);

}
    @PostMapping("addfile")
    public ResponseEntity<String> add_file_to_group(@RequestBody File_Group file_group) {
    String message=    groupService.add_file_to_group(file_group);

        return new ResponseEntity<String>(message, HttpStatus.CREATED);
    }

    @GetMapping("/findbyuser")
    public ArrayList<MyGroup> find_group_to_user() {

System.out.println("asfsafas");
        ArrayList<MyGroup> temp= groupService.find_group_to_user();
        return temp;


    }
    @GetMapping("/getbyowner")
   public ArrayList<MyGroup> get_the_group_user_owner(){
    return groupService.get_the_group_user_owner();
    }
    // to find all user in the system
    @GetMapping("/find")
    public ArrayList<AppUser> find_group_user() {

        System.out.println("asfsafas");
        ArrayList<AppUser> temp= groupService.find_group_user();
        return temp;


    }
// to find all the user in the group
@PostMapping("useringroup")
public ArrayList<AppUser> find_user_in_group(@RequestBody int group_id) {

    System.out.println("asfsafas");
    ArrayList<AppUser> temp= groupService.find_user_in_group(group_id);
    return temp;


}

    @PostMapping("adduser")
    public  String  add_user_to_group(@RequestBody User_Group user_group ) {
     System.out.println(user_group.getId_group());
        return groupService.add_user_to_group(user_group);
    }
    @PostMapping("deleteuser")
    public ResponseEntity<String> Delete_User_from_Group(@RequestBody User_Group user_group)
    { String message= groupService.Delete_User_from_Group(user_group);

        return new ResponseEntity<String>(message,HttpStatus.OK);

    }
    @PostMapping("deletegroup")
    public ResponseEntity<String> Delete_Group(@RequestBody int group_id)
    { String message= groupService.Delete_Group(group_id);

        return new ResponseEntity<String>(message,HttpStatus.OK);

    }
    @PostMapping("getfilesfromgroup")
    public ArrayList<SysFile> getfilesfromgroup(@RequestBody int group_id)
    { ArrayList<SysFile> message= groupService.getfilesfromgroup(group_id);

        return message;

    }
    @GetMapping("/findall")
    public ResponseEntity<ArrayList<MyGroup>>findAll()
    {
        //     Logger logger = LoggerFactory.getLogger(File.class);
        //   logger.info("asdasfafds;klsgklkfl;ajFKLJFKLFJSAHFLASJFKAFL;ASKFLASKF;LSAKF");

        return groupService.findAll();
    }

}
