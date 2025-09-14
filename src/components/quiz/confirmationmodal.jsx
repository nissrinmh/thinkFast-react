import React from "react";
import { motion } from "framer-motion";

const ConfirmationModal = ({ message, onRecommencerQuiz, onChoisirAutresSujets, onCancel }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="modal-overlay"
    >
      <div className="modal-content">
        <p>{message}</p>
        <div className="modal-buttons">
          <button onClick={onRecommencerQuiz}>Recommencer le même quiz</button>
          <button onClick={onChoisirAutresSujets}>Choisir d'autres sujets</button>
          <button onClick={onCancel}>Annuler</button>
        </div>
      </div>
    </motion.div>
  );
};

export default ConfirmationModal;