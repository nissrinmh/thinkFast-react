import React, { useState } from "react";
import { motion } from "framer-motion";

const Question = ({ question, options, indice, repondre, afficherIndice }) => {
  const [reponseSelectionnee, setReponseSelectionnee] = useState(null);

  const selectionnerReponse = (reponse) => {
    setReponseSelectionnee(reponse);
    repondre(reponse);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="question"
    >
      <h2>{question}</h2>
      {afficherIndice && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="indice"
        >
          {indice}
        </motion.div>
      )}
      <div className="options">
        {options.map((option, index) => (
          <motion.button
            key={index}
            onClick={() => selectionnerReponse(option)}
            className={reponseSelectionnee === option ? "selected" : ""}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {option}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default Question;