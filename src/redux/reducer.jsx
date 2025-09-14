import {
  SELECTIONNER_SUJETS,
  SELECTIONNER_LANGUAGES,
  REPONDRE_QUESTION,
  REINITIALISER_QUIZ,
  AJOUTER_QUIZ,
  AJOUTER_QUIZ_PERSONNALISE
} from "./actionTypes";

const initialState = {
  quizList: [],
  quizPersonnalises: [],
  sujetsSelectionnes: {
    frontend: false,
    backend: false,
  },
  languagesSelectionnes: [],
  reponsesUtilisateur: {},
};

const quizReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECTIONNER_SUJETS:
      return {
        ...state,
        sujetsSelectionnes: action.payload,
      };
    case SELECTIONNER_LANGUAGES:
      return {
        ...state,
        languagesSelectionnes: action.payload,
      };
    case REPONDRE_QUESTION:
      return {
        ...state,
        reponsesUtilisateur: {
          ...state.reponsesUtilisateur,
          [action.payload.categorieIndex]: {
            ...state.reponsesUtilisateur[action.payload.categorieIndex],
            [action.payload.questionIndex]: action.payload.reponse,
          },
        },
      };
      case AJOUTER_QUIZ:
      return {
        ...state,
        quizList: [...state.quizList, action.payload],
      };
      case AJOUTER_QUIZ_PERSONNALISE:
      return {
        ...state,
        quizPersonnalises: [...state.quizPersonnalises, action.payload],
      };
    case REINITIALISER_QUIZ:
      return initialState; 
    default:
      return state;
  }
};

export default quizReducer;