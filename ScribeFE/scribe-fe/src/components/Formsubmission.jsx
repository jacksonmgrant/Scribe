import React, {useState} from 'react';
import "../styles/LoginSignup.css"
import styles from "../styles/Formsubmission.module.css"
import { Link,useNavigate } from "react-router-dom";

const FormSubmission = () => {

    const [text, setText] = useState("");
    const [rating, setRating] = useState(0);
    const [cannotSend, setCannotSend] = useState(false);
    const navigate = useNavigate();

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

    return(
        <form method='GET'>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>User feedback</h1>
                </div>
                <div className={styles.inputs}>
                    <h2>Tell us about your experience</h2>
                    <div className={styles.experience} >
                        <textarea 
                        onChange={(event) => setText(event.target.value)} >
                        </textarea>
                    </div>
                    <form className={styles.input} onChange={(event) => setRating(event.target.value)} >
                        <h2>Rate us</h2>
                        <div className={styles.stars}>  
                            <input id="radio1" name="rating" type="radio" value="1"/>
                            <label tabIndex="0" for="radio1"></label>
                            <input id="radio2" name="rating" type="radio" value="2"/>
                            <label tabIndex="0" for="radio2"></label>
                            <input id="radio3" name="rating" type="radio" value="3"/>
                            <label tabIndex="0" for="radio3"></label>
                            <input id="radio4" name="rating" type="radio" value="4"/>
                            <label tabIndex="0" for="radio4"></label>
                            <input id="radio5" name="rating" type="radio" value="5"/>
                            <label tabIndex="0" for="radio5"></label>
                        </div>
                    </form>
                    {cannotSend && <p className={styles.header} style={{ color: 'var(--light-crimson)' }}>Form fields cannot be empty</p>}
                </div>
                <div className='submit-container'>
                    <Link className='submit'
                    onClick={async () => {
                        await checkUser();
                    }}>
                        Submit
                    </Link>
                </div>
            </div>
        </form>
    );
}

export default FormSubmission;