import "./Login.css";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl'; 

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const intl = useIntl(); 

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login: username, password: password }),
      });

      if (response.ok) {
        navigate('/carstable');
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
      console.error('Hubo un error al intentar hacer login:', error);
    }
  };


  const handleInputFocus = () => {
    setError(false);
  };

  return (
    <div className="login-container">
      <h1>{intl.formatMessage({ id: 'login.title' })}</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="username">{intl.formatMessage({ id: 'login.username' })}</label>
        <input
          type="text"
          id="username"
          className={error ? "error" : ""}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onFocus={handleInputFocus}
        />
        <label htmlFor="password">{intl.formatMessage({ id: 'login.password' })}</label>
        <input
          type="password"
          id="password"
          className={error ? "error" : ""}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={handleInputFocus} 
        />
        <div className="form-button">
          <button type="submit">{intl.formatMessage({ id: 'login.submit' })}</button>
          <button
            type="button"
            onClick={() => {
              setUsername("");
              setPassword("");
              setError(false);
            }}
          >
            {intl.formatMessage({ id: 'login.cancel' })}
          </button>
        </div>
        {error && <div className="error-message">{intl.formatMessage({ id: 'login.error' })}</div>}
      </form>
    </div>
  );
}

export default Login;
