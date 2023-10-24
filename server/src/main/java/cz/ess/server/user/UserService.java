package cz.ess.server.user;

import cz.ess.server.user.dto.User;
import cz.ess.server.user.model.UserEntity;
import cz.ess.server.user.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<User> loginUser(String username, String pwd) {
        Optional<UserEntity> foundUser = userRepository.findByEmail(username);

        if (foundUser.isEmpty()) {
            throw new RuntimeException(String.format("User %s not exist", username));
        }

        User user = User.fromEntity(foundUser.get());


        return null;
    }
}
