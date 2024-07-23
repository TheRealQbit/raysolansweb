@echo off
REM Batch file to display raw JSON content using PowerShell

REM Set the path to the JSON file
set "jsonFile=../secciones.json"

REM Check if the JSON file exists
if not exist "%jsonFile%" (
    echo JSON file not found: %jsonFile%
)

REM Use PowerShell to display the raw JSON content
powershell -NoProfile -Command 
    "$jsonFile = '%jsonFile%'; 
    if (Test-Path $jsonFile) { 
        $content = Get-Content -Path $jsonFile -Raw; 
        Write-Output $content; 
    } else { 
        Write-Host 'File not found' -ForegroundColor Red; 

    }"

REM Pause to keep the window open
pause
