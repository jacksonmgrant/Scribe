#! /bin/bash

cd ./ScribeBE
./venv/Scripts/activate
gnome-terminal --tab -- bash -c 'uvicorn main:app --reload'

cd ../ScribeFE/scribe-fe
gnome-terminal --tab -- bash -c 'npm start'

cd ../../