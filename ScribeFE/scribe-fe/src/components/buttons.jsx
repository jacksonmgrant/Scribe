import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';
import { transcribeFile, sttFromMic } from '../services/speechRecognizerService';
import '../styles/buttons.css'

export function FileUploadButton({ onUpload }) {
    // hook for loading screen
    const [isTranscribing, setIsTranscribing] = useState(false);

    if (isTranscribing === true) {
        document.body.style.overflow = 'hidden'; //disable window scroll
      }

    function handleUpload() {
        const fileInput = document.getElementById('fileInput');
        fileInput.click();
    }

    async function getAudioFile(event) {
        return new Promise((resolve, reject) => {
            const audioFile = event.target.files[0];
            console.log("2",audioFile);
            resolve(audioFile)
        })
    }
    
    async function handleFileInput(event) {
        try {
            console.log("Transcribing");
            setIsTranscribing(true);
            const text = await transcribeFile(event);
            console.log(text);
            await apiService.createNote(text);
            const audioFile = await getAudioFile(event)
            console.log("3",audioFile)
            await apiService.createAudio(audioFile)
            setIsTranscribing(false);
            document.body.style.overflow = 'scroll'; //enable window scroll
            onUpload();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        isTranscribing ?
        <>
        <div className="loading-screen">
            <iframe title="loading" style={{border: 'none', width: '200px'}} src="https://lottie.host/embed/3578901e-5772-46f4-a34a-22b3a2904f7b/4eUF6lZ22c.json"></iframe>
        </div>
        <div className="upload-container">
            <input
                type="file"
                accept=".wav, .wav-x"
                id="fileInput"
                style={{ display: 'none' }}
                onChange={handleFileInput}
            />
            <button type="button" name="upload-audio-file" id="upload-audio-file" onClick={() => {handleUpload();}}>
                <i className="fa-solid fa-file-audio" style={{ marginRight: '8px' }}></i> Upload File
            </button>
            <p style={{ color: 'var(--text-main)', textAlign: 'center' }}>Accepts .wav files only</p>
        </div>
        </>
        :
        <div className="upload-container">
            <input
                type="file"
                accept=".wav, .wav-x"
                id="fileInput"
                style={{ display: 'none' }}
                onChange={handleFileInput}
            />
            <button type="button" name="upload-audio-file" id="upload-audio-file" onClick={() => {handleUpload();}}>
                <i className="fa-solid fa-file-audio" style={{ marginRight: '8px' }}></i> Upload File
            </button>
            <p style={{ color: 'var(--text-main)', textAlign: 'center' }}>Accepts .wav files only</p>
        </div>
    );
}

export function RecordAudioButton({ onUpload }) {
    // hook for loading screen
    const [isTranscribing, setIsTranscribing] = useState(false);
    
    const [ status, setStatus ] = useState("idle");

    let transcribedTextArray = [];

    if (isTranscribing === true) {
        document.body.style.overflow = 'hidden'; //disable window scroll
    }

    const startSttFromMic = async () => {
        setStatus("recording");
        //record();
    };

    useEffect(() => {
        if (status === "recording") {
            record();
        }
    }, [status]);

    const record = async () => {
        try {
            console.log("Recording");
            while (status === "recording") {
                console.log("Getting speech from mic")
                transcribedTextArray = [...transcribedTextArray, await sttFromMic()];
            }
        } catch (error) {
            console.error(`Error recording: ${error}`);
        }
    };

    const sendTranscription = async () => {
        if (transcribedTextArray.length !== 0) {
            const transcribedText = transcribedTextArray.join(' ');
            console.log('Transcribed speech:', transcribedText);
            apiService.createNote(transcribedText)
                .then(() => {
                    onUpload();
                })
                .catch(error => {
                    console.error('Error creating note:', error);
                });
            transcribedTextArray = [];
        }
        setIsTranscribing(false);
        document.body.style.overflow = 'scroll'; //enable window scroll
        setStatus("idle");
    };

    return (
        isTranscribing ?
        <>
        <div className="loading-screen">
            <iframe style={{border: 'none', width: '200px'}} src="https://lottie.host/embed/3578901e-5772-46f4-a34a-22b3a2904f7b/4eUF6lZ22c.json"></iframe>
        </div>
        <div>
            {status !== "recording" ? (
                <button type="button" name="record-audio" id="record-audio" onClick={() => {startSttFromMic()}}>
                    <i className="fa-solid fa-microphone" style={{ marginRight: '8px' }}></i>  Record Audio
                </button>
            ) : (
                <button type="button" name="stop-recording" id="stop-recording" onClick={sendTranscription}>
                    <i className="fa-solid fa-stop stop-icon" style={{ marginRight: '8px' }}></i> Stop Recording
                </button>
            )}
        </div>
        </>
        :
        <div>
        {status !== "recording" ? (
            <button type="button" name="record-audio" id="record-audio" onClick={() => {startSttFromMic()}}>
                <i className="fa-solid fa-microphone" style={{ marginRight: '8px' }}></i>  Record Audio
            </button>
        ) : (
            <button type="button" name="stop-recording" id="stop-recording" onClick={sendTranscription}>
                <i className="fa-solid fa-stop stop-icon" style={{ marginRight: '8px' }}></i> Stop Recording
            </button>
        )}
        </div>
    );
}
