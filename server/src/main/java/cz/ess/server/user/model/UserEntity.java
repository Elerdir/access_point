package cz.ess.server.user.model;

import cz.ess.server.user.dto.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.Collection;
import java.util.stream.Collectors;

@Entity
@Getter
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Table(name = "user", schema = "app")
public class UserEntity {

    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE)
    private Long id;

    private String email;

    private String password;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "birth_date")
    private LocalDate birthDate;

    private boolean administration;

    @Column(name = "need_change_pwd")
    private boolean needChangePassword;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumns({
            @JoinColumn(name = "user_id")
            //,
            //@JoinColumn(name = "app_id")
    })
    private Collection<UserToAppEntity> userToApps;


    public static Collection<UserEntity> fromDtos(Collection<User> users) {
        return users.stream()
                .map(UserEntity::fromDto)
                .collect(Collectors.toList());
    }

    public static UserEntity fromDto(User user) {
        return UserEntity.builder()
                .id(user.getId())
                .email(user.getEmail())
                .password(user.getPassword())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .birthDate(user.getBirthday())
                .administration(user.isAdministration())
                .needChangePassword(user.isNeedChangePassword())
                .userToApps(UserToAppEntity.fromDtos(user.getUserToApps()))
                .build();
    }
}
