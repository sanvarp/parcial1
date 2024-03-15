import "./Login.css";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        navigate('/carstable'); // Cambia esto por la ruta correcta
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
      console.error('Hubo un error al intentar hacer login:', error);
    }
  };

  return (
    <div className="login-container">
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Nombre de usuario</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="form-button">
          <button type="submit">Ingresar</button>
          <button
            type="button"
            onClick={() => {
              setUsername("");
              setPassword("");
              setError(false);
            }}
          >
            Cancelar
          </button>
        </div>
        {error && <div className="error-message">Las credenciales son incorrectas.</div>}
      </form>
    </div>
  );
}



export default Login;
