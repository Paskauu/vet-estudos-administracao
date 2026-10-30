@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>&1
if errorlevel 1 (
  echo Instale o Node.js 24 antes de abrir o site. Consulte o README.md.
  pause
  exit /b 1
)
if not exist "node_modules\vite" (
  call npm ci
  if errorlevel 1 goto :failed
)
call npm run build
if errorlevel 1 goto :failed
powershell -NoProfile -Command "Start-Process -WindowStyle Hidden -FilePath (Get-Command node).Source -ArgumentList @('scripts/serve.mjs') -WorkingDirectory (Get-Location).Path"
timeout /t 1 /nobreak >nul
start "" "http://localhost:4178/"
exit /b 0
:failed
echo Nao foi possivel preparar o site. Confira a mensagem acima.
pause
exit /b 1
