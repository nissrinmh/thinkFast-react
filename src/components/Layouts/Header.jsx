import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/Header.css';
import { FaHome, FaSignInAlt, FaSignOutAlt,FaEdit,FaClipboardList,FaInfoCircle } from 'react-icons/fa';

const Header = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn'); 
    navigate('/');
  };

  return (
    <header>
      <img src="images/logo_transparence1.png" alt="Quiz Logo" />
      <nav>
        <Link to="/" className="nav-a"><FaHome></FaHome></Link>
        <Link to="/about" className="nav-a"><FaInfoCircle ></FaInfoCircle> About</Link>
        {isLoggedIn ? (
          <>
            <Link to="/ajouter-quiz" className="nav-a"><FaEdit ></FaEdit> Ajouter un Quiz</Link>
            <Link to="/quiz-personnalises" className="nav-a"><FaClipboardList ></FaClipboardList > Quiz Personnalisés</Link>
            <button onClick={handleLogout} className="nav-a"><FaSignOutAlt></FaSignOutAlt> Logout</button>
          </>
        ) : (
          <Link to="/SignIn" className="nav-a"><FaSignInAlt></FaSignInAlt> Login</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;