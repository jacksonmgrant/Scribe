#! /bin/bash
# Run this in the main Scribe folder

cd ./ScribeBE
source venv/bin/activate
bash -c 'uvicorn main:app --reload'