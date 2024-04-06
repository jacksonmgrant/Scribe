import React, { useState } from 'react';
import apiService from '../services/apiService';
import '../styles/note.css'

export function Note({id: _id, text = "Empty note", time, hasRecording, onEdit, onDelete}) {
  const [noteText, setText] = useState(text);
  const [isEditing, setIsEditing] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function editNote(e) {
    setText(e.target.value);
  }

  function handleEditClick() {
      handleOpen();
  }

  async function handleSaveClick() {
    await apiService.updateNote(_id, noteText)
    onEdit(_id, noteText);
    handleClose();
    setIsEditing(false);
  }

  async function handleDeleteClick() {
    // This will need to send a delete request to the server
    await apiService.deleteNoteById(_id);
    onDelete(_id);
    }

  return (
    <>
    <div className="note">
      <div className="content">
        {isEditing ?
        <textarea type="text" className="text" value={noteText} onChange={editNote} rows={noteText.length/100+1} cols={100} />
          : <textarea type="text" className="text" value={noteText} onChange={editNote} readOnly rows={noteText.length/100+1} cols={100} />}
      </div>
      <div className="actions">
        <button className="edit" onClick={handleEditClick}>Edit
          <i className="fa-solid fa-pen-to-square" style={{ marginLeft: '8px' }}></i>
        </button>
        <button className="delete" onClick={handleDeleteClick}>Delete
        <i className="fa-solid fa-trash" style={{ marginLeft: '8px' }}></i>
        </button>
      </div>
     </div>
     <div className='dialog-container'>
        <dialog id="dialog"
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <textarea type="text" className="text" value={noteText} onChange={editNote} />
          <div className="buttons">
            <button className="cancel" onClick={handleClose}>Cancel
            </button>
            <button className="save" onClick={handleSaveClick}>Save
              <i className="fa-solid fa-square-check" style={{ marginLeft: '8px' }}></i>
            </button>
          </div>
        </dialog>
        </div>
      </>
  );
}