package com.ecobank.eti.room_reservation;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.beans.factory.annotation.Value;

import java.util.Set;

@Configuration
class DemoDataInitializer {
    @Bean CommandLineRunner demoUsers(UserRepository users, RoleRepository roles, PasswordEncoder encoder,
                                     @Value("${app.demo-data-enabled:true}") boolean enabled) {
        return args -> {
            if (!enabled) return;
            create(users, roles, encoder, "amelie.koffi@ecobank.com", "Amélie Koffi", RoleName.USER, "fr");
            create(users, roles, encoder, "admin.rooms@ecobank.com", "Administrateur Salles", RoleName.ADMIN, "fr");
            create(users, roles, encoder, "it.rooms@ecobank.com", "Personnel IT", RoleName.IT, "fr");
            create(users, roles, encoder, "facility.rooms@ecobank.com", "Équipe Facility", RoleName.FACILITY, "en");
        };
    }

    private void create(UserRepository users, RoleRepository roles, PasswordEncoder encoder,
                        String email, String name, RoleName roleName, String language) {
        if (users.findByEmailIgnoreCase(email).isPresent()) return;
        UserEntity user = new UserEntity();
        user.email = email; user.fullName = name; user.language = language; user.active = true;
        user.passwordHash = encoder.encode("Ecobank-demo-2026!");
        user.roles = Set.of(roles.findByName(roleName).orElseThrow());
        users.save(user);
    }
}
