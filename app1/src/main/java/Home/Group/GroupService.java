package Home.Group;

import Home.Files.FileRepo;
import Home.Files.SysFile;
import Home.Security.AppUser;
import Home.Security.UserService;
import Home.Security.Userrepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.awt.*;
import java.util.ArrayList;
import java.util.List;

@Service
@EnableCaching
public class GroupService {
@Autowired
File_groupService file_groupService;

    @Autowired

    Userrepository userrepository;
@Autowired
    FileRepo fileRepo;
@Autowired
User_GroupRepo user_groupRepo;
@Autowired
File_GroupRepo file_groupRepo;
@Autowired
GroupRepo groupRepo;
@Autowired
    UserService userService;
public  String  add_file_to_group(File_Group file_group ) {
    List<File_Group> file_groups = file_groupRepo.findAll();
    if (!file_groups.isEmpty()) {
        for (int j = 0; j < file_groups.size(); j++) {
            if ((file_groups.get(j).getFile_id() == file_group.getFile_id()) && (file_groups.get(j).getGroup_id() == file_group.getGroup_id())) {
                {
                    return "file is already in the group";
                }

            }

        }
    }
        file_groupRepo.save(file_group);
        return "Created Secssfully";

}
    public  String  add_user_to_group(User_Group user_group ) {
        List<User_Group> user_groups = user_groupRepo.findAll();
        if (!user_groups.isEmpty()) {
            for (int j = 0; j < user_groups.size(); j++) {
                if ((user_groups.get(j).getId_user() == user_group.getId_user()) && (user_groups.get(j).getId_group() == user_group.getId_group())) {
                    {
                        return "user is already in the group";
                    }

                }

            }
        }
       user_groupRepo.save(user_group);
        return "Created Secssfully";

    }

    @Cacheable(value = "users")
    public ArrayList<AppUser> find_group_user() {

        ArrayList<AppUser> users = new ArrayList<>();
        List<AppUser> temp = userService.findall();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String name = auth.getName();
        for (int i = 0; i < temp.size(); i++) {
            if (!temp.get(i).getUsername().equals(name)) {
                users.add(temp.get(i));
            }
        }
        return users;
    }
    // to find all the goups that the user in have
    @Cacheable(value = "groups")
    public ArrayList<MyGroup> find_group_to_user() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String name = auth.getName();
        AppUser user = userrepository.findByUsername(name);
        int id = user.getId();
        List<User_Group> user_groups = user_groupRepo.findAll();
        ArrayList<MyGroup> temp = new ArrayList<>();
System.out.println("ffffffff");
        if (!user_groups.isEmpty()) {
         System.out.println("Sfsafasfsfasf");
            for (int i = 0; i < user_groups.size(); i++) {
            if (user_groups.get(i).getId_user()==id)
            {int id1=user_groups.get(i).getId_group();
            System.out.println(id1);
           List<MyGroup> temp2=    groupRepo.findAll();
System.out.println(temp2.get(0));
           for (int j=0;j<temp2.size();j++)
{ if (temp2.get(j).getId()==id1)
{ System.out.println(temp2.get(j).getId());
temp.add(temp2.get(j)) ;
}


}
            }
            }
            return temp;
        }
        return temp;
    }

    public String Create_Group(String group_name) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String name = auth.getName();
MyGroup myGroup=new MyGroup();
myGroup.setName(group_name);
myGroup.setOwner(name);
int Group_id= groupRepo.save(myGroup).getId();
User_Group user_group=new User_Group();
        AppUser user = userrepository.findByUsername(name);
 user_group.setId_user(user.getId());
 user_group.setId_group(Group_id);
 user_groupRepo.save(user_group);
        return "created_secssfully";
}

    public String Delete_User_from_Group(User_Group user_group) {
        AppUser appUser = userrepository.findById(user_group.getId_user()).get();
        if (appUser.isActive())
            return "user is active now";
        else {
            List<User_Group> user_groups = user_groupRepo.findAll();
            if (!user_groups.isEmpty()) {
                for (int j = 0; j < user_groups.size(); j++) {
                    if ((user_groups.get(j).getId_user() == user_group.getId_user()) && (user_groups.get(j).getId_group() == user_group.getId_group())) {
                        {
                            user_groupRepo.delete(user_groups.get(j));
                            return "delete done";
                        }
                    }
                }
            }

        }
return "Some thing Wrong";
    }

    public ArrayList<AppUser> find_user_in_group(int group_id) {
    List<User_Group> user_groups=user_groupRepo.findAll();
    ArrayList<AppUser> appUsers=new ArrayList<>();
    if(!user_groups.isEmpty())
    {
        for (int i=0;i<user_groups.size();i++)
        {if(user_groups.get(i).getId_group()== group_id)
        {
            AppUser appUser=userrepository.findById(user_groups.get(i).getId_user()).get();
            appUsers.add(appUser);

        }

        }

    }
return appUsers;
}

    public String Delete_Group(int group_id) {

    List<MyGroup> temp=groupRepo.findAll();
//deelet all the user group
        //delete all the  files
        List<User_Group> user_groups= user_groupRepo.findAll();
        if(!user_groups.isEmpty()) {
            for (int i = 0; i < user_groups.size(); i++) {
                if (user_groups.get(i).getId_group() == group_id) {
                    user_groupRepo.delete(user_groups.get(i));
                }
            }
        }
        List<File_Group> file_groups= file_groupRepo.findAll();
        if(!file_groups.isEmpty()) {
            for (int i = 0; i < file_groups.size(); i++) {
                if (file_groups.get(i).getGroup_id() == group_id) {
                    file_groupRepo.delete(file_groups.get(i));
                }
            }
        }
    for(int i=0; i<temp.size();i++)
        {
            if (temp.get(i).getId()==group_id)
            {
    groupRepo.delete(temp.get(i));
            }

        }

return "Delete done";
}
//show files in the group
public ArrayList<SysFile> getfilesfromgroup(int group_id)
{

//List<User_Group> user_groups= user_groupRepo.findAll();
    ArrayList<File_Group> temp_user_group= new ArrayList<>();
    ArrayList<SysFile> files= new ArrayList<>();

    List<File_Group> file_groups= file_groupRepo.findAll();
    if(!file_groups.isEmpty()) {
        for (int i = 0; i < file_groups.size(); i++) {
            if (file_groups.get(i).getGroup_id() == group_id) {
                    temp_user_group.add(file_groups.get(i));
                      }
        }
    }

if(!temp_user_group.isEmpty())
{
   files= file_groupService.sysFiles(temp_user_group);
}
    return files;

}

//show the group that user have
public ArrayList<MyGroup> get_the_group_user_owner()
{List<MyGroup> groups=groupRepo.findAll();
ArrayList<MyGroup> arrayList=new ArrayList<>();

    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
for(int i=0;i<groups.size();i++)
{
    if(groups.get(i).getOwner().equals(auth.getName()))
    {
        arrayList.add(groups.get(i));

    }

}


return arrayList;
}

    public ResponseEntity<ArrayList<MyGroup>> findAll() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        ArrayList<MyGroup> arrayList=new ArrayList<>();

        if(auth.getName().equals("admin"))
        {
            List<MyGroup> list =groupRepo.findAll();
            for(int i=0;i<list.size();i++) {
                arrayList.add(list.get(i));
            }   return new ResponseEntity<>(arrayList, HttpStatus.OK);    }
        else
            return new ResponseEntity<>(arrayList, HttpStatus.FORBIDDEN);
    }


}