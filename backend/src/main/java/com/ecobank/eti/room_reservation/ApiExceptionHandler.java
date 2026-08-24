package com.ecobank.eti.room_reservation;

import org.springframework.http.*;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.resource.NoResourceFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.time.LocalDateTime;
import java.util.*;

@RestControllerAdvice
class ApiExceptionHandler {
    private static final Logger LOG = LoggerFactory.getLogger(ApiExceptionHandler.class);
    record ErrorResponse(LocalDateTime timestamp, int status, String code, String message, Map<String,String> fields) {}

    @ExceptionHandler(MethodArgumentNotValidException.class)
    ResponseEntity<ErrorResponse> validation(MethodArgumentNotValidException ex) {
        Map<String,String> fields = new LinkedHashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(e -> fields.putIfAbsent(e.getField(), e.getDefaultMessage()));
        return response(HttpStatus.BAD_REQUEST, "VALIDATION_ERROR", "Certaines données sont invalides", fields);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    ResponseEntity<ErrorResponse> unreadableJson(HttpMessageNotReadableException ex) {
        return response(HttpStatus.BAD_REQUEST, "INVALID_JSON", "Le contenu de la requête est illisible", Map.of());
    }

    @ExceptionHandler(BadCredentialsException.class)
    ResponseEntity<ErrorResponse> credentials(BadCredentialsException ex) {
        return response(HttpStatus.UNAUTHORIZED, "INVALID_CREDENTIALS", "Adresse e-mail ou mot de passe incorrect", Map.of());
    }

    @ExceptionHandler(AccessDeniedException.class)
    ResponseEntity<ErrorResponse> forbidden(AccessDeniedException ex) {
        return response(HttpStatus.FORBIDDEN, "ACCESS_DENIED", message(ex, "Accès refusé"), Map.of());
    }

    @ExceptionHandler(NoSuchElementException.class)
    ResponseEntity<ErrorResponse> notFound(NoSuchElementException ex) {
        return response(HttpStatus.NOT_FOUND, "NOT_FOUND", message(ex, "Ressource introuvable"), Map.of());
    }

    @ExceptionHandler(NoResourceFoundException.class)
    ResponseEntity<ErrorResponse> missingResource(NoResourceFoundException ex) {
        return response(HttpStatus.NOT_FOUND, "NOT_FOUND", "Ressource introuvable", Map.of());
    }

    @ExceptionHandler(IllegalArgumentException.class)
    ResponseEntity<ErrorResponse> business(IllegalArgumentException ex) {
        return response(HttpStatus.BAD_REQUEST, "BUSINESS_RULE", message(ex, "Opération impossible"), Map.of());
    }

    @ExceptionHandler(IllegalStateException.class)
    ResponseEntity<ErrorResponse> conflict(IllegalStateException ex) {
        return response(HttpStatus.CONFLICT, "INVALID_STATE", message(ex, "État incompatible avec cette action"), Map.of());
    }

    @ExceptionHandler(Exception.class)
    ResponseEntity<ErrorResponse> unexpected(Exception ex) {
        LOG.error("Erreur API inattendue", ex);
        return response(HttpStatus.INTERNAL_SERVER_ERROR, "INTERNAL_ERROR",
                "Une erreur technique est survenue. Veuillez réessayer.", Map.of());
    }

    private String message(Throwable ex, String fallback) { return ex.getMessage() == null ? fallback : ex.getMessage(); }
    private ResponseEntity<ErrorResponse> response(HttpStatus status, String code, String message, Map<String,String> fields) {
        return ResponseEntity.status(status).body(new ErrorResponse(LocalDateTime.now(), status.value(), code, message, fields));
    }
}
