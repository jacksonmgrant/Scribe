#! /bin/bash
# Run this in the main Scribe folder

echo "Setting up ScribeBE..."

cd ./ScribeBE

python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

#source ../config/config.sh
#export SPEECH_KEY=$API_KEY
#export SPEECH_REGION=eastus
#source ~/.bash_profile

echo "ScribeBE setup complete."

echo "Setting up ScribeFE..."

cd ../ScribeFE/scribe-fe

npm install

echo "alias startapp='./start.sh'" >> ~/.bashrc
source ~/.bashrc

echo "ScribeBE setup complete."