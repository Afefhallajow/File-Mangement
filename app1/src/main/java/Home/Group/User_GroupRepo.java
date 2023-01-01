package Home.Group;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface User_GroupRepo extends JpaRepository<User_Group,String> {

}
