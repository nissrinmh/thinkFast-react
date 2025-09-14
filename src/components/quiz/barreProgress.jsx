import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const BarreProgression = ({ questions, reponsesUtilisateur, categorieActuelle }) => {
  const [pointsActives, setPointsActives] = useState([]);

  const getCouleurProgression = (index) => {
    const couleurs = ["#4ecdc4", "#ffd166", "#6b5b95"]; 
    return couleurs[index % couleurs.length]; 
  };

   useEffect(() => {
    const points = questions.map((_, index) => reponsesUtilisateur[categorieActuelle]?.[index] !== undefined);
    setPointsActives(points);
  }, [reponsesUtilisateur, categorieActuelle, questions]);

  return (
    <div className="barre-progression">
      {questions.map((_, index) => {
        const estActif = pointsActives[index]; 

        return (
          <motion.div
            key={index}
            className="point-progression"
            style={{
              backgroundColor: estActif ? getCouleurProgression(index) : "#87bfff", 
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          ></motion.div>
        );
      })}
    </div>
  );
};

export default BarreProgression;