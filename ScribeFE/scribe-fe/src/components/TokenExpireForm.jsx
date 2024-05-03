import React from 'react';

const TokenExpireForm = () => {
    return (
        <div style={{margin: 'auto', width: '100%', height: '90vh', justifyContent: 'center', display: 'flex', alignItems: 'center'}}>
            <p style={{color: 'var(--danger)', padding: '1rem', backgroundColor: 'var(--solid-bg)', borderRadius: '8px'}}>
                <i className="fas fa-clock" style={{marginRight: '8px'}}></i>
                Your token is expired. Please log in again.
            </p>
        </div>
    )
}

export default TokenExpireForm;