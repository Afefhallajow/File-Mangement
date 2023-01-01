package Home.Files;

import Home.Security.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public interface FileRepo extends JpaRepository<SysFile, String> {
    Optional<SysFile> findById(int id);
}
