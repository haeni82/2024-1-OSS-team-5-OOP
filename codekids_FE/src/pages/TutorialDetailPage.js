import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { mockTutorialDetails } from "../data/mockData";
import LoadingSpinner from "../components/LoadingSpinner";
import "./TutorialDetailPage.css";
import SuccessModal from "./SuccessModal.js";

const TutorialDetailPage = () => {
  const { concept } = useParams();
  const [tutorialData, setTutorialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadTutorial = async () => {
      setLoading(true);
      // 실제 서버 호출처럼 약간의 지연
      await new Promise((resolve) => setTimeout(resolve, 500));

      const tutorial = mockTutorialDetails[concept];
      if (tutorial) {
        // 더미 데이터를 기존 구조에 맞게 변환
        const formattedTutorial = {
          ...tutorial,
          description: [
            tutorial.content,
            `예시 1: ${tutorial.examples[0]}`,
            `예시 2: ${tutorial.examples[1]}`,
            `예시 3: ${tutorial.examples[2]}`,
            "이제 문제를 풀어보세요!",
          ],
          imageUrl: [
            tutorial.imageUrl,
            tutorial.imageUrl,
            tutorial.imageUrl,
            tutorial.imageUrl,
            tutorial.imageUrl,
          ],
        };
        setTutorialData(formattedTutorial);
      }
      setLoading(false);
    };

    loadTutorial();
  }, [concept]);

  const nextDescription = useCallback(() => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex(
        (prevIndex) =>
          (prevIndex + 1) % (tutorialData?.description.length || 0),
      );
      setIsFading(false);
    }, 500);
  }, [tutorialData]);

  const showPopup = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetTutorial();
  };

  const resetTutorial = () => {
    setCurrentIndex(0);
    setIsModalOpen(false);
    if (tutorialData) {
      const interval = setInterval(nextDescription, 5000);
      const timeout = setTimeout(
        () => {
          clearInterval(interval);
          showPopup();
        },
        (tutorialData?.description.length || 0) * 5000,
      );

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  };

  const modalTitle = "학습을 완료했어요!";
  const modalButtonName = "문제 풀러가기";
  const modalLink = `/problems/${concept}`;

  useEffect(() => {
    if (tutorialData) {
      const interval = setInterval(nextDescription, 5000);
      const timeout = setTimeout(
        () => {
          clearInterval(interval);
          showPopup();
        },
        (tutorialData?.description.length || 0) * 5000,
      );

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [tutorialData, nextDescription]);

  if (loading) {
    return (
      <div className="content" style={{ height: "calc(100% - 120px)" }}>
        <LoadingSpinner message="튜토리얼을 불러오는 중..." />
      </div>
    );
  }

  if (!tutorialData) {
    return (
      <div className="content" style={{ height: "calc(100% - 120px)" }}>
        <div style={{ textAlign: "center", padding: "50px" }}>
          <h2>튜토리얼을 찾을 수 없습니다.</h2>
          <p>요청하신 튜토리얼이 존재하지 않습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="content" style={{ height: "calc(100% - 120px)" }}>
      <div className="image-container">
        <img
          src={tutorialData.imageUrl[currentIndex]}
          className={`image ${isFading ? "fade-out" : "fade-in"}`}
          alt="Tutorial"
        />
        <img
          src="/skip.png"
          className={`nextbutton ${isFading ? "fade-out" : "fade-in"}`}
          onClick={showPopup}
          alt="건너뛰기 버튼"
        />
      </div>
      <div className="description-container">
        <div>
          <p className={`description ${isFading ? "fade-out" : "fade-in"}`}>
            {tutorialData.description[currentIndex]}
          </p>
        </div>
      </div>
      <SuccessModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        title={modalTitle}
        buttonName={modalButtonName}
        modalLink={modalLink}
        problemId=""
        concept_eng=""
        concept=""
      />
    </div>
  );
};

export default TutorialDetailPage;
