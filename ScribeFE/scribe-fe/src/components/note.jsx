import React, { useState } from 'react';
import apiService from '../services/apiService';
import '../styles/note.css'
import { DownloadFileButton } from './buttons';
//import audioFile from './Assets/Conference.wav' // eventually this will be the audio file from the db

export function Note({id: _id, text = "Empty note", time, recording_id, onEdit, onDelete}) {
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

    // this is a really annoying way to do this but I can't come up with anything better right now 
    document.querySelectorAll('.delete').forEach(elem => { //disable tabbing 
      elem.setAttribute('tabindex', '-1') } ) 
    document.querySelectorAll('.edit').forEach(elem => { 
      elem.setAttribute('tabindex', '-1') } ) 
    document.querySelectorAll('.navlink').forEach(elem => { 
      elem.setAttribute('tabindex', '-1') } ) 
    document.querySelectorAll('.icon').forEach(elem => { 
      elem.setAttribute('tabindex', '-1') } ) 
    document.querySelectorAll('.upload-audio-file').forEach(elem => { 
      elem.setAttribute('tabindex', '-1') } ) 
    document.querySelectorAll('.record-audio').forEach(elem => { 
      elem.setAttribute('tabindex', '-1') } ) 
    document.querySelectorAll('.stop-recording').forEach(elem => { 
      elem.setAttribute('tabindex', '-1') } ) 
    document.querySelectorAll('.stop-recording').forEach(elem => { 
      elem.setAttribute('tabindex', '-1') } ) } 
    
    function handleEditClose() { 
      setEditOpen(false); setIsEditable(false); 
      document.body.style.overflow = 'scroll'; //enable window scroll 
      
      // this is a really annoying way to do this but I can't come up with anything better right now 
      document.querySelectorAll('.delete').forEach(elem => { //enable tabbing 
        elem.setAttribute('tabindex', '0') } ) 
      document.querySelectorAll('.edit').forEach(elem => { 
        elem.setAttribute('tabindex', '0') } ) 
      document.querySelectorAll('.navlink').forEach(elem => { 
        elem.setAttribute('tabindex', '0') } ) 
      document.querySelectorAll('.icon').forEach(elem => { 
        elem.setAttribute('tabindex', '0') } ) 
      document.querySelectorAll('.upload-audio-file').forEach(elem => { 
        elem.setAttribute('tabindex', '0') } ) 
      document.querySelectorAll('.record-audio').forEach(elem => { 
        elem.setAttribute('tabindex', '0') } ) }

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
          open={editOpen}>
            {isEditable ?
            <>
           <div className="modal-header">
              <label className="text-label" htmlFor="note-edit"><h2>Edit Note</h2></label>
              {recording_id ? <DownloadFileButton parameter={recording_id} /> : <div></div>}
            </div>
            <textarea autoFocus id="note-edit" type="text" className="text-edit" value={noteText} onChange={editNote}/>
            <div className="buttons">
              <button className="cancel" onClick={handleEditCancel}>Cancel
              </button>
              <button className="main" onClick={handleSaveClick}>Save
                <i className="fa-solid fa-square-check" style={{ marginLeft: '8px' }}></i>
              </button>
            </div>
            </>
            :
            <>
            <div className="modal-header">
              <label className="text-label" htmlFor="note"><h2>View Note</h2></label>
              {recording_id ? <DownloadFileButton recording_id={recording_id} /> : <div></div>}
            </div>
            <textarea id="note" type="text" value={noteText} onClick={handleEditClick} readOnly tabIndex="-1"/>
            <div className="buttons">
              <button className="cancel" onClick={handleEditClose}>Close
              </button>
              <button className="main" onClick={handleEditClick}>Edit
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
    // this is a really annoying way to do this but I can't come up with anything better right now 
    document.querySelectorAll('.delete').forEach(elem => { //disable tabbing 
      elem.setAttribute('tabindex', '-1') } ) 
    document.querySelectorAll('.edit').forEach(elem => { 
      elem.setAttribute('tabindex', '-1') } ) 
    document.querySelectorAll('.navlink').forEach(elem => { 
      elem.setAttribute('tabindex', '-1') } ) 
    document.querySelectorAll('.icon').forEach(elem => { 
      elem.setAttribute('tabindex', '-1') } ) 
    document.querySelectorAll('.upload-audio-file').forEach(elem => { 
      elem.setAttribute('tabindex', '-1') } ) 
    document.querySelectorAll('.record-audio').forEach(elem => { 
      elem.setAttribute('tabindex', '-1') } ) 
    document.querySelectorAll('.stop-recording').forEach(elem => { 
      elem.setAttribute('tabindex', '-1') } ) 
    document.querySelectorAll('.stop-recording').forEach(elem => { 
      elem.setAttribute('tabindex', '-1') } ) } 

    function handleDeleteClose() {
      setDeleteOpen(false);
      document.body.style.overflow = 'scroll';
      // this is a really annoying way to do this but I can't come up with anything better right now 
      document.querySelectorAll('.delete').forEach(elem => { //enable tabbing 
        elem.setAttribute('tabindex', '0') } ) 
      document.querySelectorAll('.edit').forEach(elem => { 
        elem.setAttribute('tabindex', '0') } ) 
      document.querySelectorAll('.navlink').forEach(elem => { 
        elem.setAttribute('tabindex', '0') } ) 
      document.querySelectorAll('.icon').forEach(elem => { 
        elem.setAttribute('tabindex', '0') } ) 
      document.querySelectorAll('.upload-audio-file').forEach(elem => { 
        elem.setAttribute('tabindex', '0') } ) 
      document.querySelectorAll('.record-audio').forEach(elem => { 
        elem.setAttribute('tabindex', '0') } ) }
  
    async function handleDeleteClick() {
      await apiService.deleteNoteById(_id);
      onDelete(_id);
      handleDeleteClose();
    }

    return (
      deleteOpen ?
      <div className='dialog-container'>
        <dialog className="delete-dialog"
          open={deleteOpen}>
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
        <textarea id="note" type="text" className="text" value={noteText} readOnly tabIndex="-1" rows={noteText.length/100+1} cols={100}/>
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