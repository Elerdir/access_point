package cz.ess.server.user.registration;

import cz.ess.server.user.dto.User;
import cz.ess.server.user.exchange.UserResponse;
import cz.ess.server.user.registration.exchange.RegistrationRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/registration")
public class RegistrationController {

    private final RegistrationService registrationService;

    public RegistrationController(RegistrationService registrationService) {
        this.registrationService = registrationService;
    }

    @PostMapping
    public UserResponse registration(@RequestBody RegistrationRequest registrationRequest) {
        return registrationService.registration(registrationRequest);
    }

    @PostMapping("/admin")
    public UserResponse adminRegistration(@RequestBody RegistrationRequest registrationRequest,
                                  @RequestHeader(HttpHeaders.AUTHORIZATION) String authorization) {
        return registrationService.adminRegistration(registrationRequest, authorization);
    }
}
