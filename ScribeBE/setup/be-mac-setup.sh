#! /bin/bash

echo "Setting up ScribeBE..."

cd ..

python3 -m venv venv

source venv/bin/activate

pip install -r requirements.txt

source config.sh
export SPEECH_KEY=$API_KEY
export SPEECH_REGION=eastus
source ~/.bash_profile

echo "ScribeBE setup complete."