@echo off
title Cloudflare Live Website Runner
color 0A
echo ========================================================
echo        HOTEL SHIVANSH - CLOUDFLARE LIVE TUNNEL
echo ========================================================
echo.
echo Starting Cloudflare Edge Tunnel for http://localhost:3000...
echo.
.\tools\cloudflared.exe tunnel --url http://localhost:3000
pause
