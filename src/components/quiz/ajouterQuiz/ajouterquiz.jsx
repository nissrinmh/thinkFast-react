import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ajouterQuizPersonnalise } from "../../../redux/actionCreators";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const AjouterQuiz = () => {
  const [etape, setEtape] = useState(1);
  const [categorie, setCategorie] = useState("");
  const [sousCategorie, setSousCategorie] = useState("");
  const [type, setType] = useState("");
  const [nombreQuestions, setNombreQuestions] = useState(5);
  const [questions, setQuestions] = useState([]);
  const [erreurNombreQuestions, setErreurNombreQuestions] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const frameworksEtLangages = {
    Frontend: {
      Frameworks: ["React", "Vue", "Angular"],
      Langages: ["JavaScript", "TypeScript"],
    },
    Backend: {
      Frameworks: ["Express", "Django", "Laravel"],
      Langages: ["Node.js", "Python", "PHP"],
    },
  };

  const choisirCategorie = (cat) => {
    setCategorie(cat);
    setEtape(2);
  };

  const choisirSousCategorie = (sousCat) => {
    setSousCategorie(sousCat);
    setEtape(3);
  };

  const choisirFrameworkOuLangage = (value) => {
    setType(value);
    setEtape(4);
  };

  const validerNombreQuestions = () => {
    if (nombreQuestions < 5 || nombreQuestions > 10) {
      setErreurNombreQuestions("Le nombre de questions doit être entre 5 et 10.");
      return false;
    }
    setErreurNombreQuestions("");
    return true;
  };

  const choisirNombreQuestions = () => {
    if (validerNombreQuestions()) {
      setEtape(5);
    }
  };

  const ajouterQuestion = (index, field, value) => {
    const newQuestions = [...questions];
    if (!newQuestions[index]) newQuestions[index] = { question: "", options: [], reponse: "" };
    newQuestions[index][field] = field === "options" ? value.split(",") : value;
    setQuestions(newQuestions);
  };

  const soumettreQuiz = () => {
    const quiz = {
      categorie,
      sousCategorie,
      type,
      questions,
    };
    dispatch(ajouterQuizPersonnalise(quiz));
    navigate("/quiz-personnalises");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="ajouter-quiz"
    >
      <h2>Ajouter un Quiz</h2>

      {etape === 1 && (
        <div>
          <h3>Choisissez une catégorie</h3>
          <button onClick={() => choisirCategorie("Frontend")}>Frontend</button>
          <button onClick={() => choisirCategorie("Backend")}>Backend</button>
        </div>
      )}

      {etape === 2 && (
        <div>
          <h3>Choisissez une sous-catégorie</h3>
          {Object.keys(frameworksEtLangages[categorie]).map((sousCat) => (
            <button key={sousCat} onClick={() => choisirSousCategorie(sousCat)}>
              {sousCat}
            </button>
          ))}
        </div>
      )}

      {etape === 3 && (
        <div>
          <h3>Choisissez un framework ou langage</h3>
          <select onChange={(e) => choisirFrameworkOuLangage(e.target.value)}>
            <option value="">Sélectionnez un framework ou langage</option>
            {frameworksEtLangages[categorie][sousCategorie].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
      )}

      {etape === 4 && (
        <div>
          <h3>Choisissez le nombre de questions</h3>
          <input
            type="number"
            value={nombreQuestions}
            onChange={(e) => setNombreQuestions(parseInt(e.target.value))}
            min="5"
            max="10"
          />
          {erreurNombreQuestions && <p className="erreur">{erreurNombreQuestions}</p>}
          <button onClick={choisirNombreQuestions}>Suivant</button>
        </div>
      )}

      {etape === 5 && (
        <div className="formulaire-questions">
          <h3>Ajoutez les questions</h3>
          {Array.from({ length: nombreQuestions }).map((_, index) => (
            <div key={index} className="question-form">
              <h4>Question {index + 1}</h4>
              <input
                type="text"
                placeholder="Question"
                onChange={(e) => ajouterQuestion(index, "question", e.target.value)}
              />
              <input
                type="text"
                placeholder="Options (séparées par des virgules)"
                onChange={(e) => ajouterQuestion(index, "options", e.target.value)}
              />
              <input
                type="text"
                placeholder="Réponse correcte"
                onChange={(e) => ajouterQuestion(index, "reponse", e.target.value)}
              />
            </div>
          ))}
          <button onClick={soumettreQuiz}>Soumettre le Quiz</button>
        </div>
      )}
    </motion.div>
  );
};

export default AjouterQuiz;