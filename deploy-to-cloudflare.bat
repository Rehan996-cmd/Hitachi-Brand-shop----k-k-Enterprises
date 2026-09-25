@echo off
title Cloudflare Pages One-Click Deployment
color 0B
echo ========================================================
echo       HOTEL SHIVANSH - CLOUDFLARE PAGES DEPLOYMENT
echo ========================================================
echo.
echo Step 1: Logging in to Cloudflare...
echo (Your browser will open. Please click "Allow" to authenticate)
echo.
call npx wrangler login
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] Login failed or was cancelled.
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo ========================================================
echo Step 2: Deploying website to Cloudflare Pages...
echo ========================================================
echo.
call npx wrangler pages deploy public --project-name=hotel-shivansh

echo.
echo ========================================================
echo Deployment finished! You can close this window.
echo ========================================================
pause
