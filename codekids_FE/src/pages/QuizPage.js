import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { mockQuizzes } from "../data/mockData";
import "./QuizPage.css";

const QuizPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const concept = location.state?.concept || "추상화";
  const concept_eng = location.state?.concept_eng || "abstract";
  const problemId = location.state?.problemId || 5;
  const path = location.pathname;
  const [quizData, setQuizData] = useState([]);

  useEffect(() => {
    const loadQuizData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const quizzes = mockQuizzes[concept_eng] || mockQuizzes.abstract;
      setQuizData(quizzes);
    };

    loadQuizData();
  }, [concept_eng]);

  // Maintain an array to store the active state for each OX question
  const [oxBtnActive, setOxBtnActive] = useState([]);

  // Maintain an object to store the active state for each MULTI question's buttons
  const [multiBtnActive, setMultiBtnActive] = useState({});

  // Function to toggle the active state for the specific OX question button clicked
  const toggleOxActive = (questionIdx, answer) => {
    setOxBtnActive((prev) => ({
      ...prev,
      [questionIdx]: answer,
    }));
  };

  // Function to toggle the active state for the specific MULTI question button clicked
  const toggleMultiActive = (questionIdx, choiceIdx) => {
    setMultiBtnActive((prev) => ({
      ...prev,
      [questionIdx]: choiceIdx,
    }));
  };

  // Function to handle form submission
  const handleSubmit = () => {
    const result = quizData.map((item, idx) => {
      var userAnswer;
      if (item.quizType === "OX") {
        userAnswer = oxBtnActive[idx] || "No answer selected";
      } else if (item.quizType === "MULTI") {
        userAnswer =
          multiBtnActive[idx] !== undefined
            ? item.multichoose[multiBtnActive[idx]].choice
            : "No answer selected";
      }

      // userAnswer가 문자열이 아닐 경우를 대비하여 문자열로 변환
      if (typeof userAnswer !== "string") {
        userAnswer = String(userAnswer);
      }

      var correctAnswer =
        item.quizType === "OX"
          ? item.answer === "CORRECT"
            ? "O"
            : "X"
          : item.answer;
      if (typeof correctAnswer !== "string") {
        correctAnswer = String(correctAnswer);
      }
      const isCorrect = Object.is(
        userAnswer.trim().toLowerCase(),
        correctAnswer.trim().toLowerCase(),
      );

      return {
        questionTitle: item.title,
        questionType: item.quizType,
        questionMulti: item.multichoose,
        questionId: item.id,
        questiondescription: item.description,
        userAnswer,
        correctAnswer,
        isCorrect,
      };
    });
    navigate(`${path}/check`, { state: { problemId, concept, result } });
  };

  var index = 0;
  const whatQuizType = () => {
    const qt = quizData[index]?.quizType;
    index++;
    if (qt === "OX") {
      return true;
    } else return false;
  };

  if (quizData.length === 0) {
    return (
      <div
        className="BlockPage"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div>퀴즈를 불러오는 중...</div>
      </div>
    );
  }

  return (
    <div className="BlockPage">
      <div className="Quizdiv">
        <h1 className="Quiz">개념 퀴즈</h1>
      </div>
      <span className="check">
        지금까지 공부한 {concept} 얼마나 잘 이해하고 있는지 확인해보세요.
      </span>
      {quizData.map((item, idx) => (
        <React.Fragment key={idx}>
          <div className="topdiv">
            <span className="Q">Q</span>
            <span className="quiztitle">{item.title}</span>
          </div>
          <div className="bottomdiv">
            {whatQuizType() ? (
              <>
                <button
                  className={
                    "OXBtn" + (oxBtnActive[idx] === "O" ? " active" : "")
                  }
                  onClick={() => toggleOxActive(idx, "O")}
                >
                  O
                </button>
                <button
                  className={
                    "OXBtn" + (oxBtnActive[idx] === "X" ? " active" : "")
                  }
                  onClick={() => toggleOxActive(idx, "X")}
                >
                  X
                </button>
              </>
            ) : (
              item.multichoose &&
              item.multichoose.length > 0 &&
              item.multichoose.map((choice, choiceIdx) => (
                <div key={choiceIdx}>
                  <button
                    className={
                      "fiveBtn" +
                      (multiBtnActive[idx] === choiceIdx ? " active" : "")
                    }
                    onClick={() => toggleMultiActive(idx, choiceIdx)}
                  >
                    {choice.choice}.
                  </button>
                  <span className="fivetext">{choice.detail}</span>
                </div>
              ))
            )}
          </div>
        </React.Fragment>
      ))}
      <button className="goBtn" onClick={handleSubmit}>
        제출
      </button>
    </div>
  );
};

export default QuizPage;
