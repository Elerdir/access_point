package cz.ess.server.user.exchange;

import lombok.Getter;

@Getter
public class ChangeUserPasswordRequest {

    private float userId;

    private String username;

    private String originallyPassword;

    private String newPassword;
}
