import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginSignupPage from './components/pages/LoginSignupPage';
import './styles/App.css';
import Homepage from "./components/pages/Homepage"
import Layout from './Layout';
import About from './components/pages/AboutUs';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Homepage />} />
                    <Route path='aboutus' element={<About />} />
                    <Route path="loginSignupPage" element={<LoginSignupPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
