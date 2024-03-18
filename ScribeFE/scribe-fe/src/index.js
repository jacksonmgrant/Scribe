import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
//import reportWebVitals from './reportWebVitals';
import Header from './components/header';
import NoteManager from './components/note-manager';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div className="Home">
    <React.StrictMode>
      <App />
    </React.StrictMode>
    <body>
        <Header className="App-header"/>
        <NoteManager />
    </body>
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
