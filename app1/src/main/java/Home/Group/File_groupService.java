package Home.Group;

import Home.Files.FileRepo;
import Home.Files.SysFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@EnableCaching
public class File_groupService {
@Autowired
FileRepo fileRepo;
    @Cacheable(value = "Sysfiles")
public ArrayList<SysFile> sysFiles(ArrayList<File_Group> file_groups)
    {
        List<SysFile> sysFile= fileRepo.findAll();
        ArrayList<SysFile> myFiles=new ArrayList<>();
        if(!file_groups.isEmpty())
    {for (int i=0;i<file_groups.size();i++)
    {for (int j=0;j<sysFile.size();j++)
        if(file_groups.get(i).getFile_id()==sysFile.get(j).getId())
    myFiles.add(sysFile.get(j));
    }


    }
    return myFiles;
    }
}
