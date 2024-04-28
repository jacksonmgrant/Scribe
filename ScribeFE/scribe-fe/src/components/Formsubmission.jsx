import React, {useState} from 'react';
import {FaStar} from "react-icons/fa"
import "../styles/LoginSignup.css"
import styles from "../styles/Formsubmission.module.css"
import { Link,useNavigate } from "react-router-dom";
import apiService from '../services/apiService';

const FormSubmission = () => {

    const [text, setText] = useState("");
    const [rating, setRating] = useState(0);
    const [cannotSend, setCannotSend] = useState(false);
    const [hover, setHover] = useState(null)
    const navigate = useNavigate();

    return(
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>User feedback</h1>
            </div>
            <div className={styles.inputs}>
                <label htmlFor="experience"><h2>Tell us about your experience</h2></label>
                <div className={styles.experience} >
                    <textarea id="experience"
                    onChange={(event) => setText(event.target.value)} >
                    </textarea>
                </div>
                <form className={styles.input} >
                    <fieldset>  
                        <legend><h2>Rate us</h2></legend>
                        {[...Array(5)].map((star, index) =>{
                            const currentRating = index + 1;

                            return(
                            <div key={index}>
                                <input
                                    type='radio'
                                    name="rating"
                                    id={index + 1}
                                />
                                <label className="star-label" htmlFor={index + 1}>
                                    <FaStar className={styles.stars}
                                        color={currentRating <= (hover || rating) ? "var(--orange)" : "var(--light)"}
                                        onMouseEnter={() => setHover(currentRating)}
                                        onMouseLeave={() => setHover(null)}
                                        onClick={() => setRating(currentRating)}
                                    />
                                    {index + 1}
                                </label>
                            </div>
                            )
                        })}  
                    </fieldset>
                </form>
                {cannotSend && <p className={styles.header} style={{ color: 'var(--danger)' }}>Form fields cannot be blank</p>}
            </div>
            <div className='submit-container'>
                <Link className='submit'
                onClick={async () => {
                    await apiService.createFeedback(text,rating,setCannotSend,navigate);
                }}>
                    Submit
                </Link>
            </div>
        </div>
    );
}

export default FormSubmission;