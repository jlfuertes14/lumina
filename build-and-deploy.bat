@echo off
echo Building the site for GitHub Pages...
call npm run build
echo.
echo Build complete! Now push to GitHub:
echo.
echo   git add .
echo   git commit -m "Deploy updated build to GitHub Pages"
echo   git push
echo.
pause
