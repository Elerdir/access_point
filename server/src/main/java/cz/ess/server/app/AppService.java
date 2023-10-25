package cz.ess.server.app;

import cz.ess.server.app.dto.App;
import cz.ess.server.app.model.AppEntity;
import cz.ess.server.app.repository.AppRepository;
import cz.ess.server.user.model.UserToAppEntity;
import cz.ess.server.user.repository.UserToAppRepository;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Collections;
import java.util.Optional;

@Service
public class AppService {

    private final AppRepository appRepository;

    private final UserToAppRepository userToAppRepository;

    public AppService(AppRepository appRepository, UserToAppRepository userToAppRepository) {
        this.appRepository = appRepository;
        this.userToAppRepository = userToAppRepository;
    }

    public Collection<App> getDefaultApps() {

        Collection<AppEntity> defaultApps = appRepository.findAllByDefaultApp();

        if (defaultApps.isEmpty()) {
            return Collections.emptyList();
        }

        return App.fromEntities(defaultApps);
    }

    public Collection<App> getAllApps() {
        Collection<AppEntity> allApps = appRepository.findAll();

        return App.fromEntities(allApps);
    }

    public App getApp(Long appId) {
        Optional<AppEntity> app = appRepository.findById(appId);

        return app.map(App::fromEntity).orElse(null);

    }

    public void addApp(App app, String authorization) {
        if (authorization.isEmpty()) {
            throw new RuntimeException("Access denided.");
        }

        Optional<AppEntity> foundApp = appRepository.findByAppName(app.getAppName());

        if (foundApp.isPresent()) {
            throw new RuntimeException(String.format("App %s is existing.", app.getAppName()));
        }

        appRepository.saveAndFlush(AppEntity.fromDto(app));
    }

    public void updateApp(App app, String authorization) {
        if (authorization.isEmpty()) {
            throw new RuntimeException("Access denided.");
        }

        Optional<AppEntity> foundApp = appRepository.findByAppName(app.getAppName());

        if (foundApp.isEmpty()) {
            throw new RuntimeException(String.format("App %s doesn't existing.", app.getAppName()));
        }

        App oldApp = App.fromEntity(foundApp.get());

        appRepository.saveAndFlush(AppEntity.fromDto(oldApp.toBuilder()
                        .defaultApp(app.isDefaultApp())
                        .url(app.getUrl())
                .build()));

    }

    public void deleteApp(Long appId, String authorization) {
        if (authorization.isEmpty()) {
            throw new RuntimeException("Access denided.");
        }

        Optional<AppEntity> foundApp = appRepository.findById(appId);

        if (foundApp.isEmpty()) {
            throw new RuntimeException(String.format("App doesn't existing."));
        }

        App oldApp = App.fromEntity(foundApp.get());

        Collection<UserToAppEntity> foundUsedAppForUsers = userToAppRepository.findAllByUserToAppPkAppId(oldApp.getId());

        if (!foundUsedAppForUsers.isEmpty()) {
            throw new RuntimeException(String.format("App %s is used to any users.", oldApp.getAppName()));
        }


        appRepository.deleteById(oldApp.getId());
        appRepository.flush();
    }
}
