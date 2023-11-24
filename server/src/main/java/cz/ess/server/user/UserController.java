package cz.ess.server.user;

import cz.ess.server.user.exchange.ChangeUserPasswordRequest;
import cz.ess.server.user.exchange.UserListResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@CrossOrigin("*")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/all")
    public UserListResponse getAllUsersForAdmin(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorization) {
        return userService.getAllUsersForAdmin(authorization);
    }

    @PostMapping("/change-password")
    @ResponseStatus(HttpStatus.OK)
    public void changePassword(@RequestBody ChangeUserPasswordRequest changeUserPasswordRequest)
    {
        userService.changePassword(changeUserPasswordRequest);
    }
}
