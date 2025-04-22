import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../App.css'

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/users/login', formData);
      localStorage.setItem('token', res.data.token); // Save JWT
      navigate('/dashboard');
    } catch (err) {
      alert('Login failed: ' + err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="main_div_Back">
      <h2 >Sign In</h2>
      <form onSubmit={handleSubmit} className="main_div">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="input_type1"
          onChange={handleChange}
          required
        />
        
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="input_type1"
          onChange={handleChange}
          required
        />
        <button className="button_S">
          Login
        </button>
      </form>

      
    </div>

  
  );
}

export default Login;
