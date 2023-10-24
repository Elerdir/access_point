package cz.ess.server.user.dto;

import cz.ess.server.user.model.UserToAppEntity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.Collection;
import java.util.stream.Collectors;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class UserToApp {

    private int userId;

    private int appId;

    public static Collection<UserToApp> fromEntities(Collection<UserToAppEntity> userToApps) {
        return userToApps.stream()
                .map(UserToApp::fromEntity)
                .collect(Collectors.toList());
    }

    public static UserToApp fromEntity(UserToAppEntity userToApps) {
        return UserToApp.builder()
                .userId(userToApps.getUserToAppPk().getUserId())
                .appId(userToApps.getUserToAppPk().getAppId())
                .build();
    }
}
