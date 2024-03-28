import React, { useState } from 'react';
import apiService from '../services/apiService';
import { transcribeFile, sttFromMic } from '../services/speechRecognizerService';

export function FileUploadButton({ onUpload }) {

    function handleUpload() {
        const fileInput = document.getElementById('fileInput');
        fileInput.click(); // Trigger the file input click
    }

    async function handleFileInput(event) {
        try {
            console.log("Transcribing");
            const text = await transcribeFile(event);
            console.log(text);
            await apiService.createNote(text);
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
        const text = await sttFromMic();
        setTranscribedText(text);
    };

    const sendTranscription = async () => {
        setStatus("idle");
        
        console.log('Transcribed speech:', transcribedText);

        await apiService.createNote(transcribedText);

        onUpload();
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
