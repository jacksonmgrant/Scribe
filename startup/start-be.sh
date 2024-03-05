#! /bin/bash

cd ../ScribeBE

./venv/Scripts/activate

uvicorn main:app --reload