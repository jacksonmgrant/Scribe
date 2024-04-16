import BASE_URL from './apiConfig';

// Template for interceptor taken from https://blog.logrocket.com/intercepting-javascript-fetch-api-requests-responses/
const { fetch: originalFetch } = window;
window.fetch = async (...args) => {
    let [url, config] = args;
    if (!config) {
        config = {};
    }
    if (url.includes("notes") || url.includes("feedback")) {
        config.headers = {
            ...config.headers,
            'Authorization': `Bearer ${await localStorage.getItem('token')}`,
        };
    }
    url = `${BASE_URL}${url}`;
    const response = await originalFetch(url, config);
    return response;
};

function decodeToken(token) {
    const arrayToken = token.split('.');
    const payload = JSON.parse(atob(arrayToken[1]));
    return payload;
}

//Only returns the transcribed text, but creates a new note
const transcribe = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    return fetch(`/transcribe/`, {
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

const getNotes = async () => {
    const token = await localStorage.getItem('token');
    const userId = decodeToken(token).sub;
    return fetch(`/notes/${userId}`)
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

const createNote = async (noteText) => {
    const token = await localStorage.getItem('token');
    const userId = decodeToken(token).sub;
    const data = {id: userId, text: noteText};
    return fetch(`/notes/`, {
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

const updateNote = async (id, note) => {
    const data = {id: id, text: note};
    return fetch(`/notes/`, {
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

const deleteNoteById = async (id) => {
    return fetch(`/notes/${id}`, {
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