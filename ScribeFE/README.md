# ScribeFE

Scribe is a web app that records audio transcriptions into notes. The goal of this app, should it become a final project, is to implement an LLM to generate organized and easy-to-read notes from a long audio recording.

The Scribe frontend implements audio recording, a clean UI, and API integration with the backend. The UI is built with React, and audio recording is done with the [react-media-recorder-2](https://www.npmjs.com/package/react-media-recorder-2). JavaScript's fetch API is used to communicate with the backend.

### Credits

* The template UI code is repurposed from [this](https://www.youtube.com/watch?v=MkESyVB4oUw) task list tutorial by Tyler Potts. It has been updated to work in React. 
* The project is also based on instructor Changhui Xu's [to-do app example](https://github.com/changhuixu/CS3980-2024/tree/main/my_todo_app), particularly on the backend. 
* ChatGPT and Github CoPilot were used to help learn the tools used in this project, generate code fragments, and debug. 
* The Favicon is the Notebook Flat Icon Vector from [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Notebook_Flat_Icon_Vector.svg) by Videoplasty.com, CC-BY-SA 4.0.

# Demos

CRUD actions:
    <div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/1466ae1d1391430f85811b4509db6963?sid=2d92dc7d-2565-473f-86ab-683af466f3fc" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

Multiple notes:
    ![](./screenshots/Multiple_notes.png)

Network log in frontend:
    ![](./screenshots/Network_log.png)

HTTP log in backend:
    ![](./screenshots/HTTP_log.png)

# Development Notes

### Getting Started

You may need to install Node to run the project. If ```npm install``` doesn't work, try installing Node.js (LTS version) from here: https://nodejs.org/en/

Run ```npm install``` in the <b><u>scribe-fe</u></b> folder to install all the the dependencies for the project. There should be a lot of deprecated and vulnerability warnings, this is because the app is initialized with create-react-app, which is a deprecated command. I was just having too hard of a time getting Next.js to work.

The following commands are the basic React commands, copying here for reference. You need to run these from the scribe-fe folder (```cd ./scribe-fe``` to get there).

* ```npm start``` Starts the development server.
* ```npm run build```  Bundles the app into static files for production.
* ```npm test``` Starts the test runner.

## To-do

### Midterm

- [ ] Buttons
    - [x] Create upload file button
    - [ ] Create record audio button
    - [ ] Deactivate buttons while waiting on API (Needs a loading screen)
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
- [ ] Upload screenshots of app

### Final

- [ ] Implement user auth
- [ ] Persistent data storage
- [ ] API Calls to LLM to synthesize long texts
    - [ ] Option to transcribe raw speech or synthesize notes
    - [ ] LLM Generates a note title
    - [ ] Notes display in list with their title
- [ ] Make it pretty
    - [ ] Turn note editor into a modal
    - [ ] Notes open up from list in a modal OR turn list into a sidebar
- [ ] Add language identification to record in different languages

## Known Bugs
 - Textarea for editing notes isn't locked in place - need to remove the ability to drag it around somehow. Haven't done a ton of debugging with it either.
 - Recording audio is nonfunctional. It sends a playable wav file to the backend, but the headers are corrupted and Azure cannot transcribe it. I am struggling to find a workaround.
