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
            resolve(audioFile)
        })
    }
    
    async function handleFileInput(event) {
        try {
            console.log("Transcribing");
            setIsTranscribing(true);
            const text = await transcribeFile(event);
            const audioFile = await getAudioFile(event);
            let recordingId = null;

            if (audioFile.size < 15728640) {
                console.log("Uploading file",audioFile)
                const response = await apiService.createAudio(audioFile);
                recordingId = await response.recording_id;
            }

            console.log("recordingid", recordingId) 
            await apiService.createNote(text, recordingId);
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
                title="Hidden file input"
                style={{ display: 'none' }}
                aria-hidden='true'
                onChange={handleFileInput}
            />
            <button type="button" name="upload-audio-file" className="upload-audio-file" onClick={() => {handleUpload();}}>
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
                title="Hidden file input"
                style={{ display: 'none' }}
                aria-hidden='true'
                onChange={handleFileInput}
            />
            <button type="button" name="upload-audio-file" className="upload-audio-file" onClick={() => {handleUpload();}}>
                <i className="fa-solid fa-file-audio" style={{ marginRight: '8px' }}></i> Upload File
            </button>
            <p style={{ color: 'var(--text-main)', textAlign: 'center' }}>Accepts .wav files only</p>
        </div>
    );
}

export function RecordAudioButton({ onUpload }) {
    // hook for loading screen
    const [isTranscribing, setIsTranscribing] = useState(false);
    const [status, setStatus] = useState("idle");
    let transcribedTextArray = [];

    if (isTranscribing === true) {
        document.body.style.overflow = 'hidden'; //disable window scroll
    }

    useEffect(() => {
        if (status === "recording") {
            record();
        }
    }, [status]);

    const startSttFromMic = async () => {
        setStatus("recording");
    };

    const record = async () => {
        try {
            console.log("Recording");
            while (status === "recording") {
                console.log("Getting speech from mic")
                console.log(await status)
                try {
                    const result = await sttFromMic();
                    transcribedTextArray = [...transcribedTextArray, result];
                } catch (error) {
                    console.log(`Error recording: ${error}`);
                }
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
            <iframe style={{border: 'none', width: '200px'}} src="https://lottie.host/embed/3578901e-5772-46f4-a34a-22b3a2904f7b/4eUF6lZ22c.json" title="waiting Animation"></iframe>
        </div>
        <div>
            {status !== "recording" ? (
                <button type="button" name="record-audio" className="record-audio" onClick={() => {startSttFromMic()}}>
                    <i className="fa-solid fa-microphone" style={{ marginRight: '8px' }}></i>  Record Audio
                </button>
            ) : (
                <button type="button" name="stop-recording" className="stop-recording" onClick={sendTranscription}>
                    <i className="fa-solid fa-stop stop-icon" style={{ marginRight: '8px' }}></i> Stop Recording
                </button>
            )}
        </div>
        </>
        :
        <div>
        {status !== "recording" ? (
            <button type="button" name="record-audio" className="record-audio" onClick={() => {startSttFromMic()}}>
                <i className="fa-solid fa-microphone" style={{ marginRight: '8px' }}></i>  Record Audio
            </button>
        ) : (
            <button type="button" name="stop-recording" className="stop-recording" onClick={sendTranscription}>
                <i className="fa-solid fa-stop stop-icon" style={{ marginRight: '8px' }}></i> Stop Recording
            </button>
        )}
        </div>
    );
}

export function DownloadFileButton ({ recording_id }) {
    const [audioFile, setAudioFile] = useState(null);

    useEffect(() => {
        // setAudioFile(apiService.getAudio(recording_id));
        async function fetchAudio() {
            try {
                const audioFile = await apiService.getAudio(recording_id);
                setAudioFile(audioFile);
            } catch (error) {
                console.error('Error fetching audio:', error);
            }
        }
        fetchAudio();
    }, [recording_id]);

    return (
        <a href={audioFile} download='myAudioFile.wav' 
        target="_blank" rel="noreferrer"
        style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center' }}
        title="Download Audio"
        tabIndex='-1'>
            <button className="main" title="Download Audio">
                <i className="fas fa-download" ari-hidden="true" style={{ paddingInline: '0.25rem' }}></i>
            </button>
        </a>
    );
}
