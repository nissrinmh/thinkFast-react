import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../../styles/ForgetPassword.css';
import { Link } from 'react-router-dom';
import Header from '../Layouts/Header';
import Footer from '../Layouts/Footer';

const ForgetPassword = () => {
  return (
    <>
    <Header />
    <article className="row" style={{ height:'620px', fontFamily: 'New Century Schoolbook, TeX Gyre Schola, serif' ,backgroundColor: '#a8c7d3ff' }}>
      <div className="mask">
          <div className="ForgetPassword">
            <div class="container">
              <h2>Forget Password</h2>
              <img className='img' src="images/logo-transparence-sans-logo1.png" alt="logo" />
            </div>
            <div className="input">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" />
            </div>
            <div class="input">
              <input type="submit" value="Send Reset Link" id="btn" />
            </div>
            <div className="pss">
              <p>I remember my password? <Link to="/SignIn" className="link">Sign In</Link></p>
            </div>
            <div className="pss" id='w2'>
              <p>New account? <Link to="/SignUp" className="link">Sign Up</Link></p>
            </div>
          </div>
      </div>
      <Footer />
    </article>
    
    </>
  );
};

export default ForgetPassword;