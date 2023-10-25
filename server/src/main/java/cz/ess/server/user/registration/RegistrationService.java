package cz.ess.server.user.registration;

import cz.ess.server.app.AppService;
import cz.ess.server.app.dto.App;
import cz.ess.server.jwt.JwtTokenService;
import cz.ess.server.user.dto.User;
import cz.ess.server.user.dto.UserToApp;
import cz.ess.server.user.exchange.UserResponse;
import cz.ess.server.user.model.UserEntity;
import cz.ess.server.user.registration.exchange.RegistrationRequest;
import cz.ess.server.user.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Collections;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RegistrationService {

    private final UserRepository userRepository;
    private final AppService appService;
    private final JwtTokenService jwtTokenService;

    public RegistrationService(UserRepository userRepository, AppService appService, JwtTokenService jwtTokenService) {
        this.userRepository = userRepository;
        this.appService = appService;
        this.jwtTokenService = jwtTokenService;
    }

    public UserResponse registration(RegistrationRequest registrationRequest) {

        return registr(registrationRequest, false);
    }

    public UserResponse adminRegistration(RegistrationRequest registrationRequest, String authorization) {
        if (authorization.isEmpty()) {
            throw new RuntimeException(String.format("Access denided."));
        }

        return registr(registrationRequest, true);
    }


    public UserResponse registr(RegistrationRequest registrationRequest, boolean changePwd) {
        Optional<UserEntity> foundUser = userRepository.findByEmail(registrationRequest.getEmail());

        if (foundUser.isPresent()) {
            throw new RuntimeException(String.format("User %s existing.", registrationRequest.getEmail()));
        }

        User newUser = createUser(registrationRequest, changePwd);
        userRepository.save(UserEntity.fromDto(newUser));
        userRepository.flush();

        User user = User.fromEntity(userRepository.findByEmail(registrationRequest.getEmail()).get());

        String token = jwtTokenService.generateJwtToken(registrationRequest.getEmail(), user.isAdministration());

        Collection<App> defaultApps = appService.getDefaultApps();

        if (defaultApps.isEmpty()) {
            return UserResponse.builder()
                    .user(user.toBuilder()
                            .token(token)
                            .build())
                    .apps(appService.getAllApps())
                    .build();
        }

        user = addDefaultApps(user, defaultApps);

        userRepository.save(UserEntity.fromDto(user));
        userRepository.flush();

        User currentUser = User.fromEntity(userRepository.findByEmail(registrationRequest.getEmail()).get()).toBuilder()
                .token(token)
                .build();
        return UserResponse.builder()
                .user(currentUser)
                .apps(appService.getAllApps())
                .build();
    }



    private User createUser(RegistrationRequest registrationRequest, boolean changePwd) {
        return User.builder()
                .password(registrationRequest.getPassword())
                .email(registrationRequest.getEmail())
                .firstName(registrationRequest.getFirstName())
                .lastName(registrationRequest.getLastName())
                .birthday(registrationRequest.getBirthday())
                .administration(false)
                .needChangePassword(changePwd)
                .userToApps(Collections.emptyList())
                .build();
    }

    private User addDefaultApps(User user, Collection<App> defaultApps) {
        return user.toBuilder()
                .userToApps(defaultApps.stream()
                        .map(app -> UserToApp.builder()
                                .userId(user.getId())
                                .appId(app.getId())
                                .build())
                        .collect(Collectors.toList()))
                .build();
    }
}
