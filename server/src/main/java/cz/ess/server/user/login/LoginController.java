package cz.ess.server.user.login;

import cz.ess.server.user.exchange.UserResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/adm")
@RestController
@CrossOrigin("*")
public class LoginController {

    private final LoginService loginService;

    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }

    @PostMapping("/login")
    public UserResponse login(@RequestParam("user") String username, @RequestParam("password") String pwd) {
        return loginService.login(username, pwd);
    }

    @PostMapping("/logout")
    public void logout(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorization) {
        loginService.logout(authorization);
    }
}
