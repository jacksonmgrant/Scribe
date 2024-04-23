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

const createFeedback = async (text,rating,setCannotSend,navigate) => {
    try {
        const response = await fetch(`/feedback/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({
                text: text,
                rating: rating
            }),
        });
        const feedback = await response.json();
        console.log(feedback)
        if(feedback.detail === "successfully add new feedback"){
            navigate('/userpage')
            setCannotSend(false)
        }
        if(feedback.detail === "Plz fill something"){
            setCannotSend(true)
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

const createAudio = async (noteText,event) => {
    // const token = await localStorage.getItem('token');
    // const userId = decodeToken(token).sub;
    return fetch(`/audio/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({
                file: event.target.value,
                text: noteText
            }),
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

const checkUser = async (email,password,setCannotLogin,navigate,signin,signout) => {
    try {
        const response = await fetch(`/users/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });
        const user = await response.json();
        console.log("1 ",user);
        if(user.detail === "Incorrect email or password, or user does not exist."){
            console.log(user.detail);
            setCannotLogin(true);
            signout();
        }else if(user){
            await localStorage.setItem('token', user.access_token);
            navigate('/userpage');
            signin();
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

const createUser = async (name,email,password,navigate,setCannotSignup,signin,signout) => {
    try {
        const response = await fetch(`/users/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
            }),
        });
        const user = await response.json();
        if(user.msg === "successfully add new user"){
            await localStorage.setItem('token', user.access_token);
            navigate('/userpage')
            signin()
        }else {
            setCannotSignup(true)
            signout()
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

const apiService = {transcribe, createNote, getNotes, updateNote, deleteNoteById, createFeedback, checkUser, createUser,createAudio};

export default apiService;