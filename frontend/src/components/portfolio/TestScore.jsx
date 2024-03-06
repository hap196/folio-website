import React from 'react';
import { FaPencilAlt } from 'react-icons/fa';

const TestScore = ({ testScore, isEditMode, onEdit }) => {
  return (
    <div className="flex justify-between items-center w-full">
      <div className="text-md">
        <h1 className="font-semibold">{testScore.testName}</h1>
        <h6>{testScore.score}</h6>
        <h6>{new Date(testScore.dateTaken).toLocaleDateString()}</h6>
      </div>
      {isEditMode && (
        <button onClick={() => onEdit(testScore)} className="p-2 text-gray-500 hover:text-gray-800">
          <FaPencilAlt />
        </button>
      )}
    </div>
  );
};

export default TestScore;
