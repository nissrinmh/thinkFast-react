import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/SignIn.css';
import Header from '../Layouts/Header';
import Footer from '../Layouts/Footer';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === 'admin' && password === '123') {
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/'); 
    } else {
      setError('Nom d\'utilisateur ou mot de passe incorrect.');
    }
  };

  return (
    <>
      <Header />
      <article className="row" style={{ fontFamily: 'New Century Schoolbook, TeX Gyre Schola, serif',backgroundColor: '#a8c7d3ff' }}>
        <div className="mask">
          <div className="signIn">
            <div className="container">
              <h2>Sign In</h2>
              <img className="img" src="images/logo-transparence-sans-logo1.png" alt="logo" />
            </div>
            {error && <p className="error">{error}</p>}
            <div className="input">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="input">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <div className="input">
              <input type="submit" value="Sign In" id="btn" onClick={handleLogin} />
            </div>
            <div className="pss">
              <p>Don't have an account?</p>
              <p><Link to="/SignUp" className="link">Sign Up</Link></p>
              <p><Link to="/ForgetPassword" className="link">Forget Password?</Link></p>
            </div>
          </div>
        </div>
      </article>
      <Footer />
    </>
  );
};

export default SignIn;