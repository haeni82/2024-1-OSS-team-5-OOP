import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mockProblems } from "../data/mockData";
import LoadingSpinner from "../components/LoadingSpinner";
import "./ButtonList.css";
import MediaQuery from "./alignlist.module.css";

const ProblemPage = () => {
  const { concept } = useParams();
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProblems = async () => {
      setLoading(true);
      // 실제 서버 호출처럼 약간의 지연
      await new Promise((resolve) => setTimeout(resolve, 600));

      let filteredProblems = mockProblems;
      if (concept) {
        filteredProblems = mockProblems.filter(
          (problem) => problem.concept_eng === concept,
        );
      }

      setProblems(filteredProblems);
      setLoading(false);
    };

    loadProblems();
  }, [concept]);

  const handleBoxClick = (problemId, concept_eng, concept) => {
    navigate(`/problems/block/${problemId}`, {
      state: { problemId, concept_eng, concept },
    });
  };

  const isSolved = () => {
    return (
      <div className="solved">
        <img src="/solved.png" className="solvedIcon" alt="문제 해결 완료" />
      </div>
    );
  };

  if (loading) {
    return (
      <div className="content" style={{ height: "calc(100% - 120px)" }}>
        <LoadingSpinner message="문제를 불러오는 중..." />
      </div>
    );
  }

  return (
    <div className="content" style={{ height: "calc(100% - 120px)" }}>
      <div className={MediaQuery["box-container"]}>
        <div className="inner-container">
          {problems.map((item) => (
            <div
              key={item.problemId}
              className="box"
              onClick={() =>
                handleBoxClick(item.problemId, item.concept_eng, item.concept)
              }
            >
              {localStorage.getItem(item.problemId) ? isSolved() : null}
              <img
                src={item.imageUrl}
                alt={item.problemTitle}
                className="box-image"
              />
              <div className="title">
                <p>{item.problemTitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProblemPage;
