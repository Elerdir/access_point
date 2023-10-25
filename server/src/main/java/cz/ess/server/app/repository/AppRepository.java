package cz.ess.server.app.repository;

import cz.ess.server.app.model.AppEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.Optional;

public interface AppRepository extends JpaRepository<AppEntity, Long> {
    Collection<AppEntity> findAllByDefaultApp();

    Optional<AppEntity> findByAppName(String appName);
}
