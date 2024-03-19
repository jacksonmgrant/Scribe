import React, {Component} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './styles/App.css';

import Homepage from "./components/pages/Homepage"
import Layout from './Layout';
import About from './components/pages/AboutUs';
import SignupPage from './components/pages/SignupPage';
import LoginSignupPage from './components/pages/LoginSignupPage';

const App = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Homepage />} />
                    <Route path='aboutus' element={<About />} />
                    <Route path="loginSignupPage" element={<LoginSignupPage />} />
                    <Route path="SignupPage" element={<SignupPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );

}

export default App;
