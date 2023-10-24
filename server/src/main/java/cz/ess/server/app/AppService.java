package cz.ess.server.app;

import cz.ess.server.app.dto.App;
import cz.ess.server.app.model.AppEntity;
import cz.ess.server.app.repository.AppRepository;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Collections;

@Service
public class AppService {

    private final AppRepository appRepository;

    public AppService(AppRepository appRepository) {
        this.appRepository = appRepository;
    }

    public Collection<App> getDefaultApps() {

        Collection<AppEntity> defaultApps = appRepository.findAllByDefaultApp();

        if (defaultApps.isEmpty()) {
            return Collections.emptyList();
        }

        return App.fromEntities(defaultApps);
    }
}
