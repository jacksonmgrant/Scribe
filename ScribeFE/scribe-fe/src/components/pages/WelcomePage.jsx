import React from "react";
import "../../styles/Welcome.css";
import ReactPlayer from "react-player";

const Welcomepage = () => {

    return(
        <div className="welcome-container">
            <h1>Welcome to Scribe</h1>
            <div className="content">
                <div className="videoText">
                    <h2>Demo</h2>
                    <div className='wrapper'>
                        <ReactPlayer className='player' 
                        width='100%'
                        height='100%'
                        url="https://www.youtube.com/watch?v=IqGp2SA8YvI" controls={true}/>
                    </div>
                </div>
                <div className="overview">
                    <h2>Overview</h2>
                    <p>There are many situations where people need to take notes which 
                        have barriers to note taking. A project manager needs to record meeting 
                        minutes, but also run the meeting. A doctor needs to have a conversation 
                        with their patient and get a detailed record of their responses. A 
                        person with arthritis can’t write notes for an entire lecture. All of 
                        these situations could be remedied with a personal Scribe. </p>
                        <br></br>
                        <h3 className='problem'>Problem</h3>
                        <p>Barriers to taking notes arise when the would-be writer is occupied 
                            by the situation at hand or otherwise impaired. They need a way to 
                            take notes without doing it themselves.</p>
                        <br></br>
                        <h3 className='solution'>Solution</h3>
                        <p>Scribe transcribes audio with the click of a button, and can generate 
                            notes from a text using an AI model.</p>
                </div>
            </div>
        </div>
    )
}

export default Welcomepage;