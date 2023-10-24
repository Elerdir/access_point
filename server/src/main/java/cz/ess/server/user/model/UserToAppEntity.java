package cz.ess.server.user.model;

import cz.ess.server.user.dto.UserToApp;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

import java.util.Collection;
import java.util.stream.Collectors;

@Entity
@Getter
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Table(name = "user_to_app", schema = "app")
public class UserToAppEntity {

    @EmbeddedId
    private UserToAppPk userToAppPk;

    public static Collection<UserToAppEntity> fromDtos(Collection<UserToApp> userToApps) {
        return userToApps.stream()
                .map(UserToAppEntity::fromDto)
                .collect(Collectors.toList());
    }

    public static UserToAppEntity fromDto(UserToApp userToApp) {
        return UserToAppEntity.builder()
                .userToAppPk(new UserToAppPk(userToApp.getUserId(), userToApp.getAppId()))
                .build();
    }
}
