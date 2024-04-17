import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import './styles/App.css';

import UserPage from "./components/pages/UserPage"
import Layout from './Layout';
import About from './components/pages/AboutUs';
import SignupPage from './components/pages/SignupPage';
import LoginSignupPage from './components/pages/LoginSignupPage';
import FormSubmissionPage from "./components/pages/FormsubmissionPage";
import Welcomepage from "./components/pages/WelcomePage";
import ParticlesBg from 'particles-bg'

const App = () => {
    const [isSignin,setIsSignin] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signin = () => {
        setIsSignin(true)
    }

    const signout = () => {
        setIsSignin(false)
    }

    const clearSignupInput = () => {
        setName("")
        setEmail("")
        setPassword("")
    }

    const clearLoginInput = () => {
        setEmail("")
        setPassword("")
    }

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout isSignin={isSignin} signout={signout}/>}>
                        <Route index element={<Welcomepage />} />
                        <Route path="userpage" element={<UserPage />} />
                        <Route path='aboutus' element={<About />} />
                        <Route path="loginSignupPage" 
                            element={<LoginSignupPage
                            isSignin={isSignin} 
                            signin={signin}
                            signout={signout}
                            email={email}
                            setEmail={setEmail}
                            password ={password}
                            setPassword={setPassword}
                            clearLoginInput={clearLoginInput}
                            />} 
                        />
                        <Route path="SignupPage" 
                            element={<SignupPage
                                isSignin={isSignin}
                                signin={signin}
                                signout={signout}
                                name={name}
                                setName={setName}
                                email={email}
                                setEmail={setEmail}
                                password ={password}
                                setPassword={setPassword}
                                clearSignupInput={clearSignupInput}
                                />} 
                        />
                        <Route path="formsubmission" element={<FormSubmissionPage/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
            
        </div>
    );

}

export default App;
