import React from 'react';
import '../../styles/Home.css';
import Header from '../Layouts/Header';
import Footer from '../Layouts/Footer';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <Header />
      <section className="hero" style={{ backgroundImage: `url('/images/background_quiz2.jpg')` }}>
        <div className="titre">
          <h1>Think Fast</h1>
          <h1>Think Fast</h1>
        </div>
        <h2 className='soustitre'>Aiguisez votre esprit</h2>
        <Link to="/listcardcategory" className="start-quiz-link">
          Commencer le quiz <span className="arrow">→</span>
        </Link>
      </section>
      <Footer />
    </>
  );
};

export default Home;