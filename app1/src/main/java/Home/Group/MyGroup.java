package Home.Group;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class MyGroup {

    public MyGroup(int id, String name, String owner) {
        this.id=id;
        this.name = name;
        this.owner = owner;
    }

    public MyGroup() {
    }

    @Id
    @GeneratedValue
    int id ;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    String name;
    String owner;

}
