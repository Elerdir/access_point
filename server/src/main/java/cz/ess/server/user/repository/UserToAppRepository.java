package cz.ess.server.user.repository;

import cz.ess.server.user.model.UserToAppEntity;
import cz.ess.server.user.model.UserToAppPk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public interface UserToAppRepository extends JpaRepository<UserToAppEntity, UserToAppPk> {

    Collection<UserToAppEntity> findAllByUserToAppPkAppId(Long appId);
}
