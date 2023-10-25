package cz.ess.server.jwt.model;

import cz.ess.server.jwt.dto.JwtToken;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

import java.util.Collection;
import java.util.stream.Collectors;

@Entity
@Getter
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Table(name = "jwt_token", schema = "app")
public class JwtTokenEntity {

    @Id
    private String token;

    private String username;

    private boolean admin;

    public static Collection<JwtTokenEntity> fromDtos(Collection<JwtToken> jwtTokens) {
        return jwtTokens.stream()
                .map(JwtTokenEntity::fromDto)
                .collect(Collectors.toList());
    }

    public static JwtTokenEntity fromDto(JwtToken jwtToken) {
        return JwtTokenEntity.builder()
                .token(jwtToken.getToken())
                .username(jwtToken.getUsername())
                .admin(jwtToken.isAdmin())
                .build();
    }
}
