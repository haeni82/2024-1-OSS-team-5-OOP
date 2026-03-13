import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockTutorials } from "../data/mockData";
import LoadingSpinner from "../components/LoadingSpinner";
import "./ButtonList.css";

const TutorialPage = () => {
  const navigate = useNavigate();
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 서버 호출 시뮬레이션
    const loadTutorials = async () => {
      setLoading(true);
      // 실제 서버 호출처럼 약간의 지연
      await new Promise((resolve) => setTimeout(resolve, 800));
      setTutorials(mockTutorials);
      setLoading(false);
    };

    loadTutorials();
  }, []);

  const handleBoxClick = (id) => {
    const tutorial = tutorials.find((item) => item.id === id);
    if (tutorial?.concept_eng) {
      navigate(`/tutorial/${tutorial.concept_eng}`);
    }
  };

  if (loading) {
    return (
      <div className="content" style={{ height: "55%" }}>
        <LoadingSpinner message="튜토리얼을 불러오는 중..." />
      </div>
    );
  }

  return (
    <div className="content" style={{ height: "55%" }}>
      <div className="box-container">
        {tutorials.map((item) => (
          <div
            className="box"
            key={item.id}
            onClick={() => handleBoxClick(item.id)}
          >
            <img
              src={item.imageUrl}
              alt={item.problemTitle}
              className="box-image"
            />
            <div className="title">
              <p>{item.concept}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TutorialPage;
