package Home.Group;

import Home.Files.SysFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GroupRepo extends JpaRepository<MyGroup,String> {
    Optional<MyGroup> findById(int id);
}
