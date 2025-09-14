import {
  SELECTIONNER_SUJETS,
  SELECTIONNER_LANGUAGES,
  REPONDRE_QUESTION,
  REINITIALISER_QUIZ,
  AJOUTER_QUIZ,
  AJOUTER_QUIZ_PERSONNALISE
} from "./actionTypes";

export const selectionnerSujets = (sujets) => ({
  type: SELECTIONNER_SUJETS,
  payload: sujets,
});

export const selectionnerLangages = (languages) => ({
  type: SELECTIONNER_LANGUAGES,
  payload: languages,
});

export const reinitialiserQuiz = () => ({
  type: REINITIALISER_QUIZ,
});


export const ajouterQuiz = (quiz) => ({
  type: AJOUTER_QUIZ,
  payload: quiz,
});
export const ajouterQuizPersonnalise = (quiz) => ({
  type: AJOUTER_QUIZ_PERSONNALISE,
  payload: quiz,
});
export const repondreQuestion = (categorieIndex, questionIndex, reponse) => ({
  type: REPONDRE_QUESTION,
  payload: { categorieIndex, questionIndex, reponse },
});