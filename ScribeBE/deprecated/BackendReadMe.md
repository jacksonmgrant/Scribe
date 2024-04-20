# Scribe Backend

Scribe is a web app that records audio transcriptions into notes. The goal of this app, should it become a final project, is to implement an LLM to generate organized and easy-to-read notes from an audio recording. It is also likely possible to do the same for a text file or image without much additional work.

The Scribe backend handles audio transcription, analysis, and user data storage. Audio transcription is done using the [Azure Speech to Text](https://learn.microsoft.com/en-us/azure/ai-services/speech-service/speech-to-text) service. User storage will be done with MongoDB, and communication to the frontend will be done with [FastAPI](https://fastapi.tiangolo.com/). Research still needs to be done on which LLM to use for synthesizing notes. It will need to have a free tier for API calls to it, and be good at understanding and writing text.

## Development Notes

### Project Design

The backend is a FastAPI app coordinated by `main.py`. main initiates the app, coordinates the router, and holds the transcription endpoints. The endpoints for managing notes are located in `note.py` to avoid cluttering main, but the states and router for notes are imported into main. 

All models are stored in `model.py`, currently that is just the model for notes.

`transcriber.py` contains the script for communicating with Azure's speech-to-text API. The method transcribe takes a wav file in and returns the transcription of the file. As a by-product it will save the wav file to the Uploads directory, this may be removed in future versions.

### Project Setup
After cloning the repository, create a new virtual environment:
<p>Windows: <code>py -m venv venv</code><br>
Mac/Linux: <code>python3 -m venv venv</code></p>

Activate the environment:
<p>Windows: <code>.\venv\Scripts\activate</code><br>
Mac/Linux: <code>source venv/bin/activate</code></p>

Then install the required packages inside the venv:
<p><code>pip install -r requirements.txt</code></p>

You will also need to set the environment variables for Azure's Speech to Text. Do this by running the following commands in your virtual environment:
<p><b>Windows</b>:
<ol type="1">
    <li><code>setx SPEECH_KEY your-key</code>
    <li><code>setx SPEECH_REGION your-region</code>
    <li>Restart the CLI
</ol></p>
<p><b>Linux</b>:
<ol type="1">
    <li><code>export SPEECH_KEY=your-key</code>
    <li><code>export SPEECH_REGION=your-region</code>
    <li><code>source ~/.bashrc</code>
</ol></p>
<p><b>Mac</b>:
<ol type="1">
    <li><code>export SPEECH_KEY=your-key</code>
    <li><code>export SPEECH_REGION=your-region</code>
    <li><code>source ~/.bash_profile</code>
</ol></p>

The key and region are tied to my Azure account, I will need to get them from [there](https://portal.azure.com/#@iowa.onmicrosoft.com/resource/subscriptions/9e326e7c-2aa0-4843-be9a-181cfea04c50/resourceGroups/Scribe/providers/Microsoft.CognitiveServices/accounts/ScribeTranscription/overview) for each new development environment. I have had some difficulty with this process on Linux. If you run into issues, try adding the environment variables outside of your venv, or ask for help, or do some investigating online. For further documentation read the [Azure Quickstart Documentation](https://learn.microsoft.com/en-us/azure/ai-services/speech-service/get-started-speech-to-text?tabs=macos%2Cterminal&pivots=programming-language-python).

### Running the Server
To run the app, start your venv and enter the command ```uvicorn main:app --reload```. <br>
**Security note:** The app allows CORS for all domains. This may need to change in the future.