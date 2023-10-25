package cz.ess.server.user.login;

import cz.ess.server.app.AppService;
import cz.ess.server.jwt.JwtTokenService;
import cz.ess.server.user.UserService;
import cz.ess.server.user.dto.User;
import cz.ess.server.user.exchange.UserResponse;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LoginService {

    private final JwtTokenService jwtTokenService;
    private final UserService userService;
    private final AppService appService;

    public LoginService(JwtTokenService jwtTokenService, UserService userService, AppService appService) {
        this.jwtTokenService = jwtTokenService;
        this.userService = userService;
        this.appService = appService;
    }

    public UserResponse login(String username, String pwd) {
        Optional<User> foundUser = userService.loginUser(username, pwd);

        if (foundUser.isEmpty()) {
            throw new RuntimeException(String.format("User `%s` not found.", username));
        }

        User user = foundUser.get();

        if (!user.getPassword().equals(pwd)) {
            throw new RuntimeException("Username or password is incorrect.");
        }

        String token = jwtTokenService.generateJwtToken(username, user.isAdministration());

        return UserResponse.builder()
                .user(user.toBuilder()
                        .token(token)
                        .build())
                .apps(appService.getAllApps())
                .build();

    }

    public void logout(String authorization) {
        jwtTokenService.deleteToken(authorization);
    }
}
