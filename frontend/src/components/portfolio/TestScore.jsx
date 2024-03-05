import React from "react";

const TestScore = ({ testName, score, grade, dateTaken }) => {
  return (
    <div className="text-md">
      <h1 className="font-semibold">{testName}</h1>
      <h6>{score}</h6>
      <h6>{new Date(dateTaken).toLocaleDateString()}</h6>
    </div>
  );
};

export default TestScore;
