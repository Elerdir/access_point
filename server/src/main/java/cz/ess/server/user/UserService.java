package cz.ess.server.user;

import cz.ess.server.app.AppService;
import cz.ess.server.app.dto.App;
import cz.ess.server.user.dto.User;
import cz.ess.server.user.exchange.UserListResponse;
import cz.ess.server.user.model.UserEntity;
import cz.ess.server.user.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    private final AppService appService;

    public UserService(UserRepository userRepository, AppService appService) {
        this.userRepository = userRepository;
        this.appService = appService;
    }

    public Optional<User> loginUser(String username, String pwd) {
        Optional<UserEntity> foundUser = userRepository.findByEmail(username);

        if (foundUser.isEmpty()) {
            throw new RuntimeException(String.format("User %s not exist", username));
        }

        User user = User.fromEntity(foundUser.get());


        return user.getPassword().equals(pwd) ? Optional.of(user) : Optional.empty();
    }

    public UserListResponse getAllUsersForAdmin(String authorization) {
        if (authorization.isEmpty()) {
            throw new RuntimeException("Access denided.");
        }

        Collection<App> allApps = appService.getAllApps();
        Collection<User> allUsers = User.fromEntities(userRepository.findAll());

        return UserListResponse.builder()
                .users(allUsers)
                .apps(allApps)
                .build();
    }
}
