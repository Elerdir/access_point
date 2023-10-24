package cz.ess.server.core.version;

import cz.ess.server.core.version.dto.Version;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class VersionService {

    private static final String DELIMETER_TIMESTAMP = "-";

    @Value("${build.version}")
    private String buildVersion;

    @Value("${build.timestamp}")
    private String buildTimestamp;

    public Version getVersion() {

        return Version.builder()
                .buildVersion(buildVersion)
                .buildTime(reformatBuildTimeStamp(buildTimestamp))
                .build();
    }

    private String reformatBuildTimeStamp(String original) {
        String date = original.split(DELIMETER_TIMESTAMP)[0];
        String time = original.split(DELIMETER_TIMESTAMP)[1];

        return String.format("%s %s", getDate(date), getTime(time));
    }

    private String getDate(String original) {
        return String.format("%s.%s.%s", original.substring(6,8), original.substring(4,6), original.substring(0,4));
    }

    private String getTime(String original) {
        return String.format("%s:%s", original.substring(0, 2), original.substring(2, 4));
    }

}
