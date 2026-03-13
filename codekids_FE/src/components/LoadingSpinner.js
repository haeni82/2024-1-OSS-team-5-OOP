import React from "react";

const LoadingSpinner = ({ message = "로딩 중..." }) => {
  const spinnerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "200px",
    gap: "20px",
  };

  const spinStyle = {
    width: "40px",
    height: "40px",
    border: "4px solid #f3f3f3",
    borderTop: "4px solid #4CAF50",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  };

  const textStyle = {
    color: "#666",
    fontSize: "16px",
  };

  return (
    <>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <div style={spinnerStyle}>
        <div style={spinStyle}></div>
        <p style={textStyle}>{message}</p>
      </div>
    </>
  );
};

export default LoadingSpinner;
