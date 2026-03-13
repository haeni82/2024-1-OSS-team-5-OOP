import React from "react";

const DemoNotice = () => {
  const noticeStyle = {
    position: "fixed",
    top: "10px",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "#2196F3",
    color: "white",
    padding: "10px 20px",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: "bold",
    zIndex: 1000,
    boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
    animation: "bounce 2s infinite",
  };

  return (
    <>
      <style>
        {`
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
              transform: translateX(-50%) translateY(0);
            }
            40% {
              transform: translateX(-50%) translateY(-10px);
            }
            60% {
              transform: translateX(-50%) translateY(-5px);
            }
          }
        `}
      </style>
      <div style={noticeStyle}>🎮 데모 모드 - 더미 데이터로 실행 중</div>
    </>
  );
};

export default DemoNotice;
