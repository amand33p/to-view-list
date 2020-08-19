import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { EntryStateProvider } from './context/entry/entryState';

import './index.css';
import 'fontsource-roboto';

ReactDOM.render(
  <Router>
    <EntryStateProvider>
      <App />
    </EntryStateProvider>
  </Router>,
  document.getElementById('root')
);
