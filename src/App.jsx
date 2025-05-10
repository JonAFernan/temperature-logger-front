import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SensorDetail from './pages/SensorDetail';
import NotFoundPage_404 from './pages/Error404';
import NotFoundPage_500 from './pages/Error500';
import Login from './pages/Login';
import ProtectedRoute from './routes/ProtectedRoute';
import Layout from './components/Layout';
import './App.css';

const App = () => {
    window.addEventListener('beforeunload', () => localStorage.clear()); //clear localStorage when we close the application windows
    return (
        <Router>
            <Routes>
                <Route path="/user/login" element={<Login />} />
                <Route path="*" element={<NotFoundPage_404 />} />
                <Route path="/500" element={<NotFoundPage_500 />} />
                <Route element={<ProtectedRoute />}>
                    <Route
                        path="/"
                        element={
                            <Layout>
                                <Home />
                            </Layout>
                        }
                    />
                    <Route
                        path="/sensor/:id"
                        element={
                            <Layout>
                                <SensorDetail />
                            </Layout>
                        }
                    />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
