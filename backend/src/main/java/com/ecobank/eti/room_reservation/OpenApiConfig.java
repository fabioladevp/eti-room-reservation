package com.ecobank.eti.room_reservation;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.*;
import org.springframework.context.annotation.*;

@Configuration
class OpenApiConfig {
    @Bean com.fasterxml.jackson.databind.ObjectMapper jwtObjectMapper() {
        return new com.fasterxml.jackson.databind.ObjectMapper();
    }

    @Bean OpenAPI apiDocumentation() {
        return new OpenAPI()
                .info(new Info().title("ETI Room Reservation API").version("1.0.0")
                        .description("API de réservation, validation et suivi des salles de réunion ETI"))
                .addSecurityItem(new SecurityRequirement().addList("bearerAuth"))
                .components(new io.swagger.v3.oas.models.Components().addSecuritySchemes("bearerAuth",
                        new SecurityScheme().type(SecurityScheme.Type.HTTP).scheme("bearer").bearerFormat("JWT")));
    }
}
