package com.ecobank.eti.room_reservation;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.*;

@Service
class TokenService {
    private final ObjectMapper mapper;
    private final byte[] secret;
    private final long expirationMinutes;
    private final Base64.Encoder encoder = Base64.getUrlEncoder().withoutPadding();
    private final Base64.Decoder decoder = Base64.getUrlDecoder();

    TokenService(ObjectMapper mapper, @Value("${app.jwt-secret}") String secret,
                 @Value("${app.jwt-expiration-minutes}") long expirationMinutes) {
        this.mapper = mapper;
        this.secret = secret.getBytes(StandardCharsets.UTF_8);
        this.expirationMinutes = expirationMinutes;
    }

    String issue(UserEntity user) {
        try {
            String header = encoder.encodeToString(mapper.writeValueAsBytes(Map.of("alg", "HS256", "typ", "JWT")));
            Map<String, Object> payload = new LinkedHashMap<>();
            payload.put("sub", user.email);
            payload.put("name", user.fullName);
            payload.put("roles", user.roles.stream().map(r -> r.name.name()).toList());
            payload.put("iat", Instant.now().getEpochSecond());
            payload.put("exp", Instant.now().plusSeconds(expirationMinutes * 60).getEpochSecond());
            String body = encoder.encodeToString(mapper.writeValueAsBytes(payload));
            return header + "." + body + "." + sign(header + "." + body);
        } catch (Exception e) {
            throw new IllegalStateException("Impossible de créer le jeton", e);
        }
    }

    UsernamePasswordAuthenticationToken parse(String token) {
        try {
            String[] parts = token.split("\\.");
            if (parts.length != 3 || !constantTimeEquals(sign(parts[0] + "." + parts[1]), parts[2])) return null;
            Map<String, Object> payload = mapper.readValue(decoder.decode(parts[1]), new TypeReference<>() {});
            Number exp = (Number) payload.get("exp");
            if (exp == null || Instant.now().getEpochSecond() >= exp.longValue()) return null;
            String email = Objects.toString(payload.get("sub"), "");
            @SuppressWarnings("unchecked") List<String> roles = (List<String>) payload.getOrDefault("roles", List.of());
            return new UsernamePasswordAuthenticationToken(email, token,
                    roles.stream().map(r -> new SimpleGrantedAuthority("ROLE_" + r)).toList());
        } catch (Exception e) {
            return null;
        }
    }

    private String sign(String value) throws Exception {
        Mac mac = Mac.getInstance("HmacSHA256");
        mac.init(new SecretKeySpec(secret, "HmacSHA256"));
        return encoder.encodeToString(mac.doFinal(value.getBytes(StandardCharsets.UTF_8)));
    }

    private boolean constantTimeEquals(String a, String b) {
        return java.security.MessageDigest.isEqual(a.getBytes(StandardCharsets.UTF_8), b.getBytes(StandardCharsets.UTF_8));
    }
}
