#! /bin/bash
# Run this in the main Scribe folder

echo "Setting up ScribeBE..."

cd ./ScribeBE

python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

echo "ScribeBE setup complete."

echo "Setting up ScribeFE..."

cd ../ScribeFE/scribe-fe

npm install

echo "ScribeFE setup complete."