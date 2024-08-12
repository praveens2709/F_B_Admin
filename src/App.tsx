import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Moderators from './pages/Moderators';
import Customers from './pages/Customers';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Layout from './components/Layout';

const App: React.FC = () => {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/moderators" element={<Moderators />} />
                    <Route path="/customers" element={<Customers />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/settings" element={<Settings />} />
                    {/* Default route */}
                    <Route path="*" element={<Navigate to="/dashboard" />} />
                </Routes>
            </Layout>
        </Router>
    );
};

export default App;
