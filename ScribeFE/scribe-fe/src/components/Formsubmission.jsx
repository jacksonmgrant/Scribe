import React from 'react';
import "../styles/LoginSignup.css"
import styles from "../styles/Formsubmission.module.css"
import { Link } from "react-router-dom";

const FormSubmission = () => {
    return(
        <form method='GET'>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className='text'>Form Submission</div>
                </div>
                <div className={styles.inputs}>
                    <div className={styles.experience} >
                        <textarea rows="7" style={{ height: '200px', width: '450px' }} placeholder='tell us your experience'></textarea>
                    </div>
                    <div className={styles.input} style={{ borderRadius: '25px' }}>
                        <input type='number' max={10} id="review" placeholder='Give us a reviews out of 10'/>
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