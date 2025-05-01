import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { startSimulator } from './simulator/simulator.js';

startSimulator();

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
