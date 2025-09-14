import React from "react";
import { motion } from "framer-motion";

const Modal = ({ message, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="modal-overlay"
    >
      <div className="modal-content">
        <p>{message}</p>
        <button onClick={onClose}>Fermer</button>
      </div>
    </motion.div>
  );
};

export default Modal;