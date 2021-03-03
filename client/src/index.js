import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthStateProvider } from './context/auth/authState';
import { EntryStateProvider } from './context/entry/entryState';
import './index.css';

ReactDOM.render(
  <Router>
    <AuthStateProvider>
      <EntryStateProvider>
        <App />
      </EntryStateProvider>
    </AuthStateProvider>
  </Router>,
  document.getElementById('root')
);
