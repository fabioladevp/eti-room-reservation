# ETI — Gestion des salles de réunion

Application académique full-stack permettant de créer, assigner, valider et suivre les réservations des 14 salles officielles d’Ecobank Transnational Incorporated à Lomé.

Cette livraison fonctionne localement avec **XAMPP/MySQL, Java 21 et Angular CLI**.

## Prérequis Windows

- XAMPP avec MySQL/MariaDB et phpMyAdmin ;
- JDK 21 (`java -version`) ;
- Node.js 22 ou version LTS compatible (`node --version`) ;
- ports libres : `3306` pour MySQL, `8080` pour Spring Boot et `4200` pour Angular.

## Démarrage rapide avec XAMPP

1. Vous pouvez démarrer **MySQL** depuis le panneau XAMPP. S’il est arrêté, le lanceur tente aussi de le démarrer automatiquement depuis `C:\xamppnew`, `C:\xampp` ou `C:\xampp5`. Apache est facultatif ; il sert uniquement à ouvrir phpMyAdmin.
2. Dans phpMyAdmin (`http://localhost/phpmyadmin`), créer une base vide nommée `eti_rooms` avec l’interclassement `utf8mb4_unicode_ci`.
3. À la racine du projet, double-cliquer sur `LANCER_XAMPP_WINDOWS.cmd`.
4. Attendre le démarrage des deux fenêtres, puis ouvrir `http://localhost:4200`.

Le script vérifie Java et npm, démarre MySQL XAMPP si nécessaire, attend que le port `3306` soit prêt, installe les dépendances Angular si nécessaire, puis lance Spring Boot et Angular. Flyway crée automatiquement toutes les tables et les données de démonstration.

Le lanceur peut être exécuté plusieurs fois sans créer de doublon : si MySQL, le backend ou le frontend sont déjà actifs, il les conserve et affiche simplement qu’ils sont déjà démarrés.

### Réparer une première migration interrompue

Si Flyway s’est arrêté pendant la toute première création de `eti_rooms`, la base peut contenir des tables incomplètes. Comme cette base vient d’être créée et ne contient pas encore de réservations, la réinitialiser dans phpMyAdmin avant de relancer l’application :

```sql
DROP DATABASE IF EXISTS eti_rooms;
CREATE DATABASE eti_rooms CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Cette commande supprime tout le contenu actuel de `eti_rooms`. Ne pas l’utiliser sur une base contenant des données à conserver.

## Démarrage manuel

### 1. Base XAMPP

Dans le panneau XAMPP, démarrer MySQL. La configuration par défaut correspond à une installation XAMPP classique :

```text
Hôte : localhost
Port : 3306
Base : eti_rooms
Utilisateur : root
Mot de passe : vide
```

Si votre compte MySQL possède un mot de passe, définir `DB_PASSWORD` dans la configuration d’exécution IntelliJ ou dans le terminal avant le lancement. Les paramètres disponibles sont documentés dans `.env.example`.

### 2. Back-end Spring Boot

Avec IntelliJ IDEA :

1. ouvrir le fichier `backend/pom.xml` comme projet Maven ;
2. sélectionner le JDK 21 ;
3. exécuter `RoomReservationApplication`.

Ou dans PowerShell, depuis la racine :

```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

### 3. Front-end Angular

Dans un second terminal PowerShell :

```powershell
cd frontend
npm.cmd ci
npm.cmd start
```

Le fichier `frontend/proxy.conf.json` redirige automatiquement `/api` vers Spring Boot sur `http://localhost:8080`.

### Ouvrir l’application depuis un autre ordinateur

`http://localhost:4200` fonctionne uniquement sur l’ordinateur qui exécute l’application. Sur le même réseau local, utiliser `http://ADRESSE-IP-DU-PC:4200` et autoriser Node.js dans le pare-feu Windows. Pour partager l’application sur Internet, il faut la déployer sur un serveur avec un domaine et HTTPS ; il ne faut pas exposer directement les serveurs de développement Angular et Spring Boot.

## Adresses utiles

| Service | Adresse |
|---|---|
| Application Angular | http://localhost:4200 |
| API Spring Boot | http://localhost:8080/api |
| Swagger / OpenAPI | http://localhost:8080/api/swagger-ui.html |
| Santé de l’API | http://localhost:8080/api/actuator/health |
| phpMyAdmin XAMPP | http://localhost/phpmyadmin |

## Comptes de démonstration

Mot de passe commun : `Ecobank-demo-2026!`

| Rôle | Adresse e-mail |
|---|---|
| Demandeur | `amelie.koffi@ecobank.com` |
| Administrateur | `admin.rooms@ecobank.com` |
| Personnel IT | `it.rooms@ecobank.com` |
| Facility | `facility.rooms@ecobank.com` |

Ces comptes sont créés seulement lorsque `app.demo-data-enabled=true`. Ils doivent être remplacés et désactivés avant une mise en production.

## Gestion des utilisateurs

Dans **Administration → Utilisateurs**, l’administrateur peut :

- créer un compte avec nom, e-mail, mot de passe initial, rôle, langue et état ;
- modifier l’identité, le rôle, la langue, l’état et éventuellement renouveler le mot de passe ;
- supprimer un compte neuf sans historique ;
- archiver automatiquement un compte lié à des réservations, validations ou notifications afin de préserver l’intégrité et l’audit.

Un administrateur ne peut pas supprimer son propre compte, ni désactiver ou rétrograder le dernier administrateur actif.

## Architecture

- `backend/` : application Spring Boot, migrations Flyway, tests Maven, photos téléversées et fichiers générés ;
- `frontend/` : application Angular, ressources visuelles et tests TypeScript ;
- Back-end : Java 21, Spring Boot 4.1.0, Spring MVC, JPA/Hibernate, Spring Security, JWT, Jakarta Validation, Actuator et OpenAPI.
- Base locale : MySQL/MariaDB de XAMPP, initialisée et versionnée par Flyway.
- Front-end : Angular 21, TypeScript strict, composants standalone, Reactive Forms, guards par rôle et interceptor JWT.
- Exports : Excel avec Apache POI et PDF avec OpenPDF.
- Fuseau métier : `Africa/Lome`.

Le demandeur ne choisit jamais la salle. Une demande multi-jours produit une occurrence par jour sélectionné. L’administrateur voit toujours les 14 salles lors de la vérification, avec les raisons d’incompatibilité. L’assignation verrouille les données et revalide toutes les occurrences dans une transaction.

## Données officielles et arbitrages

La liste officielle des salles et équipements prévaut sur le rapport. Les 14 salles sont réparties entre Académie, PAC et Grand bâtiment. La climatisation est fixe dans toutes les salles. Le tableau blanc et le projecteur amovible sont gérés comme équipements mobiles.

Les prestataires externes et la réservation combinée d’espaces mentionnés dans le rapport sont exclus conformément au cahier des charges prioritaire. Les capacités et temps de battement sont initialisés avec les valeurs de démonstration et restent modifiables par l’administration.

## Envoi de vrais e-mails

Par défaut, `MAIL_ENABLED=false` : les notifications sont enregistrées dans l’application, mais aucun message n’est envoyé sur Internet. Pour effectuer de vrais envois, configurer un compte SMTP autorisé dans l’environnement de lancement :

```text
MAIL_ENABLED=true
MAIL_HOST=smtp.office365.com
MAIL_PORT=587
MAIL_USERNAME=compte-expediteur@example.com
MAIL_PASSWORD=mot-de-passe-ou-secret-application
MAIL_AUTH=true
MAIL_STARTTLS=true
MAIL_FROM=compte-expediteur@example.com
```

Utiliser les paramètres fournis par le service informatique ou le fournisseur de messagerie. Pour Gmail, employer un mot de passe d’application et `smtp.gmail.com`. Le destinataire est l’adresse enregistrée dans son compte utilisateur ETI. Une erreur SMTP n’annule jamais la réservation ni sa notification interne.

## Compilation et tests

```powershell
cd backend
.\mvnw.cmd test
.\mvnw.cmd package
cd ..
cd frontend
npm.cmd ci
npm.cmd test
npm.cmd run build
```

Dernière validation de la livraison :

- compilation Java réussie avec Java `21.0.11` et Spring Boot `4.1.0` ;
- `9` tests Spring réussis, aucun échec ;
- `2` tests Angular réussis, aucun échec ;
- build Angular de production réussi ;
- audit npm : aucune vulnérabilité ;
- JAR créé dans `backend/target/room-reservation-1.0.0.jar`.

## Photos et identité visuelle

Le bandeau et la page de connexion utilisent une copie locale du logo vectoriel publié sur le site officiel Ecobank. Les photos de salles officielles n’ayant pas été fournies, des illustrations SVG locales et neutres sont utilisées sans URL externe.

## Limites connues de la version académique

- le schéma prend en charge plusieurs photos par salle, mais l’écran de démonstration emploie les visuels locaux livrés ;
- la structure d’assignation prioritaire existe, sans assistant dédié de recherche automatique d’une salle de remplacement ;
- l’interface est en français, avec notifications et e-mails bilingues selon la langue du destinataire ;
- aucun SSO bancaire ni annuaire d’entreprise n’est connecté ;
- le planning est rafraîchi par API et non par WebSocket.

## Sécurité avant production

- remplacer tous les secrets et définir un `JWT_SECRET` long et unique ;
- désactiver les comptes de démonstration et `app.demo-data-enabled` ;
- créer un utilisateur MySQL dédié avec des droits limités au lieu de `root` ;
- limiter CORS au domaine réel et utiliser TLS ;
- conserver les migrations Flyway existantes et créer une nouvelle migration pour chaque évolution.
