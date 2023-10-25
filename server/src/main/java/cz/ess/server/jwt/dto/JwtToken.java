package cz.ess.server.jwt.dto;

import cz.ess.server.jwt.model.JwtTokenEntity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.Collection;
import java.util.stream.Collectors;

@Getter
@Builder(toBuilder = true)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class JwtToken {

    private String token;

    private String username;

    private boolean admin;

    public static Collection<JwtToken> fromEntities(Collection<JwtTokenEntity> jwtTokens) {
        return jwtTokens.stream()
                .map(JwtToken::fromEntity)
                .collect(Collectors.toList());
    }

    public static JwtToken fromEntity(JwtTokenEntity jwtToken) {
        return JwtToken.builder()
                .token(jwtToken.getToken())
                .username(jwtToken.getUsername())
                .admin(jwtToken.isAdmin())
                .build();
    }
}
