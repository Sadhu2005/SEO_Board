@echo off
REM FlowMind AI - Windows Setup Script
REM This script sets up the entire FlowMind AI project on Windows

echo.
echo 🧠 FlowMind AI - Project Setup
echo ==============================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python is not installed. Please install Python 3.9 or higher.
    echo Visit: https://www.python.org/downloads/
    pause
    exit /b 1
) else (
    echo [INFO] Python is installed
)

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed. Please install Node.js 18 or higher.
    echo Visit: https://nodejs.org/
    pause
    exit /b 1
) else (
    echo [INFO] Node.js is installed
)

REM Check if Docker is installed
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [WARNING] Docker is not installed. Docker setup will not be available.
    set DOCKER_AVAILABLE=false
) else (
    echo [INFO] Docker is installed
    set DOCKER_AVAILABLE=true
)

echo.
echo Setup Options:
echo 1. Docker Setup (Recommended - includes MongoDB and Redis)
echo 2. Manual Setup (Requires MongoDB and Redis installed locally)
echo 3. Exit
echo.

set /p choice="Choose setup option (1-3): "

if "%choice%"=="1" (
    if "%DOCKER_AVAILABLE%"=="false" (
        echo [ERROR] Docker is required for option 1. Please install Docker first.
        pause
        exit /b 1
    )
    call :setup_docker
) else if "%choice%"=="2" (
    call :setup_manual
) else if "%choice%"=="3" (
    echo [INFO] Setup cancelled.
    exit /b 0
) else (
    echo [ERROR] Invalid option. Please choose 1, 2, or 3.
    pause
    exit /b 1
)

echo.
echo [INFO] Setup Complete! 🎉
echo.
echo [INFO] Next steps:
echo 1. Edit the .env files with your API keys
echo 2. Start the services:
if "%choice%"=="1" (
    echo    docker-compose up -d
) else (
    echo    Backend: cd backend ^&^& venv\Scripts\activate ^&^& python app.py
    echo    Frontend: cd frontend ^&^& npm run dev
)
echo 3. Open http://localhost:5173 in your browser
echo.
echo [INFO] For more information, check the documentation in the docs/ folder
pause
exit /b 0

:setup_manual
echo.
echo [INFO] Setting up Backend...
cd backend

REM Create virtual environment
echo [INFO] Creating Python virtual environment...
python -m venv venv

REM Activate virtual environment and install dependencies
echo [INFO] Installing Python dependencies...
call venv\Scripts\activate
pip install --upgrade pip
pip install -r requirements.txt

REM Create .env file from example
if not exist .env (
    echo [INFO] Creating .env file from template...
    copy env.example .env
    echo [WARNING] Please edit backend\.env with your API keys!
) else (
    echo [INFO] .env file already exists
)

cd ..
echo [INFO] Backend setup completed!

echo.
echo [INFO] Setting up Frontend...
cd frontend

REM Install dependencies
echo [INFO] Installing Node.js dependencies...
npm install

REM Create .env file from example
if not exist .env (
    echo [INFO] Creating .env file from template...
    copy env.example .env
    echo [WARNING] Please edit frontend\.env with your API URL!
) else (
    echo [INFO] .env file already exists
)

cd ..
echo [INFO] Frontend setup completed!
echo [WARNING] Don't forget to install and start MongoDB and Redis!
goto :eof

:setup_docker
echo.
echo [INFO] Setting up with Docker...

REM Create .env files for Docker
if not exist backend\.env (
    echo [INFO] Creating backend .env for Docker...
    copy backend\env.example backend\.env
)

if not exist frontend\.env (
    echo [INFO] Creating frontend .env for Docker...
    copy frontend\env.example frontend\.env
)

REM Build and start containers
echo [INFO] Building and starting Docker containers...
docker-compose up --build -d

echo [INFO] Docker setup completed!
echo [INFO] Services are starting up...
echo [INFO] Backend: http://localhost:5000
echo [INFO] Frontend: http://localhost:5173
goto :eof
