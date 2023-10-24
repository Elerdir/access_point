package cz.ess.server.core.version.dto;

import lombok.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Version {

    private String buildVersion;

    private String buildTime;
}
