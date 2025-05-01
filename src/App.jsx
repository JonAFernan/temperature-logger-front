import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SensorDetail from './pages/SensorDetail';
import NotFoundPage from './pages/Error404';
const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sensor/:id" element={<SensorDetail />} />
                <Route path="*" element={<NotFoundPage />} /> {}
            </Routes>
        </Router>
    );
};

export default App;
