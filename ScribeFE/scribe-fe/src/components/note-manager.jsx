import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';
import { FileUploadButton, RecordAudioButton } from './buttons';
import NoteList from './note-list';

/* This component manages the state of the notelist so that it can recognize when new notes are added from the buttons*/

export default function NoteManager() {
	const [notes, setNotes] = useState([]);

    useEffect(() => {
		fetchNotes();
	}, []);

	async function fetchNotes() {
		try {
			// TODO Replace the admin id here with the global current user id
			const allNotes = await apiService.getNotes("66105db717133f8a7b0952dc");
			setNotes(allNotes.notes);
		} catch (error) {
			console.error("Error fetching notes:", error);
		}
	}

    const handleUpload = async () => {
        await fetchNotes();
      };

    return (
        <main>
            <div id="new-note-buttons">
		        <FileUploadButton onUpload={handleUpload}/>
		        <RecordAudioButton onUpload={handleUpload}/>
            </div>
            <NoteList notes={notes} setNotes={setNotes} />
        </main>
    );
}