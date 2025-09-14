import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Quiz from "./components/quiz/quiz";
import AjouterQuiz from "./components/quiz/ajouterQuiz/ajouterquiz";
import Header from "./components/Layouts/Header";
import QuizPersonnalises from "./components/quiz/ajouterQuiz/quizPersonnalises";
import SignIn from "./components/Contact/SignIn";
import SignUp from "./components/Contact/SignUp";
import ForgetPassword from "./components/Contact/ForgetPassword";
import ListCardCategory from "./components/Category/ListCardCategory";
import About from "./components/Acceuil/About";
import Home from "./components/Acceuil/Home";
import "./styles.css";

function App() {
  // const [theme, setTheme] = useState("light");

  // const toggleTheme = () => {
  //   const newTheme = theme === "light" ? "dark" : "light";
  //   setTheme(newTheme);
  //   document.body.className = newTheme; 
  // };

  // useEffect(() => {
  //   document.body.className = theme; 
  // }, [theme]);

  return (
    <Router>
      {/* <div className={`App ${theme}`}>
        <div className="theme-toggle">
          <label>
            <input
              type="checkbox"
              checked={theme === "dark"}
              onChange={toggleTheme}
            />
            <span className="slider"></span>
          </label>
          <span className="slider-label">
            {theme === "light" ? "Mode Sombre" : "Mode Clair"}
          </span>
        </div> */}
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/ajouter-quiz" element={<AjouterQuiz />} />
          <Route path="/quiz-personnalises" element={<QuizPersonnalises />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/about" element={<About />} />
          <Route path="/listcardcategory" element={<ListCardCategory />} />
        </Routes>
      {/* </div> */}
    </Router>
  );
}

export default App;