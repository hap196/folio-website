import React from "react";

const TestScore = ({ title, score, year }) => {
  return (
    <div className="text-md">
      <h1 className="font-semibold">{title}</h1>
      <h6>{score}</h6>
      <h6>{year}</h6>
    </div>
  );
};

export default TestScore;
