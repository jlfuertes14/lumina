@echo off
echo Building the site for GitHub Pages...
call npm run build:frontend
echo.
echo Copying built files to root for GitHub Pages...
xcopy /E /Y /I dist\* .
echo.
echo Build complete! Now push to GitHub:
echo.
echo   git add .
echo   git commit -m "Deploy updated build to GitHub Pages"
echo   git push
echo.
pause
