Write-Host "Installing ScribeBE..."

Set-Location ..

py -m venv venv

./venv/Scripts/activate

pip install -r requirements.txt

. .\.config.ps1
setx SPEECH_KEY $API_KEY
setx SPEECH_REGION eastus

Write-Host "ScribeBE installed, please restart your temrminal"