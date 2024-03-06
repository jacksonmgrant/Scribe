Write-Host "Installing Scribe modules..."

Set-Location ./ScribeBE/setup

& ".\be-windows-setup.ps1"

Set-Location ../ScribeFE/setup

& ".\fe-windows-setup.ps1"

Set-Location ../..

Write-Host "Scribe modules installed, please kill your terminal and restart Visual Sutdio Code."