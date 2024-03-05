import BASE_URL from './apiConfig';

//Only returns the transcribed text, but creates a new note
const transcribe = (file) => {
    const formData = new FormData();
    formData.append('file', file);

    return fetch(`${BASE_URL}/transcribe/`, {
            method: 'POST',
            body: formData,
        })
        .then((response) => response.json())
        .then((result) => {
            console.log('Success:', result);
            return result.transcribed;
        })
        .catch((error) => {
            console.error('Error:', error);
            throw error;
        });
}

const getNotes = () => {
    return fetch(`${BASE_URL}/notes/`)
        .then((response) => response.json())
        .then((result) => {
            console.log('Success:', result);
            return result;
        })
        .catch((error) => {
            console.error('Error:', error);
            throw error;
        });
}

const getNoteById = (id) => {
    return fetch(`${BASE_URL}/notes/${id}`)
        .then((response) => response.json())
        .then((result) => {
            console.log('Success:', result);
            return result;
        })
            .catch((error) => {
            console.error('Error:', error);
            throw error;
        });
    }

const updateNote = (note) => {
    return fetch(`${BASE_URL}/notes/${note.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(note),
        })
        .then((response) => response.json())
        .then((result) => {
            console.log('Success:', result);
            return result;
        })
        .catch((error) => {
            console.error('Error:', error);
            throw error;
        });
}

const deleteNoteById = (id) => {
    return fetch(`${BASE_URL}/notes/${id}`, {
            method: 'DELETE',
        })
        .then((response) => response.json())
        .then((result) => {
            console.log('Success:', result);
            return result;
        })
        .catch((error) => {
            console.error('Error:', error);
            throw error;
        });
    }

const apiService = {transcribe, getNotes, getNoteById, updateNote, deleteNoteById};

export default apiService;