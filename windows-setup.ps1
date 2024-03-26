# Run this in the main Scribe folder

Write-Host "Installing Scribe modules..."

Write-Host "Setting up ScribeBE..."

Set-Location ./ScribeBE

py -m venv venv

./venv/Scripts/activate

pip install -r requirements.txt

#$Path = "../.env"
#$values = Get-Content $Path | Out-String | ConvertFrom-StringData
#$env:SPEECH_KEY = $values.SPEECH_KEY
#$env:SPEECH_REGION = $values.SPEECH_REGION

Write-Host "ScribeBE setup complete."

Write-Host "Setting up ScribeFE..."

Set-Location ../ScribeFE/scribe-fe

npm install

Write-Host "ScribeFE setup complete."

Set-Location ../..

Write-Host "Scribe modules installed, please kill your terminal and restart Visual Studio Code."