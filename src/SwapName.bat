@echo off

:: Check if App.js and App2.js exist
if not exist "App.js" (
    echo App.js does not exist.
    exit /b
)

if not exist "App2.js" (
    echo App2.js does not exist.
    exit /b
)

:: Rename App.js to a temporary name
rename "App.js" "TempApp.js"

:: Rename App2.js to App.js
rename "App2.js" "App.js"

:: Rename TempApp.js to App2.js
rename "TempApp.js" "App2.js"

echo File renaming successful!
