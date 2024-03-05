#! /usr/bin/bash

echo "Setting up ScribeBE..."

cd ./ScribeBE/setup

./be-mac-setup.sh

cd ../ScribeFE/setup

./fe-mac-setup.sh

echo "ScribeBE setup complete."