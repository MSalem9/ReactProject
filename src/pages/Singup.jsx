import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // Clear error on change
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Email is invalid';

    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6)
      newErrors.password = 'Password must be at least 6 characters';

    if (!formData.passwordConfirm)
      newErrors.passwordConfirm = 'Please confirm your password';
    else if (formData.password !== formData.passwordConfirm)
      newErrors.passwordConfirm = 'Passwords do not match';

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await axios.post('http://localhost:3001/users/signup', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      alert('Signup failed: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="main_div_Back">
      <h2 className="text-3xl mb-6">Sign Up</h2>
      <form onSubmit={handleSubmit} className="main_div">
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="input_type1"
          onChange={handleChange}
          value={formData.name}
        />
        {errors.name && <p className="errorMassage">{errors.name}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="input_type1"
          onChange={handleChange}
          value={formData.email}
        />
        {errors.email && <p className="errorMassage">{errors.email}</p>}

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="input_type1"
          onChange={handleChange}
          value={formData.password}
        />
        {errors.password && <p className="errorMassage">{errors.password}</p>}

        <input
          type="password"
          name="passwordConfirm"
          placeholder="Confirm Password"
          className="input_type1"
          onChange={handleChange}
          value={formData.passwordConfirm}
        />
        {errors.passwordConfirm && <p className="errorMassage">{errors.passwordConfirm}</p>}

        <button type="submit" className="button_S">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;
