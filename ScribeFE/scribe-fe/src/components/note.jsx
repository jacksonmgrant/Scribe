import React, { useState } from 'react';
import apiService from '../services/apiService';
import '../styles/note.css'

export function Note({id: _id, text = "Empty note", time, hasRecording, onEdit, onDelete}) {
  const [noteText, setText] = useState(text);

  const [editOpen, setEditOpen] = React.useState(false);
  const [isEditable, setIsEditable] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);

  const handleEditOpen = () => setEditOpen(true);
  const handleDeleteOpen = () => setDeleteOpen(true);

  function editNote(e) {
    setText(e.target.value);
  }

  function EditModal() {
    if (editOpen === true) {
      document.body.style.overflow = 'hidden'; //disable window scroll
    }

    function handleEditClose() {
      setEditOpen(false);
      setIsEditable(false);
      document.body.style.overflow = 'scroll'; //enable window scroll
    }

    async function handleEditClick() {
      setIsEditable(true);
    }

    async function handleEditCancel() {
      setIsEditable(false);
    }
  
    async function handleSaveClick() {
      await apiService.updateNote(_id, noteText)
      onEdit(_id, noteText);
      handleEditClose();
    }

    return (
      editOpen ? 
      <div className='dialog-container'> {/* Kate: styled to prevent user from clicking behind modal */}
        <dialog className="edit-dialog"
          open={editOpen}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
            {isEditable ?
            <>
            <h2>Edit Note</h2>
            <textarea autoFocus type="text" className="text-edit" value={noteText} onChange={editNote}/>
            <div className="buttons">
              <button className="cancel" onClick={handleEditCancel}>Cancel
              </button>
              <button className="save" onClick={handleSaveClick}>Save
                <i className="fa-solid fa-square-check" style={{ marginLeft: '8px' }}></i>
              </button>
            </div>
            </>
            :
            <>
            <h2>View Note</h2>
            <textarea type="text" className="text" value={noteText} readOnly/>
            <div className="buttons">
              <button className="cancel" onClick={handleEditClose}>Close
              </button>
              <button className="save" onClick={handleEditClick}>Edit
                <i className="fa-solid fa-pen-to-square" style={{ marginLeft: '8px' }}></i>
              </button>
            </div>
            </>}
        </dialog>
      </div>
      : <div></div> //Kate: if the dialog is not open return an empty div, 
      //without this dialog-container is visible always and prevents clicking buttons
      //unsure if there's a better way to do this but it works for now
    )
  }

  function DeleteModal() {
    if (deleteOpen === true) {
      document.body.style.overflow = 'hidden';
    }

    function handleDeleteClose() {
      setDeleteOpen(false);
      document.body.style.overflow = 'scroll';
    }
  
    async function handleDeleteClick() {
      // This will need to send a delete request to the server
      await apiService.deleteNoteById(_id);
      onDelete(_id);
      handleDeleteClose();
    }

    return (
      deleteOpen ?
      <div className='dialog-container'>
        <dialog className="delete-dialog"
          open={deleteOpen}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <h2>Delete Note</h2>
          <div className="delete-message">
            <h3><i class="fas fa-exclamation-triangle" style={{marginRight: '8px'}}></i>Are you sure?</h3>
            <p>This action cannot be undone.</p>
          </div>
          <div className="buttons">
            <button className="cancel" onClick={handleDeleteClose}>Cancel
            </button>
            <button autoFocus className="delete" onClick={handleDeleteClick}>Delete
            <i className="fa-solid fa-trash" style={{ marginLeft: '8px' }}></i>
            </button>
          </div>
        </dialog>
      </div>
      :<div></div>
    )
  }

  return (
    <>
    <div className="note">
      <div className="content">
        <textarea type="text" className="text" value={noteText} onChange={editNote} readOnly rows={noteText.length/100+1} cols={100}/>
      </div>
      <div className="actions">
        <button className="edit" onClick={handleEditOpen}>View
          <i className="fa-solid fa-eye" style={{ marginLeft: '8px' }}></i>
        </button>
        <button className="delete" onClick={handleDeleteOpen}>Delete
        <i className="fa-solid fa-trash" style={{ marginLeft: '8px' }}></i>
        </button>
      </div>
     </div>
        {EditModal()}
        {DeleteModal()}
      </>
  );
}