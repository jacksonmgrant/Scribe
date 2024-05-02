import FormSubmission from "../Formsubmission";
import apiService from '../../services/apiService';
import React, { useState, useEffect } from 'react';


const FormSubmissionPage = () =>{
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
            { isExpire ? (
                <div style={{margin: 'auto', width: '100%', height: '90vh', justifyContent: 'center', display: 'flex', alignItems: 'center'}}>
                    <p style={{color: 'var(--danger)', padding: '1rem', backgroundColor: 'var(--solid-bg)', borderRadius: '8px'}}>
                        <i className="fas fa-clock" style={{marginRight: '8px'}}></i>
                        Your token is expired. Please log in again.
                    </p>
                </div> 
            )
            : (
                <div>
                    <FormSubmission/>
                </div>
            )}
        </div>
    )
}

export default FormSubmissionPage;