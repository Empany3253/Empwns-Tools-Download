@echo off
set VERSION=%1
if "%VERSION%"=="" (
    echo Usage: release.bat v1.0
    exit /b 1
)

echo === Empwns Tools Release %VERSION% ===

:: Copy your builds in here as they're ready
:: copy "C:\Users\phili\Desktop\Projects\Shone-Box\dist\ShoneBox-Setup.exe" "downloads\shone-box\ShoneBox-%VERSION%.exe"
:: copy "C:\Users\phili\Desktop\Projects\Depricated\XEXdecompiler\XEXdecompiler.zip" "downloads\xex-decompiler\XEXdecompiler-%VERSION%.zip"

git add .
git commit -m "Release %VERSION%"
git push origin main

echo === Done! SSH into server and run: deploy-tools.sh ===
pause