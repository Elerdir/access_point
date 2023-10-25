package cz.ess.server.app.exchange;

import cz.ess.server.app.dto.App;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.Collection;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class AppResponse {

    Collection<App> allApps;
}
