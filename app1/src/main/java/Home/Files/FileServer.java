package Home.Files;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Isolation;

import Home.Group.File_Group;
import Home.Group.File_GroupRepo;
import Home.Group.GroupService;
import Home.History.History;
import Home.History.HistoryServer;
import Home.Security.AppUser;
import Home.Security.Userrepository;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.*;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;
import java.util.function.Consumer;
import java.util.function.Predicate;
import java.util.function.UnaryOperator;
import java.util.stream.Stream;

@Service
public class FileServer {

    @Autowired
    HistoryServer historyServer;
    @Autowired
    Userrepository userrepository;
@Autowired
    GroupService groupService;
    @Autowired
    FileRepo fileRepo;
@Autowired
File_GroupRepo file_groupRepo;
    @Transactional()
    public String CreateFile(MultipartFile file) throws IOException {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
SysFile myfile = new SysFile();

        myfile.setOwner(auth.getName());

        myfile.setFileName(file.getOriginalFilename());
        myfile.setActiveuser("");

        myfile.setIsfree(true);

        int id=        fileRepo.save(myfile).getId();
        File file1=new File(file.getOriginalFilename());
        if(file1.exists())
        {return "file found";}
        file1.createNewFile();

        FileOutputStream printWriter =new FileOutputStream(file1);
        printWriter.write(file.getBytes());
        printWriter.close();


        historyServer.AddNewHistory(id,"upload");

        return "Created Secssufully";


    }
    @Transactional()
    public ArrayList<SysFile> findByUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        List<SysFile> sysFiles = fileRepo.findAll();
//ArrayList<File_Group> file_groups=groupService.getfilesfromgroup();
        if (!sysFiles.isEmpty()) {
            ArrayList<SysFile> temp = new ArrayList<>();
            for (int i = 0; i < sysFiles.size(); i++) {
                if (sysFiles.get(i).getOwner().equals(auth.getName())) {
                    temp.add(sysFiles.get(i));
                }

            }
            if (!temp.isEmpty())
                return temp;  //fileRepo.findByOwner(auth.getName());
            else {
                System.out.println("no file for this user found");
                return temp;
            }
        } else {
            return null;
        }


    }


    public String DeletFile(int id) {

        SysFile myfile = fileRepo.findById(id).get();
        File file=new File(myfile.getFileName());

       if(myfile.isIsfree()) {

        if(   file.delete()){
            System.out.println("file delete secussfully");
        }
           fileRepo.delete(myfile);
List<File_Group> file_groups= file_groupRepo.findAll();
if(!file_groups.isEmpty()) {
for(int i=0;i< file_groups.size();i++)
{if(file_groups.get(i).getFile_id()==myfile.getId())
{
        file_groupRepo.delete(file_groups.get(i));
    }}
}          return "Deleted done";
       }
else
    return "file is not free";
    }
@Transactional()
    public FileToView ReadFile(int id) throws IOException {
        SysFile sysFile = fileRepo.findById(id).get();

        if (sysFile.isIsfree()) {
            File file= new File(sysFile.getFileName());
            System.out.println(sysFile.getFileName()+file.getPath());
            BufferedReader fr= new BufferedReader( new FileReader(file));
            String s ="";
            s=fr.readLine();

            while ((fr.readLine())!=null)
            {s+=fr.readLine();}
            fr.close();
            System.out.println(s);
            FileToView fileToView = new FileToView();
            fileToView.setId(sysFile.getId());
            fileToView.setTitle(sysFile.getFileName());
            fileToView.setContent(s);
            
            fileToView.setMessage("ok");
            return fileToView;
        } else {
            FileToView fileToView = new FileToView();
            fileToView.setMessage("file is not free");
            return fileToView;
        }
    }

    public FileToView checkin(int id) throws IOException {
        SysFile sysFile = fileRepo.findById(id).get();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        AppUser appUser = userrepository.findByUsername(auth.getName());

        if (sysFile.isIsfree() && !appUser.isActive()) {
            appUser.setActive(true);
            userrepository.save(appUser);
            FileToView fileToView = new FileToView();
            fileToView.setId(sysFile.getId());
            fileToView.setTitle(sysFile.getFileName());

            File file= new File(sysFile.getFileName());
            BufferedReader fr= new BufferedReader( new FileReader(file));
            String s = "";
s=fr.readLine();
            while ((fr.readLine())!=null)
            {s+=fr.readLine();}
fr.close();
            System.out.println(s);
            fileToView.setContent(s);
              sysFile.setActiveuser(auth.getName());
                      sysFile.setIsfree(false);
historyServer.AddNewHistory(id,"read");
            fileRepo.save(sysFile);

            fileToView.setMessage("ok");
            return fileToView;
        } else {
            FileToView fileToView = new FileToView();
            fileToView.setMessage("file is not free");
            return fileToView;
        }

    }
    @Transactional()
    public String EditeFile(FileToView fileToView) throws IOException {
    //       File  file=new File(fileToView.title);
      //  PrintWriter printWriter=new PrintWriter(file);
//printWriter.write(fileToView.content);
//printWriter.close();
//byte[] ss = Files.readAllBytes(Paths.get(file.getPath()));
        System.out.println(fileToView.getId()+fileToView.id);
        SysFile sysFile = fileRepo.findById(fileToView.getId()).get();
        //sysFile.setId(fileToView.getId());

        File file= new File(sysFile.getFileName());
            file.delete();
System.out.println(sysFile.getFileName());
        File file1= new File(fileToView.getTitle());
file1.createNewFile();
BufferedWriter bf =new BufferedWriter(new FileWriter(file1));
bf.write(fileToView.content);
bf.close();
  //      System.out.println(new String(fileToView.getArray(),StandardCharsets.UTF_8 ));
        sysFile.setFileName(fileToView.getTitle());
        sysFile.setIsfree(false);
        historyServer.AddNewHistory(fileToView.getId(),"edit");

        fileRepo.save(sysFile);

        this.checkout(fileToView.getId());

        return "upated secussfully";
    }

    public String checkout(int id) throws UnsupportedEncodingException, FileNotFoundException {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        AppUser appUser = userrepository.findByUsername(auth.getName());
        SysFile sysFile = fileRepo.findById(id).get();
        sysFile.setActiveuser("");
        sysFile.setIsfree(true);
        fileRepo.save(sysFile);

        historyServer.AddNewHistory(id,"checkout");

        appUser.setActive(false);
userrepository.save(appUser);
        return "check out done ";
    }
public ArrayList<SysFile> findallfiles()
{ArrayList<SysFile> temp= (ArrayList<SysFile>) fileRepo.findAll();
    return temp;
}


    public ResponseEntity<ArrayList<SysFile>> findAll() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        ArrayList<SysFile> arrayList=new ArrayList<>();

        if(auth.getName().equals("admin"))
{
        List<SysFile> list =fileRepo.findAll();
        for(int i=0;i<list.size();i++) {
            arrayList.add(list.get(i));
        }   return new ResponseEntity<>(arrayList, HttpStatus.OK);    }
        else
            return new ResponseEntity<>(arrayList, HttpStatus.FORBIDDEN);
    }
}