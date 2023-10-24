package cz.ess.server.app.dto;

import cz.ess.server.app.model.AppEntity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.Collection;
import java.util.stream.Collectors;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class App {

    private Long id;

    private String appName;

    private boolean defaultApp;

    private String url;

    public static Collection<App> fromEntities(Collection<AppEntity> apps) {
        return apps.stream()
                .map(App::fromEntity)
                .collect(Collectors.toList());
    }

    public static App fromEntity(AppEntity app) {
        return App.builder()
                .id(app.getId())
                .appName(app.getAppName())
                .defaultApp(app.isDefaultApp())
                .url(app.getUrl())
                .build();
    }
}
