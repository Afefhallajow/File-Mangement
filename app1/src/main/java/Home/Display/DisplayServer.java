package Home.Display;

import Home.Files.FileServer;
import Home.Files.SysFile;
import Home.Group.GroupService;
import Home.Group.MyGroup;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class DisplayServer {

@Autowired
    FileServer fileServer;
@Autowired
    GroupService groupService;
   public ArrayList<SysFile> ShowFileUploadbyUser()
   {return fileServer.findByUser();}

    public ArrayList<SysFile> ShowFilDetailsbyUser()
    {
     return fileServer.findallfiles();
    }
    public ArrayList<MyGroup> ShowGroupownerwithUser()
    {
        return groupService.get_the_group_user_owner();
    }

}
