import React, { useState, useEffect } from "react";
import axios from "axios";

const TestScoreModal = ({
  isVisible,
  onClose,
  userId,
  testScoreData: initialTestScoreData,
  onSubmit,
  isEditMode = false,
}) => {
  const [testScoreData, setTestScoreData] = useState({
    testName: "",
    score: "",
    grade: "",
    dateTaken: "",
  });

  useEffect(() => {
    if (isEditMode && initialTestScoreData) {
      setTestScoreData({
        testName: initialTestScoreData.testName || "",
        score: initialTestScoreData.score || "",
        grade: initialTestScoreData.grade || "",
        dateTaken: initialTestScoreData.dateTaken || "",
      });
    } else {
      setTestScoreData({
        testName: "",
        score: "",
        grade: "",
        dateTaken: "",
      });
    }
  }, [isEditMode, initialTestScoreData]);

  const handleInputChange = (e) => {
    setTestScoreData({ ...testScoreData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(testScoreData);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-sm w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-2xl text-black"
        >
          &times;
        </button>
        <h2 className="text-lg font-semibold mb-4">
          {isEditMode ? "Edit Test Score" : "Add New Test Score"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block">Test Name:</label>
            <input
              type="text"
              name="testName"
              className="input"
              value={testScoreData.testName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label className="block">Score:</label>
            <input
              type="text"
              name="score"
              className="input"
              value={testScoreData.score}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label className="block">Grade:</label>
            <input
              type="number"
              name="grade"
              className="input"
              value={testScoreData.grade}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label className="block">Date Taken:</label>
            <input
              type="date"
              name="dateTaken"
              className="input"
              value={testScoreData.dateTaken}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button type="submit" className="btn submit-btn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TestScoreModal;
