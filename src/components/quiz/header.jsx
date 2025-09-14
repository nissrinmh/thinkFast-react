import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const quizPersonnalises = useSelector((state) => state.quiz.quizPersonnalises);

  return (
    <header>
      <nav>
        <Link to="/">Accueil</Link>
        <Link to="/ajouter-quiz">Ajouter un Quiz</Link>
        {quizPersonnalises.length > 0 && (
          <Link to="/quiz-personnalises">Quiz Personnalisés</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;