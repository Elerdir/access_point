package cz.ess.server.user.registration.exchange;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class RegistrationRequest {

    private String email;

    private String password;

    private String firstName;

    private String lastName;

    private LocalDate birthday;
}
