package com.ecobank.eti.room_reservation;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.IOException;
import java.nio.file.*;
import java.util.*;

@Service
class RoomPhotoStorage {
    static final String DEFAULT_PHOTO = "/assets/rooms/meeting.svg";
    private static final String PUBLIC_PREFIX = "/api/uploads/rooms/";
    private static final long MAX_BYTES = 5L * 1024 * 1024;
    private static final Map<String, String> EXTENSIONS = Map.of(
            "image/png", ".png", "image/jpeg", ".jpg", "image/webp", ".webp");
    private static final Set<String> BUILT_IN_PHOTOS = Set.of(
            "/assets/rooms/meeting.svg", "/assets/rooms/auditorium.svg", "/assets/rooms/boardroom.svg",
            "/assets/rooms/banquet.svg", "/assets/rooms/hall.svg", "/assets/rooms/vip.svg");

    private final Path roomDirectory;

    RoomPhotoStorage(@Value("${app.upload-dir:uploads}") String uploadDirectory) {
        this.roomDirectory = Paths.get(uploadDirectory).toAbsolutePath().normalize().resolve("rooms");
    }

    String store(MultipartFile file) {
        if (file == null || file.isEmpty()) throw new IllegalArgumentException("Sélectionnez une photo");
        if (file.getSize() > MAX_BYTES) throw new IllegalArgumentException("La photo ne doit pas dépasser 5 Mo");
        String contentType = Optional.ofNullable(file.getContentType()).orElse("").toLowerCase(Locale.ROOT);
        String extension = EXTENSIONS.get(contentType);
        if (extension == null) throw new IllegalArgumentException("Format non accepté : utilisez PNG, JPEG ou WebP");
        String filename = UUID.randomUUID() + extension;
        try {
            Files.createDirectories(roomDirectory);
            Path target = roomDirectory.resolve(filename).normalize();
            if (!target.startsWith(roomDirectory)) throw new IllegalArgumentException("Nom de fichier invalide");
            try (var input = file.getInputStream()) {
                Files.copy(input, target, StandardCopyOption.REPLACE_EXISTING);
            }
            return PUBLIC_PREFIX + filename;
        } catch (IOException ex) {
            throw new IllegalStateException("Impossible d’enregistrer la photo", ex);
        }
    }

    String normalizeRequestedUrl(String requested) {
        if (requested == null || requested.isBlank()) return DEFAULT_PHOTO;
        String value = requested.trim();
        if (BUILT_IN_PHOTOS.contains(value) || isManaged(value)) return value;
        throw new IllegalArgumentException("Adresse de photo non autorisée");
    }

    void deleteManaged(String url) {
        if (!isManaged(url)) return;
        String filename = url.substring(PUBLIC_PREFIX.length());
        Path target = roomDirectory.resolve(filename).normalize();
        if (!target.startsWith(roomDirectory)) return;
        try {
            Files.deleteIfExists(target);
        } catch (IOException ex) {
            throw new IllegalStateException("Impossible de supprimer la photo", ex);
        }
    }

    private boolean isManaged(String url) {
        return url != null && url.startsWith(PUBLIC_PREFIX)
                && !url.substring(PUBLIC_PREFIX.length()).contains("/")
                && !url.substring(PUBLIC_PREFIX.length()).contains("\\");
    }
}

@Configuration
class UploadResourceConfiguration implements WebMvcConfigurer {
    private final Path uploadDirectory;

    UploadResourceConfiguration(@Value("${app.upload-dir:uploads}") String uploadDirectory) {
        this.uploadDirectory = Paths.get(uploadDirectory).toAbsolutePath().normalize();
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        String location = uploadDirectory.toUri().toString();
        if (!location.endsWith("/")) location += "/";
        registry.addResourceHandler("/uploads/**").addResourceLocations(location);
    }
}
