import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../../styles/SignUp.css';
import { Link } from 'react-router-dom';
import Header from '../Layouts/Header';
import Footer from '../Layouts/Footer';

const SignUp = () => {
  return (
    <>
     <Header />
      <article className="row" style={{fontFamily: 'New Century Schoolbook, TeX Gyre Schola, serif',backgroundColor: '#a8c7d3ff' }}>
        <div className="mask ">
            <div className="signUp">
              <div class="container">
                <h2>Sign Up</h2>
                <img className='img' src="images/logo-transparence-sans-logo1.png" alt="logo" />
              </div>
              <div className="input">
                <i className="fas fa-user"></i>
                <input type="text" placeholder="Username" />
              </div>
              <div className="input">
                <i className="fas fa-envelope"></i>
                <input type="email" placeholder="Email" />
              </div>
              <div className="input">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="Password" />
              </div>
              <div class="input">
                <input type="submit" value="Sign Up" id="btn" />
              </div>
              <div className="pss">
                <p> Already have an account?</p>
                <p><Link to="/SignIn" className="link">Sign In</Link></p>
                <p><Link to="/ForgetPassword?" className="link">Forget Password?</Link></p>
              </div>
            </div>
        </div>
      </article>
      <Footer />
    </>
  );
};

export default SignUp;