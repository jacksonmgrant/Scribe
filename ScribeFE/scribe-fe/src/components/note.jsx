import React, { useState } from 'react';
import apiService from '../services/apiService';

export function Note({id: _id, text = "Empty note", time, hasRecording, onEdit, onDelete}) {
  const [noteText, setText] = useState(text);
  const [isEditing, setIsEditing] = useState(false);

  function editNote(e) {
    setText(e.target.value);
  }

  function handleEditClick() {
    setIsEditing(true);
  }

  async function handleSaveClick() {
    await apiService.updateNote(_id, noteText)
    onEdit(_id, noteText);
    setIsEditing(false);
  }

  async function handleDeleteClick() {
    await apiService.deleteNoteById(_id);
    onDelete(_id);
  }

  return (
    <div className="note">
      <div className="content">
        {isEditing ? <textarea type="text" className="text" value={noteText} onChange={editNote} rows={noteText.length/100+1} cols={100} />
          : <textarea type="text" className="text" value={noteText} onChange={editNote} readOnly rows={noteText.length/100+1} cols={100} />}
      </div>
      <div className="actions">
        {isEditing ? <button className="edit" onClick={handleSaveClick}>Save</button>
          : <button className="edit" onClick={handleEditClick}>Edit</button>}
        <button className="delete" onClick={handleDeleteClick}>Delete</button>
      </div>
     </div>
  );
}