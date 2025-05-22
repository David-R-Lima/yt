@echo off
setlocal enabledelayedexpansion

REM Load .env file manually
for /f "usebackq tokens=1,2 delims==" %%i in (".env") do (
    set %%i=%%j
)

REM Run the binary
nest-yt.exe
