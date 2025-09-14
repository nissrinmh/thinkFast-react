import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectionnerSujets, selectionnerLangages } from "../../redux/actionCreators";
import Modal from "./modal";

const SelectionSujets = ({ demarrerQuiz }) => {
  const dispatch = useDispatch();
  const { sujetsSelectionnes, languagesSelectionnes } = useSelector((state) => state.quiz);
  const [etape, setEtape] = useState(1);
  const [nombreQuestions, setNombreQuestions] = useState(5);
  const [niveau, setNiveau] = useState("facile");
  const [modalMessage, setModalMessage] = useState(null);

  const languages = {
    frontend: ["React JS", "JavaScript", "HTML/CSS"],
    backend: ["Laravel", "PHP", "Node.js", "MongoDB", "MySQL"],
  };

  
  useEffect(() => {
    dispatch(selectionnerSujets({})); 
    dispatch(selectionnerLangages([])); 
  }, [dispatch]);

  const changerSujet = (sujet) => {
    const nouveauxSujets = { ...sujetsSelectionnes, [sujet]: !sujetsSelectionnes[sujet] };
    dispatch(selectionnerSujets(nouveauxSujets));
  };

  const changerLanguage = (language) => {
    const nouveauxLangages = languagesSelectionnes.includes(language)
      ? languagesSelectionnes.filter((lang) => lang !== language)
      : [...languagesSelectionnes, language];
    dispatch(selectionnerLangages(nouveauxLangages));
  };

  const passerAEtapeSuivante = () => {
    if (languagesSelectionnes.length === 0) {
      setModalMessage("Veuillez sélectionner au moins un langage/framework.");
      return;
    }
    setEtape(2);
  };

  const soumettre = () => {
    demarrerQuiz({ nombreQuestions, niveau });
  };

  return (
    <div className="selection-sujets">
      {etape === 1 ? (
        <>
          <h2>Choisissez vos sujets</h2>
          <div className="sujets">
            <label>
              <input
                type="checkbox"
                checked={sujetsSelectionnes.frontend || false}
                onChange={() => changerSujet("frontend")}
              />
              Front-end
            </label>
            <label>
              <input
                type="checkbox"
                checked={sujetsSelectionnes.backend || false}
                onChange={() => changerSujet("backend")}
              />
              Back-end
            </label>
          </div>

          {(sujetsSelectionnes.frontend || sujetsSelectionnes.backend) && (
            <div className="languages">
              <h3>Sélectionnez les langages/frameworks</h3>
              {sujetsSelectionnes.frontend &&
                languages.frontend.map((lang) => (
                  <label key={lang}>
                    <input
                      type="checkbox"
                      checked={languagesSelectionnes.includes(lang)}
                      onChange={() => changerLanguage(lang)}
                    />
                    {lang}
                  </label>
                ))}
              {sujetsSelectionnes.backend &&
                languages.backend.map((lang) => (
                  <label key={lang}>
                    <input
                      type="checkbox"
                      checked={languagesSelectionnes.includes(lang)}
                      onChange={() => changerLanguage(lang)}
                    />
                    {lang}
                  </label>
                ))}
            </div>
          )}

          <button onClick={passerAEtapeSuivante}>Suivant</button>
        </>
      ) : (
        <>
          <h2>Choisissez le nombre de questions et le niveau</h2>
          <div className="options-supplementaires">
            <label>
              Nombre de questions par sujet :
              <input
                type="number"
                value={nombreQuestions}
                onChange={(e) => setNombreQuestions(parseInt(e.target.value))}
                min="1"
                max="10"
              />
            </label>
            <label>
              Niveau des questions :
              <select value={niveau} onChange={(e) => setNiveau(e.target.value)}>
                <option value="facile">Facile</option>
                <option value="moyen">Moyen</option>
                <option value="difficile">Difficile</option>
              </select>
            </label>
          </div>
          <button onClick={soumettre}>Commencer le quiz</button>
        </>
      )}

      {modalMessage && (
        <Modal message={modalMessage} onClose={() => setModalMessage(null)} />
      )}
    </div>
  );
};

export default SelectionSujets;