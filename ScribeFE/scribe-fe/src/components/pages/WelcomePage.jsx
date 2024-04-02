import React from "react";
import "../../styles/Welcome.css";
import ReactPlayer from "react-player";

const leftshift = {
    marginLeft: '5px'
}

const Welcomepage = () => {

    return(
        <div>
            <p className="text-center font-bold" style={{ paddingTop: '110px' }}>
                <span className="glowing-head">Welcome to Scribe</span>
            </p>
            <div className="container2"style={{ paddingTop: '70px' }}>
                <p className="text-center" style={{ fontSize: '40px' }}>Overview of this app</p>
                <div className="overview" style={{ paddingTop: '90px' }}>
                    <div className="container2" style={{fontSize: '20px', paddingRight: '30px'}}>
                        <p style={leftshift}>Scribe is a web app that records audio transcriptions into notes. </p>
                        <p style={leftshift}>The goal of this app is to implement an LLM to generate organized </p>
                        <p style={leftshift}>and easy-to-read notes from a long audio recording.</p>
                        <p style={leftshift}>we can change the video on the right to be scribe demo</p>
                    </div>
                    <div className="vidoeText">
                        <ReactPlayer url="https://www.youtube.com/watch?v=XJrT1xQZmKk" controls={true}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Welcomepage;