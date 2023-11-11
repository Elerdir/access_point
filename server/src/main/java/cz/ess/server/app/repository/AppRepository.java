package cz.ess.server.app.repository;

import cz.ess.server.app.model.AppEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface AppRepository extends JpaRepository<AppEntity, Long> {
    Collection<AppEntity> findAllByDefaultApp(boolean def);

    Optional<AppEntity> findByAppName(String appName);
}
