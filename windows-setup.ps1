Write-Host "Installing Scribe modules..."

cd ./ScribeBE/setup

& ".\be-windows-setup.ps1"

cd ../ScribeFE/setup

& ".\fe-windows-setup.ps1"

Write-Host "Scribe modules installed, please restart your terminal"