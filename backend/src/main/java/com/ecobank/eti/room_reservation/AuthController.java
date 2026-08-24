package com.ecobank.eti.room_reservation;

import jakarta.validation.Valid;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
class AuthController {
    private final AuthenticationManager authenticationManager;
    private final UserRepository users;
    private final TokenService tokens;

    AuthController(AuthenticationManager authenticationManager, UserRepository users, TokenService tokens) {
        this.authenticationManager = authenticationManager; this.users = users; this.tokens = tokens;
    }

    @PostMapping("/login")
    LoginResponse login(@Valid @RequestBody LoginRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.email(), request.password()));
        UserEntity user = users.findByEmailIgnoreCase(request.email()).orElseThrow();
        return new LoginResponse(tokens.issue(user), view(user));
    }

    @GetMapping("/me")
    UserView me(Authentication authentication) {
        return users.findByEmailIgnoreCase(authentication.getName()).map(AuthController::view).orElseThrow();
    }

    static UserView view(UserEntity user) {
        return new UserView(user.id, user.email, user.fullName, user.primaryRole().name(), user.language, user.active);
    }
}
