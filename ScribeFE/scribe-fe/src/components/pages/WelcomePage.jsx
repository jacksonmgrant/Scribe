import React from "react";
import "../../styles/Welcome.css";
import ReactPlayer from "react-player";

const Welcomepage = () => {

    return(
        <div className="welcome-container">
            <h1>Welcome to Scribe</h1>
            <h2>Overview</h2>
            <div className="overview">
                <p>Scribe is a web app that records audio transcriptions into notes.
                The goal of this app is to implement an LLM to generate organized and easy-to-read 
                notes from an audio recording. </p>
            </div>
            <h2>Demo</h2>
            <div className="vidoeText">
                <ReactPlayer url="https://www.youtube.com/watch?v=XJrT1xQZmKk" controls={true}/>
            </div>
        </div>
    )
}

export default Welcomepage;