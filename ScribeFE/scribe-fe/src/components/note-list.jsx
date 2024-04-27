import React from 'react';
import { Note } from "./note";

export default function NoteList({notes, setNotes}) {

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
  	    	{<div>
				<section className="note-list">
					<h2>Notes</h2>
					<div id="notes">
						{notes && notes.map((note, index) => (
  	    	  				<div key={index}>
								<Note key={note._id} id={note._id} text={note.text} recording_id={note.recording_id} onEdit={() => updateNote(note._id, note.text)} onDelete={() => deleteNote(note._id)} />        		
							</div>
  	    				))}
					</div>
				</section>
			</div>}
  	  	</div>
  	);
}
