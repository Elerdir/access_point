package cz.ess.server.app;

import cz.ess.server.app.dto.App;
import cz.ess.server.app.exchange.AppResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/app")
public class AppController {

    private final AppService appService;

    public AppController(AppService appService) {
        this.appService = appService;
    }

    @GetMapping()
    public App getApp(@RequestBody Long appId) {
        return appService.getApp(appId);
    }

    @GetMapping("/list")
    public AppResponse getAllApps() {
        return AppResponse.builder()
                .allApps(appService.getAllApps())
                .build();
    }

    @PostMapping
    public void addApp(@RequestBody App app, @RequestHeader(HttpHeaders.AUTHORIZATION) String authorization) {
        appService.addApp(app, authorization);
    }

    @PatchMapping
    public void updateApp(@RequestBody App app, @RequestHeader(HttpHeaders.AUTHORIZATION) String authorization) {
        appService.updateApp(app, authorization);
    }

    @DeleteMapping
    public void deleteApp(@RequestBody Long appId, @RequestHeader(HttpHeaders.AUTHORIZATION) String authorization) {
        appService.deleteApp(appId, authorization);
    }
}
