package cz.ess.server.jwt.repository;

import cz.ess.server.jwt.model.JwtTokenEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JwtTokenRepository extends JpaRepository<JwtTokenEntity, String> {
}
