package Home.Files;

import Home.Group.GroupService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;

@RestController
@RequestMapping("/files")
public class FileController {
@Autowired
    GroupService groupService;
    @Autowired
FileServer fileServer;
@Autowired
    Environment env;
@PostMapping("/create")
public String CreateFile(@RequestParam("file") MultipartFile file ) throws IOException {System.out.println("hello from file");
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
SysFile myfile=new SysFile();

myfile.setOwner(auth.getName());

myfile.setFileName(file.getOriginalFilename());
System.out.println(file);
    System.out.println(file.getSize());
    System.out.println(file.getOriginalFilename());
    System.out.println(file.getInputStream().read());
    System.out.println (new String(file.getBytes(), StandardCharsets.UTF_8));

//    String fileName = fileStorageService.storeFile(file);
return fileServer.CreateFile(file);


}
@GetMapping("/findbyowner")
    public ArrayList<SysFile>FindByOwner()
{
    Logger logger = LoggerFactory.getLogger(File.class);
logger.info("asdasfafds;klsgklkfl;ajFKLJFKLFJSAHFLASJFKAFL;ASKFLASKF;LSAKF");

    return fileServer.findByUser();
}
    @GetMapping("/findall")
    public ResponseEntity<ArrayList<SysFile>>findAll()
    {
   //     Logger logger = LoggerFactory.getLogger(File.class);
     //   logger.info("asdasfafds;klsgklkfl;ajFKLJFKLFJSAHFLASJFKAFL;ASKFLASKF;LSAKF");

        return fileServer.findAll();
    }


    @PostMapping("/getfilesfromgroup")
    public ArrayList<SysFile>getfilesfromgroup(@RequestBody int group_id)
    { ArrayList<SysFile> message= groupService.getfilesfromgroup(group_id);

        return message;
    }

@PostMapping("/delete")
    public String deletefile(@RequestBody int id) throws IOException {


    return fileServer.DeletFile(id);

    }
@PostMapping("readfile")
public  FileToView ReadFile(@RequestBody int id) throws IOException {System.out.println(id);
    return fileServer.ReadFile(id);
//return new FileToView();
}
    @PostMapping("checkin")
    public  FileToView checkin(@RequestBody int id) throws IOException {System.out.println(id);
        return fileServer.checkin(id);
//return new FileToView();
    }
    @PostMapping("checkout")
    public  String checkout(@RequestBody int id) throws UnsupportedEncodingException, FileNotFoundException {System.out.println("asd");
        return fileServer.checkout(id);
//return new FileToView();
    }

    @PostMapping("editefile")
    public  String EditeFile(@RequestBody FileToView fileToView) throws IOException {return fileServer.EditeFile(fileToView);}
}
