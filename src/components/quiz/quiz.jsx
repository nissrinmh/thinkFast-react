import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Question from "./question";
import BarreProgression from "./barreProgress";
import SelectionSujets from "./selectionsujets";
import { quizData } from "../../data/quizData";
import { FaArrowLeft, FaArrowRight, FaLightbulb } from "react-icons/fa";
import { motion } from "framer-motion";
import { repondreQuestion, reinitialiserQuiz } from "../../redux/actionCreators";
import Modal from "./modal";
import ConfirmationModal from "./confirmationmodal";

const Quiz = () => {
  const dispatch = useDispatch();
  const { languagesSelectionnes, reponsesUtilisateur } = useSelector((state) => state.quiz);
  const [quizCommence, setQuizCommence] = useState(false);
  const [categorieActuelle, setCategorieActuelle] = useState(0);
  const [questionActuelle, setQuestionActuelle] = useState(0);
  const [score, setScore] = useState(0);
  const [afficherIndice, setAfficherIndice] = useState(false);
  const [afficherResultats, setAfficherResultats] = useState(false);
  const [afficherDetails, setAfficherDetails] = useState(false);
  const [afficherChoixRecommencer, setAfficherChoixRecommencer] = useState(false);
  const [tempsRestant, setTempsRestant] = useState(0);
  const [nombreQuestions, setNombreQuestions] = useState(5);
  const [niveau, setNiveau] = useState("facile");
  const [modalMessage, setModalMessage] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const quizFiltre = quizData
    .filter((categorie) => languagesSelectionnes.includes(categorie.categorie))
    .map((categorie) => ({
      ...categorie,
      questions: categorie.questions
        .filter((question) => question.niveau === niveau)
        .slice(0, nombreQuestions),
    }));

  const categorie = quizFiltre[categorieActuelle];
  const question = categorie?.questions[questionActuelle];

  useEffect(() => {
    if (!quizCommence || afficherResultats) return;

    const tempsParQuestion = niveau === "facile" ? 30 : niveau === "moyen" ? 42 : 60;
    const totalQuestions = quizFiltre.reduce((acc, cat) => acc + cat.questions.length, 0);
    const tempsTotal = totalQuestions * tempsParQuestion;

    if (tempsRestant === 0) {
      setTempsRestant(tempsTotal);
    }

    const timer = setInterval(() => {
      setTempsRestant((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          if (!afficherResultats) {
            setModalMessage("Le temps est écoulé !");
            calculerScore();
            setAfficherResultats(true);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizCommence, quizFiltre, niveau, afficherResultats]);

  const repondre = (reponse) => {
    dispatch(repondreQuestion(categorieActuelle, questionActuelle, reponse));
  };

  const questionSuivante = () => {
    if (questionActuelle < categorie.questions.length - 1) {
      setQuestionActuelle(questionActuelle + 1);
    } else if (categorieActuelle < quizFiltre.length - 1) {
      setCategorieActuelle(categorieActuelle + 1);
      setQuestionActuelle(0);
    }
  };

  const questionPrecedente = () => {
    if (questionActuelle > 0) {
      setQuestionActuelle(questionActuelle - 1);
    } else if (categorieActuelle > 0) {
      setCategorieActuelle(categorieActuelle - 1);
      setQuestionActuelle(quizFiltre[categorieActuelle - 1].questions.length - 1);
    }
  };

  const calculerScore = () => {
    let total = 0;
    quizFiltre.forEach((categorie, indexCategorie) => {
      categorie.questions.forEach((question, indexQuestion) => {
        if (reponsesUtilisateur[indexCategorie]?.[indexQuestion] === question.reponse) {
          total++;
        }
      });
    });
    setScore(total);
  };

  const recommencerQuiz = () => {
    setShowConfirmationModal(true);
  };

  const handleRecommencerQuiz = () => {
    setCategorieActuelle(0);
    setQuestionActuelle(0);
    setScore(0);
    setAfficherResultats(false);
    setAfficherDetails(false);
    setAfficherChoixRecommencer(false);
    setTempsRestant(0);
    setAfficherIndice(false);
    setShowConfirmationModal(false);
  };

  const handleChoisirAutresSujets = () => {
    dispatch(reinitialiserQuiz());
    setQuizCommence(false);
    setCategorieActuelle(0);
    setQuestionActuelle(0);
    setScore(0);
    setAfficherResultats(false);
    setAfficherDetails(false);
    setAfficherChoixRecommencer(false);
    setTempsRestant(0);
    setAfficherIndice(false);
    setShowConfirmationModal(false);
  };

  const handleCancelRecommencer = () => {
    setShowConfirmationModal(false);
  };

  const toutesRepondues = quizFiltre.every((categorie, indexCategorie) => {
    return categorie.questions.every((_, indexQuestion) => {
      return reponsesUtilisateur[indexCategorie]?.[indexQuestion] !== undefined;
    });
  });

  const formatTemps = (temps) => {
    const minutes = Math.floor(temps / 60);
    const secondes = temps % 60;
    return `${minutes}:${secondes < 10 ? `0${secondes}` : secondes}`;
  };

  if (!quizCommence) {
    return (
      <SelectionSujets
        demarrerQuiz={(options) => {
          setNombreQuestions(options.nombreQuestions);
          setNiveau(options.niveau);
          setQuizCommence(true);
          setAfficherResultats(false);
        }}
      />
    );
  }

  if (quizFiltre.length === 0) {
    return (
      <div className="quiz-container">
        <h2>Aucune catégorie sélectionnée</h2>
        <p>Veuillez sélectionner au moins un sujet pour commencer le quiz.</p>
        <button onClick={() => setQuizCommence(false)}>Retour à la sélection des sujets</button>
      </div>
    );
  }

  if (afficherResultats) {
    const totalQuestions = quizFiltre.reduce((acc, cat) => acc + cat.questions.length, 0);
    const pourcentageScore = ((score / totalQuestions) * 100).toFixed(2);

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="resultats"
      >
        <h2>Résultats du quiz</h2>
        <div className="score-progress">
          <div className="progress-bar">
            <motion.div
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${pourcentageScore}%` }}
              transition={{ duration: 1 }}
            ></motion.div>
          </div>
          <p>{pourcentageScore}% de bonnes réponses</p>
          <p>
            Vous avez répondu correctement à <strong>{score}</strong> questions sur{" "}
            <strong>{totalQuestions}</strong>.
          </p>
        </div>
        <div className="resultats-actions">
          <button onClick={() => setAfficherDetails(!afficherDetails)}>
            {afficherDetails ? "Masquer les détails" : "Voir les détails"}
          </button>
          <button onClick={recommencerQuiz}>Recommencer</button>
        </div>
        {afficherDetails && (
          <div className="details">
            {quizFiltre.map((categorie, indexCategorie) => {
              const bonnesReponses = categorie.questions.reduce((acc, question, indexQuestion) => {
                return (
                  acc +
                  (reponsesUtilisateur[indexCategorie]?.[indexQuestion] === question.reponse ? 1 : 0)
                );
              }, 0);

              return (
                <div key={indexCategorie} className="categorie-resultats">
                  <h3>
                    {categorie.categorie} ({bonnesReponses} / {categorie.questions.length})
                  </h3>
                  {categorie.questions.map((question, indexQuestion) => {
                    const estCorrect =
                      reponsesUtilisateur[indexCategorie]?.[indexQuestion] === question.reponse;
                    return (
                      <div key={indexQuestion} className="question-resultat">
                        <p>
                          <strong>Question {indexQuestion + 1}:</strong> {question.question}
                        </p>
                        <p>
                          <strong>Votre réponse :</strong>{" "}
                          {reponsesUtilisateur[indexCategorie]?.[indexQuestion] || "Aucune réponse"}{ " "}
                          {estCorrect ? "✅" : "❌"}
                        </p>
                        <p>
                          <strong>Réponse correcte :</strong> {question.reponse}
                        </p>
                        <hr />
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}
        {showConfirmationModal && (
          <ConfirmationModal
            message="Que souhaitez-vous faire ?"
            onRecommencerQuiz={handleRecommencerQuiz}
            onChoisirAutresSujets={handleChoisirAutresSujets}
            onCancel={handleCancelRecommencer}
          />
        )}
      </motion.div>
    );
  }

  return (
    <div className="quiz-container">
      <h1>{categorie.categorie}</h1>
      <div className="chronometre">
        Temps restant : {formatTemps(tempsRestant)}
      </div>
      <div className="progression">
        Question {questionActuelle + 1} / {categorie.questions.length}
      </div>
      <BarreProgression
        questions={categorie.questions}
        reponsesUtilisateur={reponsesUtilisateur}
        categorieActuelle={categorieActuelle}
      />
      <Question
        question={question.question}
        options={question.options}
        indice={question.indice}
        repondre={repondre}
        afficherIndice={afficherIndice}
      />
      <div className="controles">
        <button onClick={questionPrecedente} disabled={questionActuelle === 0}>
          <FaArrowLeft /> Précédent
        </button>
        <button onClick={() => setAfficherIndice(!afficherIndice)}>
          <FaLightbulb /> Indice
        </button>
        <button
          onClick={() => {
            if (questionActuelle === categorie.questions.length - 1 && categorieActuelle === quizFiltre.length - 1) {
              if (toutesRepondues) {
                calculerScore();
                setAfficherResultats(true);
              } else {
                setModalMessage("Veuillez répondre à toutes les questions avant de terminer le quiz.");
              }
            } else {
              questionSuivante();
            }
          }}
        >
          {questionActuelle === categorie.questions.length - 1 && categorieActuelle === quizFiltre.length - 1
            ? "Terminer"
            : "Suivant"}{ " "}
          <FaArrowRight />
        </button>
      </div>

      {modalMessage && (
        <Modal message={modalMessage} onClose={() => setModalMessage(null)} />
      )}
    </div>
  );
};

export default Quiz;