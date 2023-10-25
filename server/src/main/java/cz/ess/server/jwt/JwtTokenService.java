package cz.ess.server.jwt;

import cz.ess.server.jwt.dto.JwtToken;
import cz.ess.server.jwt.model.JwtTokenEntity;
import cz.ess.server.jwt.repository.JwtTokenRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class JwtTokenService {

    private final JwtTokenRepository jwtTokenRepository;

    public JwtTokenService(JwtTokenRepository jwtTokenRepository) {
        this.jwtTokenRepository = jwtTokenRepository;
    }

    public void addToken(String token, String username, boolean admin) {
        JwtToken jwtToken = JwtToken.builder()
                .token(token)
                .username(username)
                .admin(admin)
                .build();

        jwtTokenRepository.saveAndFlush(JwtTokenEntity.fromDto(jwtToken));
    }

    public void deleteToken(String token) {
        Optional<JwtTokenEntity> foundToken = jwtTokenRepository.findById(token);

        if (foundToken.isEmpty()) {
            return;
        }

        jwtTokenRepository.deleteById(token);
        jwtTokenRepository.flush();
    }

    public Optional<JwtToken> checkTokenExists(String token) {
        Optional<JwtTokenEntity> foundToken = jwtTokenRepository.findById(token);

        return foundToken.map(JwtToken::fromEntity);

    }

    public String generateJwtToken(String username, boolean isAdmin) {
        String secretKey = "mySecretKey";
        List<GrantedAuthority> grantedAuthorities = AuthorityUtils
                .commaSeparatedStringToAuthorityList(isAdmin ? "ROLE_ADMIN" : "ROLE_USER");

        String token = "Bearer" + Jwts
                .builder()
                .setId("ap")
                .setSubject(username)
                .claim("authorities",
                        grantedAuthorities.stream()
                                .map(GrantedAuthority::getAuthority)
                                .collect(Collectors.toList()))
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 600000))
                .signWith(SignatureAlgorithm.HS512,
                        secretKey.getBytes()).compact();

        addToken(token, username, isAdmin);

        return token;
    }
}
