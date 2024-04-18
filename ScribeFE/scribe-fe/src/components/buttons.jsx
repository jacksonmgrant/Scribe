import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';
import { transcribeFile, sttFromMic } from '../services/speechRecognizerService';

export function FileUploadButton({ onUpload }) {

    function handleUpload() {
        const fileInput = document.getElementById('fileInput');
        fileInput.click();
    }

    async function handleFileInput(event) {
        try {
            console.log("Transcribing");
            const text = await transcribeFile(event);
            console.log(text);
            const response = await apiService.createNote2(text); 
            console.log(response)
            const noteID = response.noteID;
            try {
                const file = event.target.files[0]
                if (file.size < 15 * 1024 * 1024) {
                    apiService.sendAudio(file,noteID)
                }
            }
            catch (error) {}
            onUpload();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <input
                type="file"
                id="fileInput"
                style={{ display: 'none' }}
                onChange={handleFileInput}
            />
            <button
                type="button" name="upload-audio-file" id="upload-audio-file" onClick={() => {handleUpload();}}
            >
                <i className="fa-solid fa-file-audio" style={{ marginRight: '8px' }}></i> Upload File
            </button>
        </div>
    );
}

export function RecordAudioButton({ onUpload }) {
    const [ transcribedText, setTranscribedText ] = useState(null);
    const [ status, setStatus ] = useState("idle");

    const startSttFromMic = async () => {
        setStatus("recording");
        // Currently, transcription stops as soon as the speaker pauses. We need to rework it so that it
        // goes until the stop button is pressed.
        const text = await sttFromMic();
        setTranscribedText(text);
    };

    useEffect(() => {
        if (transcribedText !== null) {
            console.log('Transcribed speech:', transcribedText);
            apiService.createNote(transcribedText)
                .then(() => {
                    onUpload();
                })
                .catch(error => {
                    console.error('Error creating note:', error);
                });
        }
    }, [transcribedText]);

    const sendTranscription = async () => {
        setStatus("idle");
    };

    return (
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
