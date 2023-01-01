package Home.Files;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
@Entity
public class SysFile {
    @Id
    @GeneratedValue
    private int id;

    private String FileName;

    public String getActiveuser() {
        return activeuser;
    }

    public void setActiveuser(String activeuser) {
        this.activeuser = activeuser;
    }

    private String Owner;
    private String activeuser;

    private int Owner_id;

    public int getOwner_id() {
        return Owner_id;
    }

    public void setOwner_id(int owner_id) {
        Owner_id = owner_id;
    }



    private boolean isfree;
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFileName() {
        return FileName;
    }

    public void setFileName(String fileName) {
        FileName = fileName;
    }

    public String getOwner() {
        return Owner;
    }

    public void setOwner(String owner) {
        Owner = owner;
    }

    public boolean isIsfree() {
        return isfree;
    }

    public void setIsfree(boolean isfree) {
        this.isfree = isfree;
    }


}
