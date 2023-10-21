// LoginForm.js
import React, { useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';
import meImage from './me.png';
import meImage2 from './me2.png';
function Login() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [alertClass, setAlertClass] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();
  const handleLoginChange = (e) => {
    setLogin(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const showAlert = (message, type) => {
    setAlertMessage(message);
    setAlertClass(type);
    setTimeout(() => {
      setAlertMessage('');
      setAlertClass(null);
    }, 5000); // Efface l'alerte après 5 secondes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password }),
      });

      if (response.ok) {
        const data = await response.text();

        if (data === 'non') {
          showAlert('Échec de la connexion, vérifiez votre login ou votre mot de passe', 'alert-error');
        } else {
          showAlert('Connexion réussie : ' + data, 'alert-success');
          window.localStorage.setItem('userData',data);
          navigate('/Diagnostic');
        }
      } else {
        showAlert('Échec de la connexion', 'alert-error');
      }
    } catch (error) {
      showAlert('Une erreur s\'est produite : ' + error, 'alert-error');
    }
  };

  return (
    
    <div>
    <h1>Welcome to our website</h1>
      {alertMessage && (
        <div className={`alert ${alertClass}`}>
          {alertMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <h1>Connexion</h1>
        <div>
          <label>Login:</label>
          <input
            type="text"
            value={login}
            onChange={handleLoginChange}
            required
          />
        </div>
        <div>
          <label>Mot de passe:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Se connecter</button>
      </form>
     <img src={meImage2} alt="Image" style={{ position: 'absolute', top: 30, right: 50, width: '200px', height: 'auto', zIndex: 1 }} />
    
     <img
        src={meImage}
        alt="Image"
        style={{
          position: 'absolute',
          top: 300,
          left: 50,
          width: '200px',
          height: 'auto',
          zIndex: 1,
        }}
      />
     </div>

  );
}

export default Login;
