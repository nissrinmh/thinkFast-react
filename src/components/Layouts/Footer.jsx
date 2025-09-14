import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../../styles/Footer.css';
// import logo from '../../../public/images/logo-transparence-sans-logo1.png'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <img src="images/logo_transparence1.png" alt="Logo" className="footer-logo" />
        <div className="social-icons">
          ThinkFaster est une application web de quiz interactive et engageante conçue pour tester 
          vos connaissances sur une variété de sujets. Testez vos compétences et apprenez quelque chose de nouveau à chaque fois !
        </div> 
      </div>
      <div className='des'>© 2025 Think Fast. All rights reserved.</div>
    </footer>
  );
};

export default Footer;