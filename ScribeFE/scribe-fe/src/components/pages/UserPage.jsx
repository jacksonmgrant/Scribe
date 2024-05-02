import Header from '../header';
import NoteManager from '../note-manager';
import '../../styles/homepage.css';
import apiService from '../../services/apiService';
import React, { useState, useEffect } from 'react';

const Userpage =  () => {
    
    const [isExpire, setIsExpire] = useState(false);

    async function getUserToken() {
        const token = await localStorage.getItem('token');
        return token;
    }

    async function checkTokenExpiration(token) {
        const expireTime = apiService.decodeToken(token).exp;
        const currentTime = Math.floor(Date.now() / 1000);
        
        return currentTime > expireTime;
    }

    useEffect(() => {
        async function fetchTokenAndCheckExpiration() {
            const token = await getUserToken();
            const isTokenExpired = await checkTokenExpiration(token);
            setIsExpire(isTokenExpired);
        }
        fetchTokenAndCheckExpiration();
    }, []);

    return(
        <div>
            {isExpire
              ?(
                <div>
                    <p>Your token is expired.Plz login again one more time</p>
                </div>
               )
              :(            
                <div className="home-container">
                    <Header className="App-header"/>
                    <NoteManager />
                </div>
               )
            }
        </div>
    )
}

export default Userpage;