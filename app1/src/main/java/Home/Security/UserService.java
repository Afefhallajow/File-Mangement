package Home.Security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Service
public class UserService implements UserDetailsService {
    @Autowired
    Userrepository userrepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser user =userrepository.findByUsername(username);
System.out.println("load user");
        return new User(user.getUsername(),user.getPassword(),new ArrayList<>());

    }

    public AppUser save(AppUser user)
    {
        return userrepository.save(user);
    }
    public List<AppUser> findall()
    {
        return userrepository.findAll();

    }
}
