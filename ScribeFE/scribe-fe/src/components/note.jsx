import React, { useState } from 'react';
import apiService from '../services/apiService';

export function Note({id, text = "Empty note", onEdit, onDelete}) {
  const [noteText, setText] = useState(text);
  const [isEditing, setIsEditing] = useState(false);

  function editNote(e) {
    // This will need to send a put request to the server
    setText(e.target.value);
  }

  function handleEditClick() {
    setIsEditing(true);
  }

  async function handleSaveClick() {
    await apiService.updateNote({id, text: noteText})
    onEdit(id, noteText);
    setIsEditing(false);
  }

  async function handleDeleteClick() {
    // This will need to send a delete request to the server
    await apiService.deleteNoteById(id);
    onDelete(id);
  }

  return (
    <div className="note">
      <div className="content">
        {isEditing ? <textarea type="text" className="text" value={noteText} onChange={editNote} rows={noteText.length/100+1} cols={100} />
          : <textarea type="text" className="text" value={noteText} onChange={editNote} readOnly rows={noteText.length/100+1} cols={100} />}
      </div>
      <div className="actions">
        {isEditing ? <button className="edit" onClick={handleSaveClick}>Save
        <i class="fa-solid fa-square-check" style={{ marginLeft: '8px' }}></i>
        </button>
          : <button className="edit" onClick={handleEditClick}>Edit
            <i class="fa-solid fa-pen-to-square" style={{ marginLeft: '8px' }}></i>
            </button>}
        <button className="delete" onClick={handleDeleteClick}>Delete
        <i class="fa-solid fa-trash" style={{ marginLeft: '8px' }}></i>
        </button>
      </div>
     </div>
  );
}