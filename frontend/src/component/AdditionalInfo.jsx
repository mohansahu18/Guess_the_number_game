import React from "react";

const AdditionalInfo = ({ message, attempts, score, highScore }) => {
  return (
    <div>
      {message && <p className="mb-4 text-center font-bold">{message}</p>}
      <p className="mb-2">Wrong Attempts: {attempts}</p>
      <p className="mb-2">Score: {score}</p>
      <p className="mb-4">High Score: {highScore}</p>
    </div>
  );
};

export default AdditionalInfo;
