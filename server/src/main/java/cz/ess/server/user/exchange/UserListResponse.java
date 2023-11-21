package cz.ess.server.user.exchange;

import cz.ess.server.app.dto.App;
import cz.ess.server.user.dto.User;
import lombok.*;

import java.util.Collection;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class UserListResponse {

    Collection<User> users;

    Collection<App> apps;
}
