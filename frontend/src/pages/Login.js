import React, { useState } from 'react';
import logo from '../assets/logo.svg';
import './Login.css';
import api from '../services/api';

export default function Login({ history }){
  const [username, setUsername] = useState('');

  async function handleSubmit(e){
    e.preventDefault();

    const response = await api.post('/devs', {
      username,
    });

    const { _id } = response.data;

    history.push(`/dev/${_id}`);
    console.log(response);
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <img src={logo} alt="Tindev" />
        <input type="text"  placeholder="Digite seu Usuário do GitHub" 
        value={username} 
        onChange={e => setUsername(e.target.value)} 
        />
        <button type="submit">Enviar</button>
      </form>
      

    </div>
  );
}

