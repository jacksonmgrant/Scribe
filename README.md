# Scribe

- [Scribe](#scribe)
  - [Overview](#overview)
    - [Usage](#usage)
    - [Credits](#credits)
  - [Demos](#demos)
  - [Development Notes](#development-notes)
    - [Project Design](#project-design)
    - [Requirements](#requirements)
  - [Project Setup](#project-setup)
    - [Quick Setup](#quick-setup)
  - [To-do](#to-do)
    - [Midterm](#midterm)
    - [Final](#final)
  - [Known Bugs](#known-bugs)

## Overview

[Project proposal](https://drive.google.com/file/d/16IDP-MVffQDJVVcQPmE3bniw_TpQhXiI/view?usp=sharing)

Scribe is a web app that records audio transcriptions into notes. The goal of this app is to implement an AI model to generate organized and easy-to-read notes from a long audio recording.

The Scribe frontend implements audio recording & transcription, a clean UI, and API integration with the backend. The UI is built with React, audio transcription is done using the [Azure Speech to Text](https://learn.microsoft.com/en-us/azure/ai-services/speech-service/speech-to-text) service. JavaScript's fetch API is used to communicate with the backend.

The Scribe backend handles user data storage, authentication, and authorization. User data is stored with MongoDB Atlas, and communication to the frontend is done with FastAPI. Research still needs to be done on which AI model to use for synthesizing notes.

### Usage

- When uploading files, only use wav audio files. The Azure STT API cannot process any other type.
  - Several sample files are located at Scribe/Samples/. Conference.wav is the best file for quick testing, while the other two can be used for stress testing.
- The app will be unusable while uploading audio, which takes about as long as the audio file is. The UI does not indicate this yet.
- The free tier on Azure STT has a limit of 300 minutes of transcription per month. Please be mindful of what you transcribe and don't send files longer than 10 minutes without letting me know.

### Credits

- The template UI code is repurposed from [this](https://www.youtube.com/watch?v=MkESyVB4oUw) task list tutorial by Tyler Potts. It has been updated to work in React.
- The project is also based on instructor Changhui Xu's [to-do app example](https://github.com/changhuixu/CS3980-2024/tree/main/my_todo_app), particularly on the backend.
- ChatGPT and Github CoPilot were used to help learn the tools used in this project, generate code fragments, and debug.
- The Favicon is the Notebook Flat Icon Vector from [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Notebook_Flat_Icon_Vector.svg) by Videoplasty.com, CC-BY-SA 4.0.

## Demos

CRUD actions (Old UI):
    [Watch the demo here](https://www.loom.com/embed/1466ae1d1391430f85811b4509db6963?sid=2d92dc7d-2565-473f-86ab-683af466f3fc)

Multiple notes:
    ![The Scribe app with multiple notes recorded](./ScribeFE/screenshots/Multiple_notes.png)

## Development Notes

### Project Design

The backend is a FastAPI app coordinated by `main.py`. main initiates the app, connects to the database, and coordinates the routers. The models folder contains object models for the database and API. The apis folder contains all of the endpoints, organized by router, and the security folder holds classes used for user authentication. 

The frontend is a React app styled with CSS. `app.js` utilizes the react-router-dom library to create a page routing heirarchy. The base code for pages is stored in the components/pages folder, and then they are enhanced with additional components. Styles are imported into components and pages from their respective CSS files in the styles folder. Logos and the index HTML file used to store head tags are located in the public folder.

API calls to the backend are imported into components from `apiService.js` to centralize API logic and improve code reusability. The base URL for API calls is stored in `apiConfig.js`. `speechRecognizerService.js` is used to make calls to Azure's speech-to-text API to transcribe text on the frontend.

### Requirements

- Node v20+ [LTS](https://nodejs.org/en/)
- Python 3.12.x

## Project Setup

The below instructions are for quick setup. I have written scripts that install all dependencies and set up environments, as well as create an alias to run the project with one command.

If you are worried about running scripts or are encountering issues with them, you can run the commands in the files in terminal yourself. There are more instructions in the frontend and backend readmes.

### Quick Setup

1. Give the scripts permission to run:
    - Windows:
        1. Run ```Set-ExecutionPolicy AllSigned``` in a powershell window as an administrator.
            - If that fails try ```Set-ExecutionPolicy RemoteSigned -Scope CurrentUser -Force```
    - Mac/Linux:
        1. Run ```chmod +x mac-setup.sh be-start.sh fe-start.sh``` in the Scribe folder
2. Insert the API Key for Microsoft Azure STT:
    1. Create a file named .env in the folder Scribe/ScribeFE/scribe-fe.
    2. Paste the following code into the file:  

          ```text
          REACT_APP_SPEECH_KEY="your-key"
          REACT_APP_SPEECH_REGION='eastus'
          ```

    3. Replace the your-key value with the API key I have sent to you.
3. Insert your database credentials
    1. Add your database user [here](https://cloud.mongodb.com/v2/65ff51a50085c37972c4b409#/security/database/users) and your IP address [here](https://cloud.mongodb.com/v2/65ff51a50085c37972c4b409#/security/network/accessList)
        - If you don't have access, please send me the email associated with your MongoDB acccount to be added to the organization.
    2. Create a file named .env in the folder Scribe/ScribeBE.
    3. Paste the following code into the file:

       ```text
       DB_USER="your_username"
       DB_PASS="your_password"
       ```

    4. Replace the username and password fields with your credentials
4. Run the setup script:
    - Windows:
      1. From the Scribe folder, run ```./windows-setup.ps1``` in VSCode's terminal.
    - Mac/Linux:
      1. From the Scribe folder, run ```./mac-setup.sh``` in VSCode's terminal.
5. Run the project:
    - Windows:
        - Run ```./start.ps1``` from the Scribe folder
    - Mac/Linux:
        1. Run ```./be-start.sh``` from the Scribe folder
        2. Open a new terminal instance
        3. Run ```./fe-start.sh``` from the Scribe folder

## To-do

### Midterm

- [x] Buttons
  - [x] Create upload file button
  - [x] Create record audio button
  - [x] Deactivate buttons while waiting on API (Needs a loading screen)
- [x] Make API calls to backend
  - [x] Transcription
  - [x] CRUD for notes
- [x] Receive transcribed text from backend
- [x] Create notes from audio transcription
- [x] Edit/delete notes
  - [x] Edit notes
  - [x] Delete notes
- [x] Favicon
- [x] Make full note text readable
- [x] Upload screenshots of app
- [x] Package into one repo
  - [x] Write scripts for setup & startup
  - [x] Consolidate setup scripts for readability

### Final

- [x] Implement user auth
- [x] Persistent data storage
- [ ] Require .wav files for input
- [ ] Allow user to listen to the recording in UI
- [ ] API Calls to LLM to synthesize long texts
  - [ ] LLM can create a summary of the recording
  - [ ] Option to transcribe raw speech or synthesize notes
  - [ ] LLM Generates a note title
  - [ ] Notes display in list with their title
- [ ] Make it pretty
  - [ ] Notes open up from list in a modal OR turn list into a sidebar
  - [x] Navbar for sign in/out, about page, and home
- [ ] Add language identification to record in different languages

## Known Bugs

- Textarea for editing notes isn't locked in place - need to remove the ability to drag it around somehow. Haven't done a ton of debugging with it either.
