package cz.ess.server.user.dto;

import cz.ess.server.user.model.UserEntity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.util.Collection;
import java.util.stream.Collectors;

@Getter
@Builder(toBuilder = true)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class User {

    private Long id;

    private String password;

    private String email;

    private String firstName;

    private String lastName;

    private LocalDate birthday;

    private boolean administration;

    private String token;

    private boolean needChangePassword;

    private Collection<UserToApp> userToApps;

    public Collection<User> fromEntities(Collection<UserEntity> userEntities) {
        return userEntities.stream()
                .map(User::fromEntity)
                .collect(Collectors.toList());
    }

    public static User fromEntity(UserEntity user) {
        return User.builder()
                .id(user.getId())
                .password(user.getPassword())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .birthday(user.getBirthday())
                .administration(user.isAdministration())
                .userToApps(UserToApp.fromEntities(user.getUserToApps()))
                .build();
    }
}
