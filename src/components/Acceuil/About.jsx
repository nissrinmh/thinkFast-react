import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../../styles/About.css';
import Header from '../Layouts/Header';
import Footer from '../Layouts/Footer';

const About = () => {
  const navigate = useNavigate();

  const handleDevelopmentClick = () => {
    navigate('/quiz');
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerChildren = {
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div>
      <Header />
      <motion.section
        id="welcome"
        className="section welcome-section"
        initial="hidden"
        animate="visible"
        variants={staggerChildren}
      >
        <motion.h3 variants={fadeInUp}>Bienvenue sur Think Faster</motion.h3>
        <motion.div className="welcome-container" variants={fadeInUp}>
          <img src="images/welcome.png" alt="Image de bienvenue" />
          <div className="welcome-text">
            <h4>ThinkFaster</h4>
            <p>
              ThinkFaster est une application web de quiz interactive et engageante conçue pour tester vos connaissances sur une variété de sujets. Testez vos compétences et apprenez quelque chose de nouveau à chaque fois !
            </p>
          </div>
        </motion.div>
      </motion.section>

      <motion.section
        id="difficulty"
        className="section quiz-difficulty"
        initial="hidden"
        animate="visible"
        variants={staggerChildren}
      >
        <motion.h3 variants={fadeInUp}>Niveaux de difficulté des quiz</motion.h3>
        <motion.div className="difficulty-levels" variants={staggerChildren}>
          {[
            {
              img: "images/easy2-.jpg",
              title: "Niveau A : Facile",
              description: "Le niveau A est conçu pour ceux qui débutent leur parcours de quiz. Ce niveau vous aide à prendre confiance et à vous familiariser avec le format des quiz.",
            },
            {
              img: "images/medium2.jpg",
              title: "Niveau B : Moyen",
              description: "Le niveau B augmente la difficulté avec des questions plus complexes et nécessite une compréhension approfondie des sujets.",
            },
            {
              img: "images/hard2-.jpg",
              title: "Niveau C : Difficile",
              description: "Le niveau C est destiné aux experts en quiz et à ceux qui sont prêts à repousser les limites de leurs connaissances. Ce niveau est fait pour ceux qui aiment la compétition.",
            },
          ].map((item, index) => (
            <motion.div key={index} className="difficulty-card" variants={fadeInUp}>
              <img src={item.img} alt={item.title} />
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <motion.section
        id="categories"
        className="section quiz-categories"
        initial="hidden"
        animate="visible"
        variants={staggerChildren}
      >
        <motion.h3 variants={fadeInUp}>Catégories de quiz</motion.h3>
        <motion.div className="categories-grid" variants={staggerChildren}>
          {[
            { img: "images/chefcuis.jpg", title: "Cuisine", description: "Questions sur les plats, les recettes et les cultures culinaires." },
            { img: "images/voyage.jpg", title: "Voyages", description: "Découvrez des cultures et des destinations à travers le monde." },
            { img: "images/sports.jpg", title: "Sports", description: "Testez vos connaissances sur les sports et les grands événements sportifs." },
            { img: "images/programme.jpg", title: "Développement", description: "Explorez le monde du codage et des technologies.", onClick: handleDevelopmentClick },
            { img: "images/films.jpg", title: "Cinéma", description: "Plongez dans l'univers du cinéma avec des questions sur les films cultes." },
            { img: "images/langues.jpg", title: "Langues", description: "Apprenez tout en jouant avec des quiz sur les langues et les expressions." },
            { img: "images/santes.jpg", title: "Santé", description: "Quiz sur le bien-être, la santé et les modes de vie sains." },
            { img: "images/art.jpg", title: "Arts", description: "Découvrez des questions captivantes sur la peinture, la musique et l'histoire de l'art." },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="category-card"
              variants={fadeInUp}
              onClick={item.onClick}
              style={{ cursor: item.onClick ? 'pointer' : 'default' }}
            >
              <img src={item.img} alt={item.title} />
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
      <Footer />
    </div>
  );
};

export default About;