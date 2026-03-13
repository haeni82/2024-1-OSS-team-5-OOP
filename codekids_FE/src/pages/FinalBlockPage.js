import React, { useState, useRef, useEffect, useMemo } from "react";
import "./BlockPage.css";
import BlocklyComponent, { Block } from "../Blockly";
import "../blocks/customblocks";
import "../generator/generator";
import { javascriptGenerator } from "blockly/javascript";
import { FaPlay, FaQuestion, FaRedo } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { mockProblemDetails } from "../data/mockData";
import HintModal from "./HintModal.js";
import SuccessModal from "./SuccessModal.js";
import FailureModal from "./FailureModal.js";

function FinalBlockPage() {
  const location = useLocation();
  const primaryWorkspace = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSModalOpen, setIsSModalOpen] = useState(false);
  const [isFModalOpen, setIsFModalOpen] = useState(false);
  const [problemData, setProblemData] = useState(null);
  const [isBlocklyVisible, setIsBlocklyVisible] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const concept_eng = location.state?.concept_eng || "abstract";
  const concept = location.state?.concept || "추상화";
  const problemId = location.state?.problemId || 5;
  const path = location.pathname;

  useEffect(() => {
    const loadProblemData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const mockData = mockProblemDetails[problemId];
      if (mockData && mockData.levels && mockData.levels[2]) {
        const level3Data = mockData.levels[2];
        setProblemData({
          problem_title: `문제 ${problemId} - 3단계: ${level3Data.title}`,
          problem_detail_title: level3Data.title,
          hint: level3Data.hint,
          answer: level3Data.answer,
        });
        setIsBlocklyVisible(true);
      } else {
        setProblemData({
          problem_title: `문제 ${problemId} - 3단계: 최종 도전`,
          problem_detail_title:
            "모든 지식을 활용해서 최종 문제를 해결해보세요!",
          hint: "지금까지 배운 모든 것을 종합해보세요!",
          answer: "더미답안3",
        });
        setIsBlocklyVisible(true);
      }
    };

    loadProblemData();
  }, [problemId]);

  const generateCode = () => {
    const code = String(
      javascriptGenerator.workspaceToCode(primaryWorkspace.current),
    );
    console.log("생성된 코드:", code);

    const checkAnswer = () => {
      if (code.trim().length > 15) {
        showSPopup();
      } else {
        showFPopup();
      }
    };

    setTimeout(checkAnswer, 800);
  };

  const modalContent = problemData?.hint || "힌트를 불러오는 중...";

  const showPopup = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const showSPopup = () => {
    setIsSModalOpen(true);
  };

  const closeSModal = () => {
    setIsSModalOpen(false);
  };

  const showFPopup = () => {
    setIsFModalOpen(true);
  };

  const closeFModal = () => {
    setIsFModalOpen(false);
  };

  const FmodalTitle = "문제를 해결하지 못했어요ㅠㅠ!";
  const FmodalButtonName = "이론 페이지로~";
  const FmodalLink = `/tutorial/${concept_eng}`;

  const modalTitle = "축하합니다!! 모든 문제를 해결했어요!!";
  const modalButtonName = "퀴즈 풀러가기~";
  const modalLink = `${path}/quiz`;

  const resetWorkspace = () => {
    setResetKey((prevKey) => prevKey + 1);
  };

  const memoizedBlocklyComponent = useMemo(
    () => (
      <BlocklyComponent
        key={resetKey}
        ref={primaryWorkspace}
        readOnly={false}
        trashcan={true}
        media={"/media"}
        move={{
          scrollbars: true,
          drag: true,
          wheel: true,
        }}
        grid={{
          spacing: 20,
          length: 3,
          colour: "#ccc",
          snap: true,
        }}
        zoom={{
          controls: true,
          wheel: true,
          startScale: 1.0,
          maxScale: 3,
          minScale: 0.3,
          scaleSpeed: 1.2,
          pinch: true,
        }}
        initialXml={`<xml xmlns="http://www.w3.org/1999/xhtml"></xml>`}
      >
        <category name="최종 블록" colour="#FFE6E6">
          <Block type="interface" />
          <Block type="on()" />
          <Block type="off()" />
          <Block type="robot" />
          <Block type="main" />
          <Block type="objectname" />
        </category>
      </BlocklyComponent>
    ),
    [resetKey],
  );

  if (!problemData) {
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
        <div>문제를 불러오는 중...</div>
      </div>
    );
  }

  return (
    <div className="BlockPage">
      <HintModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        body={modalContent}
      />
      <div className="div1">
        <p className="problemtitle">{problemData.problem_title}</p>
      </div>
      <div className="quizdiv">
        <img
          className="quizImg"
          src={`${process.env.PUBLIC_URL}/quiz.png`}
          alt="Quiz"
        />
        <span className="quiz">{problemData.problem_detail_title}</span>
      </div>

      {isBlocklyVisible && memoizedBlocklyComponent}

      <SuccessModal
        isOpen={isSModalOpen}
        closeModal={closeSModal}
        title={modalTitle}
        buttonName={modalButtonName}
        modalLink={modalLink}
        problemId={problemId}
        concept_eng={concept_eng}
        concept={concept}
      />
      <FailureModal
        isOpen={isFModalOpen}
        closeModal={closeFModal}
        title={FmodalTitle}
        buttonName={FmodalButtonName}
        modalLink={FmodalLink}
      />

      <div className="btnBox">
        <button className="hintBtn" onClick={showPopup}>
          <FaQuestion className="FaPlayBtn" size="30" color="#FFD15B" />
          <span className="Btn">힌트</span>
        </button>
        <button className="convertBtn" onClick={generateCode}>
          <FaPlay className="FaPlayBtn" size="30" color="#20CF26" />
          <span className="Btn">실행하기</span>
        </button>
        <button className="resetBtn" onClick={resetWorkspace}>
          <FaRedo className="FaPlayBtn" size="30" color="#EF4538" />
          <span className="Btn">되돌리기</span>
        </button>
      </div>
    </div>
  );
}

export default FinalBlockPage;
