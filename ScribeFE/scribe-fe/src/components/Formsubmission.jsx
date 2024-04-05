import React, {useState} from 'react';
import "../styles/LoginSignup.css"
import styles from "../styles/Formsubmission.module.css"
import { Link } from "react-router-dom";

const FormSubmission = () => {

    const [text, setText] = useState("");
    const [rating, setRating] = useState(0);

    const checkUser = async () => {
        try {
            const response = await fetch(`http://localhost:8000/feedback/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: text,
                    rating: rating
                }),
            });
            const feedback = await response.json();
            return feedback
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    return(
        <form method='GET'>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className='text'>Form Submission</div>
                </div>
                <div className={styles.inputs}>
                    <div className={styles.experience} >
                        <textarea 
                        rows="7" 
                        style={{ height: '200px', width: '450px' }} 
                        placeholder='tell us your experience'
                        onChange={(event) => setText(event.target.value)} >
                        </textarea>
                    </div>
                    <div className={styles.input} style={{ borderRadius: '25px' }}>
                        <input type='number' 
                        max={10} 
                        id="review"
                        onChange={(event) => setRating(event.target.value)} 
                        placeholder='Give us a reviews out of 10'/>
                    </div>
                </div>
                <div className='submit-container'>
                    <Link className="submit" to="/"
                    onClick={() => {
                        checkUser();
                    }}>
                        Submit
                    </Link>
                </div>
            </div>
        </form>
    );
}

export default FormSubmission;