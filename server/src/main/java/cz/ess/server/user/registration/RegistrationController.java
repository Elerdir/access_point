package cz.ess.server.user.registration;

import cz.ess.server.user.dto.User;
import cz.ess.server.user.registration.exchange.RegistrationRequest;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/registration")
public class RegistrationController {

    private final RegistrationService registrationService;

    public RegistrationController(RegistrationService registrationService) {
        this.registrationService = registrationService;
    }

    @PostMapping
    public User registration(@RequestBody RegistrationRequest registrationRequest) {
        return registrationService.registration(registrationRequest);
    }
}
