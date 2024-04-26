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

const createNote = async (noteText, recordingId = null) => {
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

const createAudio = async (audioFile) => {

    const wavFile = new FormData();
    wavFile.append("audio", audioFile)

    return fetch(`/audio/`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: wavFile,
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

const getAudio = async (id) => {
    return fetch(`/audio/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
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

const checkUser = async (email,password,navigate,setCannotLogin,signin,signout,clearLoginInput,emailEmpty,passwordEmpty) => {
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
            if (emailEmpty) {
                document.getElementById('emailMsg').style.display = 'block';
            }
            if (passwordEmpty) {
                document.getElementById('passwordMsg').style.display = 'block';
            }
            else {
                document.getElementById('cannotLogin').style.display = 'block';
            }
            signout();
        }else if(user){
            setCannotLogin(false);
            await localStorage.setItem('token', user.access_token);
            navigate('/userpage');
            signin();
            clearLoginInput();
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

const createUser = async (name,email,password,navigate,setCannotSignup,signin,signout,clearSignupInput,nameEmpty,emailEmpty,passwordEmpty) => {
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
            setCannotSignup(false)
            await localStorage.setItem('token', user.access_token);
            navigate('/userpage')
            signin()
            clearSignupInput();
        }else {
            if (nameEmpty) {
                document.getElementById('nameMsg').style.display = 'block';
            }
            if (emailEmpty) {
                document.getElementById('emailMsg').style.display = 'block';
            }
            if (passwordEmpty) {
                document.getElementById('passwordMsg').style.display = 'block';
            }
            else {
                document.getElementById('cannotSignup').style.display = 'block';
            }
            signout()
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

const apiService = {createNote, getNotes, updateNote, deleteNoteById, createFeedback, createAudio, getAudio, checkUser, createUser};

export default apiService;