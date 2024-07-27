import React, { useState } from 'react';
import './Login.css'; // Import the CSS file for styling
import { useLogin } from '../../hooks/useLogin';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {login} = useLogin();
  
  const handleChangePassword = (e)=>{
    setPassword(e.target.value);
  }
  const handleChangeEmail = (e)=>{
    setEmail(e.target.value);
  }
  const handleSubmit = async(e)=>{
    e.preventDefault();
    await login({email,password});
  }

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleChangeEmail}
            required
            placeholder='email...'
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handleChangePassword}
            required
            placeholder='password...'
          />
        </div>
        <Link to ='/signup'>
            {"Don't"} have an account?
        </Link>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
