import React from "react";
import { useSelector } from "react-redux";

const QuizPersonnalises = () => {
  const quizPersonnalises = useSelector((state) => state.quiz.quizPersonnalises);

  return (
    <div className="quiz-personnalises">
      <h2>Quiz Personnalisés</h2>
      <div className="quiz-list">
        {quizPersonnalises.length === 0 ? (
          <p>Aucun quiz personnalisé disponible.</p>
        ) : (
          quizPersonnalises.map((quiz, index) => (
            <div key={index} className="quiz">
              <h3>Quiz {index + 1}</h3>
              <p>
                <strong>Catégorie :</strong> {quiz.categorie}
              </p>
              <p>
                <strong>Sous-catégorie :</strong> {quiz.sousCategorie}
              </p>
              <p>
                <strong>Type :</strong> {quiz.type}
              </p>
              <h4>Questions :</h4>
              {quiz.questions.map((question, qIndex) => (
                <div key={qIndex} className="question">
                  <p>
                    <strong>Question {qIndex + 1} :</strong> {question.question}
                  </p>
                  <p>
                    <strong>Options :</strong> {question.options.join(", ")}
                  </p>
                  <p>
                    <strong>Réponse correcte :</strong> {question.reponse}
                  </p>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default QuizPersonnalises;