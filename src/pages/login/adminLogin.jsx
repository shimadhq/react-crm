import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../../utils/api';
import './adminLogin.css';

export const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      setError('لطفاً نام کاربری و رمز عبور را وارد کنید');
      return;
    }

    try {
       await adminLogin(username, password);
        navigate('/profile');
    } catch (err) {
      setError(err.message || 'خطا در ورود. لطفاً دوباره امتحان کنید');
    }
  };

  return(
    <div className="login-container">
        <div className="login-card">
            <h2 className="login-title">
                مدیریت پنل ورود
            </h2>
            <form onSubmit={handleLogin}>
             <div className='form-group'>
               <label className="form-label">
                 نام کاربری
               </label>
               <input
               type="text"
               value={username}
               onChange={(e) => setUsername(e.target.value)}
               placeholder="نام کاربری ..."
               className="form-input"
               />
             </div>
             <div className="form-group">
              <label className="form-label">
               رمز عبور
              </label>
              <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="رمز عبور ..."
              className="form-input"
              />
             </div>
             {error && <p className="error-message">{error}</p>}
             <button
             type="submit"
             className="login-button"
             >
             ورود
             </button>
            </form>
        </div>
    </div>
  )
}

