@echo off
echo Starting FlowMind AI Services...

echo.
echo Starting Database Services...
docker-compose up mongodb redis -d

echo.
echo Starting Backend API...
start "Backend API" cmd /k "cd backend && venv\Scripts\activate && python app.py"

echo.
echo Starting Frontend...
start "Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo All services are starting...
echo.
echo Access your application at:
echo - Frontend: http://localhost:5173
echo - Backend API: http://localhost:5000
echo.
pause
