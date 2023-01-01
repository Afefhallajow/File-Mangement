package Home.Security;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface Userrepository extends JpaRepository<AppUser,String> {
        AppUser findByUsername(String username);

        Optional<AppUser> findById(int id);

        }
