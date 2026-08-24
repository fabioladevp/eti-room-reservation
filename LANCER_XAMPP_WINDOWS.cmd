@echo off
setlocal EnableExtensions EnableDelayedExpansion
title ETI - Gestion des salles avec XAMPP
cd /d "%~dp0"

where java >nul 2>nul
if errorlevel 1 (
  echo [ERREUR] Java 21 n'est pas accessible dans le PATH.
  pause
  exit /b 1
)

where npm.cmd >nul 2>nul
if errorlevel 1 (
  echo [ERREUR] Node.js et npm ne sont pas accessibles dans le PATH.
  pause
  exit /b 1
)

if not exist "backend\mvnw.cmd" (
  echo [ERREUR] Le dossier backend ou le lanceur Maven est introuvable.
  pause
  exit /b 1
)

set "XAMPP_ROOT="
if exist "C:\xamppnew\mysql_start.bat" set "XAMPP_ROOT=C:\xamppnew"
if not defined XAMPP_ROOT if exist "C:\xampp\mysql_start.bat" set "XAMPP_ROOT=C:\xampp"
if not defined XAMPP_ROOT if exist "C:\xampp5\mysql_start.bat" set "XAMPP_ROOT=C:\xampp5"

call :mysql_ready
if not errorlevel 1 goto mysql_started
if not defined XAMPP_ROOT goto mysql_missing

echo MySQL n'est pas demarre. Lancement depuis %XAMPP_ROOT%...
start "XAMPP MySQL" /min cmd /k "cd /d ""%XAMPP_ROOT%"" && call mysql_start.bat"

set /a MYSQL_WAIT=0
:wait_mysql
timeout /t 1 /nobreak >nul
call :mysql_ready
if not errorlevel 1 goto mysql_started
set /a MYSQL_WAIT+=1
if !MYSQL_WAIT! LSS 30 goto wait_mysql

echo [ERREUR] MySQL n'a pas demarre sur le port 3306 apres 30 secondes.
echo Consultez la fenetre XAMPP MySQL pour connaitre la cause.
pause
exit /b 1

:mysql_missing
echo [ERREUR] Installation XAMPP introuvable.
echo Demarrez MySQL dans XAMPP, puis relancez ce fichier.
pause
exit /b 1

:mysql_started
echo MySQL est pret sur le port 3306.

if not exist "frontend\node_modules" (
  echo Installation des dependances Angular...
  pushd frontend
  call npm.cmd ci
  if errorlevel 1 (
    popd
    echo [ERREUR] Installation Angular impossible.
    pause
    exit /b 1
  )
  popd
)

call :port_ready 8080
if errorlevel 1 goto start_backend
call :api_ready
if errorlevel 1 (
  echo [ERREUR] Le port 8080 est utilise par une autre application.
  echo Fermez cette application ou liberez le port 8080, puis relancez ce fichier.
  pause
  exit /b 1
)
echo Le back-end Spring Boot est deja demarre sur le port 8080.
goto check_frontend

:start_backend
echo Demarrage du back-end Spring Boot...
start "ETI Backend" cmd /k "cd /d ""%~dp0backend"" && call mvnw.cmd spring-boot:run"

:check_frontend
call :port_ready 4200
if not errorlevel 1 (
  echo Le front-end Angular est deja demarre sur le port 4200.
  goto services_started
)
echo Demarrage du front-end Angular...
start "ETI Frontend" cmd /k "cd /d ""%~dp0frontend"" && call npm.cmd start"

:services_started
echo.
echo Application : http://localhost:4200
echo API         : http://localhost:8080/api
echo Swagger     : http://localhost:8080/api/swagger-ui.html
echo phpMyAdmin  : http://localhost/phpmyadmin
echo.
echo Attendez environ une minute avant d'ouvrir l'application.
pause
exit /b 0

:mysql_ready
call :port_ready 3306
exit /b %errorlevel%

:api_ready
powershell.exe -NoProfile -Command "try { $r=Invoke-RestMethod -Uri 'http://127.0.0.1:8080/api/actuator/health' -TimeoutSec 3; if($r.status -eq 'UP'){exit 0}; exit 1 } catch { exit 1 }" >nul 2>nul
exit /b %errorlevel%

:port_ready
netstat -ano | findstr /R /C:":%~1 .*LISTENING" >nul
exit /b %errorlevel%
