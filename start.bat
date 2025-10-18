@echo off
REM FlowMind AI - Quick Start Script for Windows

echo ================================================== 
echo        FlowMind AI - Starting Development Environment
echo ==================================================

REM Check if we're in the right directory
if not exist "backend\" (
    echo Error: Please run this script from the project root directory
    exit /b 1
)
if not exist "frontend\" (
    echo Error: Please run this script from the project root directory
    exit /b 1
)

echo.
echo Checking prerequisites...

REM Check Python
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Python not found. Please install Python 3.9+
    exit /b 1
)
echo Python found

REM Check Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Node.js not found. Please install Node.js 18+
    exit /b 1
)
echo Node.js found

echo.
echo Setting up backend...
cd backend

REM Create virtual environment if it doesn't exist
if not exist "venv\" (
    echo Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment and install dependencies
echo Activating virtual environment...
call venv\Scripts\activate.bat

if not exist "venv\installed.flag" (
    echo Installing backend dependencies...
    pip install -r requirements.txt
    echo. > venv\installed.flag
) else (
    echo Backend dependencies already installed
)

REM Check for .env file
if not exist ".env" (
    echo No .env file found. Copying from .env.example...
    copy .env.example .env
    echo Please edit backend\.env with your API keys
    pause
)

cd ..

echo.
echo Setting up frontend...
cd frontend

REM Install frontend dependencies
if not exist "node_modules\" (
    echo Installing frontend dependencies...
    call npm install
) else (
    echo Frontend dependencies already installed
)

REM Check for .env file
if not exist ".env" (
    echo No .env file found. Copying from .env.example...
    copy .env.example .env
)

cd ..

echo.
echo ==================================================
echo        Starting FlowMind AI...
echo ==================================================
echo.
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo Press Ctrl+C to stop servers
echo.

REM Start backend in new window
start "FlowMind Backend" cmd /k "cd backend && venv\Scripts\activate.bat && python app.py"

REM Wait for backend to start
timeout /t 3 /nobreak >nul

REM Start frontend in new window
start "FlowMind Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo Both servers started in separate windows!
echo Close the windows or press Ctrl+C to stop.
pause

