package Home.Security;


import Home.Group.User_Group;
import Home.Group.User_GroupRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.Date;

@RestController
@RequestMapping(value = "/")
public class Authcontroller {
    public String username;

    TokenUtil tokenUtil =new TokenUtil();
@Autowired
    User_GroupRepo user_groupRepo;
    @Autowired
    UserService userService;
    @Autowired
    private AuthenticationManager authenticationManager;
    public JwtResponse response1;

    @GetMapping(value = "out")
    public String log(HttpServletResponse request)
    {Cookie cookie=new Cookie("Authorization",null);
        request.addCookie(cookie);

        return "logout";
    }


    @PostMapping(value = "login")
    public ResponseEntity<JwtResponse> SigneIn(@RequestBody SigneRequest signeRequest, HttpServletResponse response2)
    {

        System.out.println("sasdasdasd");
System.out.println(signeRequest.getUsername());
System.out.println(signeRequest.getPassword());
        final Authentication authentication=authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(signeRequest.getUsername(),signeRequest.getPassword()));
SecurityContextHolder.getContext().setAuthentication(authentication);
UserDetails userDetails =userService.loadUserByUsername(signeRequest.getUsername());

String token= this.tokenUtil.generatetokens(userDetails);
        System.out.println("after token");

JwtResponse jwtResponse=new JwtResponse(token);
System.out.println(token);
        Cookie cookie=new Cookie("Authorization",token);

        response2.addCookie(cookie);

ResponseEntity responseEntity=        new ResponseEntity<JwtResponse>(jwtResponse, HttpStatus.CREATED);

        return responseEntity;
                    }

    @PostMapping(value = "register")
    public String Register(@RequestBody SigneRequest signeRequest,HttpServletResponse response2) {
        AppUser user = new AppUser();
        user.setUsername(signeRequest.getUsername());
        user.setPassword(signeRequest.getPassword());
   user.setActive(false);
   user.setEmail(signeRequest.getEmail());
        user.setCreated(new Date());
        User_Group user_group=new User_Group();
        user_group.setId_group(1);

int id=        userService.save(user).getId();
        user_group.setId_user(id);
user_groupRepo.save(user_group);
        return "done";
    }
}
