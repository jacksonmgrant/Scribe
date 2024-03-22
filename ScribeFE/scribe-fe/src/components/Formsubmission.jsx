import React from 'react';
import "../styles/LoginSignup.css"
import { Link } from "react-router-dom";

const FormSubmission = () => {
    return(
        <form method='GET'>
            <div className='container'>
                <div className='header'>
                    <div className='text'>Form Submission</div>
                </div>
                <div className='inputs'>
                    <div className='input'  style={{ borderRadius: '25px' }}>
                        <input type='email' name="userid" placeholder='Tell us about your experience'/>
                    </div>
                    <div className='input' style={{ borderRadius: '25px' }}>
                        <input type='number' max={10} name="review" placeholder='Give us a reviews out of 10'/>
                    </div>
                </div>
                <div className='submit-container'>
                    <Link className="submit"to="/">submit</Link>
                </div>
            </div>
        </form>
    );
}

export default FormSubmission;