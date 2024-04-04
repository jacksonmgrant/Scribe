import React from 'react';
import { Note } from "./note";

export default function NoteList({notes, setNotes}) {
	//const [idCount, setIdCount] = useState(0);

	/*
	// Adds notes to the state so that they can be rendered, just for testing
	function addNewNote(input) {
		const newNote = { id: idCount, text: input };
		setNotes(prevNotes => [...prevNotes, newNote]);
		setIdCount(prevIdCount => prevIdCount + 1);
		fetchNotes();
	}*/

	function updateNote(_id, text) {
		setNotes(prevNotes =>
		  	prevNotes.map(note =>
				note._id === _id ? { ...note, text: text } : note
		  	)
		);
	}	  

	function deleteNote(_id) {
		setNotes(notes.filter(note => note._id !== _id));
	}

	// html is an auto-refreshing list of notes
  	return (
  	  	<div>
  	    	{<main>
				<section className="note-list">
					<h2>Notes</h2>
					<div id="notes">
						{notes && notes.map((note, index) => (
  	    	  				<div key={index}>
								<Note key={note._id} id={note._id} text={note.text} onEdit={() => updateNote(note._id, note.text)} onDelete={() => deleteNote(note._id)} />        		
							</div>
  	    				))}
					</div>
				</section>
			</main>}
  	  	</div>
  	);
}
