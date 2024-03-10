import React, { useState } from 'react';
import apiService from '../services/apiService';
import { useReactMediaRecorder } from "react-media-recorder-2";
import { fileChange, sttFromMic } from '../services/speechRecognizerService';

export function FileUploadButton({ onUpload }) {
    const [selectedFile, setSelectedFile] = useState(null);

    function handleFileChange(event) {
        const file = event.target.files[0];
        setSelectedFile(file);
    }

    function handleUpload() {
        const fileInput = document.getElementById('fileInput');
        fileInput.click(); // Trigger the file input click
    }

    async function handleFileInput(event) {
        try {
            const text = await fileChange(event);
            await apiService.createNote(text);
            onUpload();
        } catch (error) {
            console.error(error);
        }
    }

    async function sendFile(file) {
        await apiService.transcribe(file);
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
                type="button" name="upload-audio-file" id="upload-audio-file" onClick={handleUpload}
            >
                <i className="fa-solid fa-file-audio" style={{ marginRight: '8px' }}></i> Upload File
            </button>
        </div>
    );
}

export function RecordAudioButton({ onUpload }) {
    const { startRecording, stopRecording, mediaBlobUrl, status } = useReactMediaRecorder({ audio: true });
    const { audioUrl, setAudioUrl } = useState(null);

    const sendAudio = async () => {
        console.log("getting : " + mediaBlobUrl);
        const blob = (await fetch(mediaBlobUrl)).blob();
        console.log("blob: " + blob)
        // Create a new File from the Blob
        const audioFile = new File([blob], 'recorded_audio.wav', { type: 'audio/wav' });

        // You can now use 'audioFile' as needed (e.g., upload it to the server)
        console.log('Audio File:', audioFile);

        await apiService.transcribe(audioFile);

        onUpload();
    };

    return (
        <div>
            {status !== "recording" ? (
                <button type="button" name="record-audio" id="record-audio" onClick={startRecording}>
                    <i className="fa-solid fa-microphone" style={{ marginRight: '8px' }}></i>  Record Audio
                </button>
            ) : (
                <button type="button" name="stop-recording" id="stop-recording" onClick={() => { stopRecording(); sendAudio(); }}>
                    <i className="fa-solid fa-stop stop-icon" style={{ marginRight: '8px' }}></i> Stop Recording
                </button>
            )}
        </div>
    );
}
