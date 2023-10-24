package cz.ess.server.app.repository;

import cz.ess.server.app.model.AppEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;

public interface AppRepository extends JpaRepository<AppEntity, Integer> {
    Collection<AppEntity> findAllByDefaultApp();
}
