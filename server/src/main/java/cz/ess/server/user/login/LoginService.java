package cz.ess.server.user.login;

import cz.ess.server.jwt.JwtTokenService;
import cz.ess.server.user.UserService;
import cz.ess.server.user.dto.User;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LoginService {

    private final JwtTokenService jwtTokenService;
    private final UserService userService;

    public LoginService(JwtTokenService jwtTokenService, UserService userService) {
        this.jwtTokenService = jwtTokenService;
        this.userService = userService;
    }

    public User login(String username, String pwd) {
        // TODO kontrola hesla

        Optional<User> foundUser = userService.loginUser(username, pwd);

        if (foundUser.isEmpty()) {
            throw new RuntimeException(String.format("User `%s` not found.", username));
        }

        User user = foundUser.get();


        String token = jwtTokenService.getJWTToken(username, user.isAdministration());

        return user.toBuilder().token(token).build();

    }
}
