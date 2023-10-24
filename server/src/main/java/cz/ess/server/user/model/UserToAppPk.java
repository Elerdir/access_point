package cz.ess.server.user.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Objects;

@Getter
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class UserToAppPk implements Serializable  {

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "app_id")
    private Long appId;

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        UserToAppPk that = (UserToAppPk) o;
        return userId == that.userId &&
                appId == that.appId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, appId);
    }
}
