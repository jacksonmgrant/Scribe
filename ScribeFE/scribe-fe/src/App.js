import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState,useEffect } from "react";

import './styles/App.css';

import UserPage from "./components/pages/UserPage"
import Layout from './Layout';
import About from './components/pages/AboutUs';
import SignupPage from './components/pages/SignupPage';
import LoginSignupPage from './components/pages/LoginSignupPage';
import FormSubmissionPage from "./components/pages/FormsubmissionPage";
import Welcomepage from "./components/pages/WelcomePage";
import apiService from './services/apiService';

const App = () => {
    const [isSignin,setIsSignin] = useState(sessionStorage.getItem("isSignin") === "true" ? true : false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isExpire, setIsExpire] = useState(false);

    const signin = () => {
        setIsSignin(true);
        sessionStorage.setItem("isSignin", "true");
    }

    const signout = () => {
        setIsSignin(false);
        sessionStorage.setItem("isSignin", "false");
    }

    const clearSignupInput = () => {
        let name = document.getElementById("name");
        let email = document.getElementById("email");
        let passowrd = document.getElementById("password");
        name.value = "";
        email.value = "";
        passowrd.value = "";
        setName("")
        setEmail("")
        setPassword("")
    }

    const clearLoginInput = () => {
        let email = document.getElementById("email");
        let passowrd = document.getElementById("password");
        email.value = "";
        passowrd.value = "";
        setEmail("")
        setPassword("")
    }

    async function getUserToken() {
        const token = await localStorage.getItem('token');
        return token;
    }

    async function checkTokenExpiration(token) {
        const expireTime = apiService.decodeToken(token).exp;
        const currentTime = Math.floor(Date.now() / 1000);
        
        return currentTime > expireTime;
    }

    useEffect(() => {
        async function fetchTokenAndCheckExpiration() {
            const token = await getUserToken();
            const isTokenExpired = await checkTokenExpiration(token);
            setIsExpire(isTokenExpired);
        }
        fetchTokenAndCheckExpiration();
    }, []);


    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout isSignin={isSignin} 
                        signout={signout} 
                        isExpire={isExpire}
                        setIsExpire={setIsExpire}
                        getUserToken={getUserToken}
                        checkTokenExpiration={checkTokenExpiration} 
                        />}
                    >
                        <Route index element={<Welcomepage />} />
                        <Route path="userpage" element={<UserPage 
                            isExpire={isExpire}
                            setIsExpire={setIsExpire}
                            getUserToken={getUserToken}
                            checkTokenExpiration={checkTokenExpiration}  
                            />} 
                        />
                        <Route path='aboutus' element={<About 
                            isExpire={isExpire}
                            setIsExpire={setIsExpire}
                            getUserToken={getUserToken}
                            checkTokenExpiration={checkTokenExpiration} 
                            />} 
                        />
                        <Route path="loginSignupPage" 
                            element={<LoginSignupPage 
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
                        <Route path="formsubmission" element={<FormSubmissionPage 
                            isExpire={isExpire}
                            setIsExpire={setIsExpire}
                            getUserToken={getUserToken}
                            checkTokenExpiration={checkTokenExpiration} 
                            />}
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );

}

export default App;
