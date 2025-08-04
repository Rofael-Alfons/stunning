@echo off
echo Starting Stunning Website Generator...
echo.

echo Checking dependencies...
echo.

REM Check and install root dependencies
if not exist "node_modules" (
    echo [Dependencies] Installing root dependencies...
    npm install
    if errorlevel 1 (
        echo Error: Failed to install root dependencies
        pause
        exit /b 1
    )
    echo [Dependencies] Root dependencies installed successfully!
    echo.
) else (
    echo [Dependencies] Root dependencies found.
)

REM Check and install backend dependencies
if not exist "backend\node_modules" (
    echo [Dependencies] Installing backend dependencies...
    cd backend
    npm install
    if errorlevel 1 (
        echo Error: Failed to install backend dependencies
        cd ..
        pause
        exit /b 1
    )
    cd ..
    echo [Dependencies] Backend dependencies installed successfully!
    echo.
) else (
    echo [Dependencies] Backend dependencies found.
)

REM Check and install frontend dependencies
if not exist "frontend\node_modules" (
    echo [Dependencies] Installing frontend dependencies...
    cd frontend
    npm install
    if errorlevel 1 (
        echo Error: Failed to install frontend dependencies
        cd ..
        pause
        exit /b 1
    )
    cd ..
    echo [Dependencies] Frontend dependencies installed successfully!
    echo.
) else (
    echo [Dependencies] Frontend dependencies found.
)

echo All dependencies are ready!
echo.

echo [1/2] Starting Backend Server...
start "Backend" cmd /k "cd backend && start-with-env.bat"

echo [2/2] Starting Frontend Server...
timeout /t 3 /nobreak > nul
start "Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo Both servers are starting up!
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:3001
echo.
echo Press any key to exit...
pause > nul