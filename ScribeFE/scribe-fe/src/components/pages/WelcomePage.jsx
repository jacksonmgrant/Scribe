import React from "react";
import "../../styles/Welcome.css";

const Welcomepage = () => {
    return(
        <div>
            <p className="text-zinc-200 text-center font-bold padding">
                <span className="glowing-head">Welcome to Scribe</span>
            </p>
            <div className="container2"style={{ paddingTop: '100px' }}>
                <p className="text-center" style={{ fontSize: '40px' }}>Demo</p>
                <div className="overview" style={{ paddingTop: '100px' }}>
                    <div className="scribe" style={{ fontSize: '20px' }}>
                        <p>Scribe is a web app that records audio transcriptions into notes. </p>
                        <p>The goal of this app is to implement an LLM to generate organized </p>
                        <p>and easy-to-read notes from a long audio recording.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Welcomepage;