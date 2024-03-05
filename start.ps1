cd ./ScribeBE
./venv/Scripts/activate
Start-Process powershell -ArgumentList '-NoExit', '-Command', 'uvicorn main:app --reload'

cd ../ScribeFE/scribe-fe
Start-Process powershell -ArgumentList '-NoExit', '-Command', 'npm start'

cd ../../