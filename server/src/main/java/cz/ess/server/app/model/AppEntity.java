package cz.ess.server.app.model;

import cz.ess.server.app.dto.App;
import jakarta.persistence.*;
import lombok.*;

import java.util.Collection;
import java.util.stream.Collectors;

@Entity
@Getter
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Table(name = "user", schema = "app")
public class AppEntity {

    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(name = "app_name")
    private String appName;

    @Column(name = "default_app")
    private boolean defaultApp;

    private String url;

    public static Collection<AppEntity> fromDtos(Collection<App> apps) {
        return apps.stream()
                .map(AppEntity::fromDto)
                .collect(Collectors.toList());
    }

    public static AppEntity fromDto(App app) {
        return AppEntity.builder()
                .id(app.getId())
                .appName(app.getAppName())
                .defaultApp(app.isDefaultApp())
                .url(app.getUrl())
                .build();
    }
}
