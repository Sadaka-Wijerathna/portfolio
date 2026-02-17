@echo off
echo ========================================
echo   Starting Portfolio Web Server
echo ========================================
echo.
echo Your portfolio will open at: http://localhost:8000
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.

cd /d "%~dp0"

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Python is not installed or not in PATH
    echo.
    echo Please install Python from: https://www.python.org/downloads/
    echo.
    pause
    exit /b 1
)

REM Start Python HTTP server and open browser
start http://localhost:8000
python -m http.server 8000

pause
