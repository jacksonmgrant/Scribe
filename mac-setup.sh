#! /bin/bash

echo "Setting up ScribeBE..."

cd ./ScribeBE/setup

./be-mac-setup.sh

cd ../ScribeFE/setup

./fe-mac-setup.sh

echo "alias startapp='./start.sh'" >> ~/.bashrc

source ~/.bashrc

echo "ScribeBE setup complete."