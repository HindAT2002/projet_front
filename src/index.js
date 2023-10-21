import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import App from './Login';
import App2 from './Diagnostic';
import App3 from './score';

const Root = () => {
  const [user, setUser] = useState(JSON.parse(window.localStorage.getItem('userData')));
  const isAuthenticated = !!user;

  const AuthenticatedRoute = ({ element }) => {
    if (!user) {
      return <Navigate to="/" />;
    }

    return isAuthenticated ? element : <Navigate to="/" />;
  };

  useEffect(() => {
    const userDataFromStorage = window.localStorage.getItem('userData');

    try {
      const parsedUser = userDataFromStorage ? JSON.parse(userDataFromStorage) : null;
      setUser(parsedUser);
    } catch (error) {
      console.error('Error parsing user data:', error);
    }
  }, []); // Make sure to provide the dependencies array if needed

  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="/Diagnostic"
          element={<AuthenticatedRoute element={<App2 />} />}
        />
        <Route path="/score" element={<AuthenticatedRoute element={<App3 />} />} />
      </Routes>
    </Router>
  );
};

const root = createRoot(document.getElementById('root'));
root.render(<Root />);
