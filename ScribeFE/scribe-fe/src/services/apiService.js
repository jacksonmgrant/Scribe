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

const createNote = (noteText) => {
    return fetch(`${BASE_URL}/notes/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({text: noteText}),
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

const updateNote = (id, note) => {
    const data = {id: id, text: note};
    return fetch(`${BASE_URL}/notes/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
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

const apiService = {transcribe, createNote, getNotes, getNoteById, updateNote, deleteNoteById};

export default apiService;