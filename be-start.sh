#! /bin/bash

# Can't open new terminal windows inside VSCode, had to split startup scripts

cd ./ScribeBE
source venv/bin/activate
bash -c 'uvicorn main:app --reload'