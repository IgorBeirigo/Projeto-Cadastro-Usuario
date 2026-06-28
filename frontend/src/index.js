import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/designSystem.css';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

const root = createRoot(document.getElementById('root'));
root.render(
    <App />
);
