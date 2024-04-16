import BASE_URL from './apiConfig';

function decodeToken(token) {
    console.log(token);
    const arrayToken = token.split('.');
    const payload = JSON.parse(atob(arrayToken[1]));
    console.log(payload);
    return payload;
}

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
    const userId = decodeToken(localStorage.getItem('token')).sub;
    const data = {id: userId, text: noteText};
    return fetch(`${BASE_URL}/notes/`, {
            method: 'POST',
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

const getNotes = () => {
    const userId = decodeToken(localStorage.getItem('token')).sub;
    return fetch(`${BASE_URL}/notes/${userId}`)
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

const apiService = {transcribe, createNote, getNotes, updateNote, deleteNoteById};

export default apiService;