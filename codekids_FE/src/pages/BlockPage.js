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

function BlockPage() {
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
      // 실제 서버 호출처럼 약간의 지연
      await new Promise((resolve) => setTimeout(resolve, 500));

      const mockData = mockProblemDetails[problemId];
      if (mockData && mockData.levels && mockData.levels[0]) {
        const level1Data = mockData.levels[0];
        setProblemData({
          problem_title: `문제 ${problemId}: ${level1Data.title}`,
          problem_detail_title: level1Data.title,
          hint: level1Data.hint,
          answer: level1Data.answer,
        });
        setIsBlocklyVisible(true);
      } else {
        // 기본 더미 데이터
        setProblemData({
          problem_title: `문제 ${problemId}: 블록 코딩 문제`,
          problem_detail_title: "블록을 조합해서 문제를 해결해보세요!",
          hint: "블록들을 드래그해서 조합해보세요. 힌트: 순서가 중요해요!",
          answer: "더미답안",
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

    // 더미 검증 로직 (실제로는 서버에서 검증)
    const checkAnswer = () => {
      // 간단한 더미 검증: 코드가 비어있지 않으면 성공
      if (code.trim().length > 10) {
        showSPopup();
      } else {
        showFPopup();
      }
    };

    // 실제 서버 호출처럼 약간의 지연
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

  const modalTitle = "대단해요!! 문제 해결에 성공했어요!!";
  const modalButtonName = "다음 단계로~";
  const modalLink = `${path}/next`;

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
        {problemId === 1 && (
          <>
            <category name="계산기 블록" colour="#D9E6F6">
              <block type="controls_if"></block>
              <block type="logic_compare">
                <field name="OP">EQ</field>
              </block>
              <block type="math_arithmetic">
                <field name="OP">ADD</field>
                <value name="A">
                  <shadow type="math_number">
                    <field name="NUM">1</field>
                  </shadow>
                </value>
                <value name="B">
                  <shadow type="math_number">
                    <field name="NUM">1</field>
                  </shadow>
                </value>
              </block>
              <block type="variables_get">
                <field name="VAR" id="E+w7.Xmx;t@-~$*1DEO7">
                  숫자1
                </field>
              </block>
              <block type="text">
                <field name="TEXT"></field>
              </block>
              <block type="variables_get">
                <field name="VAR" id="=F{`dUrTFSEK2k4K?!:/">
                  숫자2
                </field>
              </block>
              <block type="variables_set">
                <field name="VAR" id="iFyn.V3zDj}d9^66+C.)">
                  결과
                </field>
              </block>
              <block type="variables_get">
                <field name="VAR" id="9FOR:DS7ViPcAS?O9k.J">
                  연산자
                </field>
              </block>
              <block type="variables_get">
                <field name="VAR" id="iFyn.V3zDj}d9^66+C.)">
                  결과
                </field>
              </block>
            </category>
            <category
              name="Variables"
              colour="#F2D9F6"
              custom="VARIABLE"
            ></category>
          </>
        )}
        {problemId === 2 && (
          <>
            <category name="계산기 블록" colour="#D9E6F6">
              <Block type="absclass" />
              <Block type="cal()" />
              <Block type="figure" />
            </category>
          </>
        )}
        {problemId === 3 && (
          <>
            <category name="도형 블록" colour="#FFE6CC">
              <Block type="interface" />
              <Block type="sound()" />
              <Block type="animal" />
            </category>
          </>
        )}
        {problemId === 4 && (
          <>
            <category name="동물 블록" colour="#E6F3FF">
              <Block type="interface" />
              <Block type="sound()" />
              <Block type="animal" />
            </category>
          </>
        )}
        {problemId === 5 && (
          <>
            <category name="로봇 블록" colour="#FFE6E6">
              <Block type="interface" />
              <Block type="on()" />
              <Block type="off()" />
              <Block type="robot" />
            </category>
          </>
        )}
        {problemId === 6 && (
          <>
            <category name="연극 블록" colour="#F0E6FF">
              <Block type="interface" />
              <Block type="move()" />
              <Block type="attack()" />
              <Block type="game" />
            </category>
          </>
        )}
      </BlocklyComponent>
    ),
    [resetKey, problemId],
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

export default BlockPage;
