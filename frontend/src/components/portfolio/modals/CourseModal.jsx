import React, { useState, useEffect } from "react";
import axios from "axios";

const CourseModal = ({ isVisible, onClose, userId, courseData: initialCourseData, onSubmit, isEditMode = false }) => {
  const [courseData, setCourseData] = useState({
    name: "",
    description: "",
    grade: "",
    year: "",
  });

  useEffect(() => {
    if (isEditMode && initialCourseData) {
      setCourseData(initialCourseData);
    } else {
      setCourseData({
        name: "",
        description: "",
        grade: "",
        year: "",
      });
    }
  }, [isEditMode, initialCourseData]);

  const handleInputChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(courseData);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-sm w-full mx-4 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-2xl text-black">
          &times;
        </button>
        <h2 className="text-lg font-semibold mb-4">{isEditMode ? 'Edit Course' : 'Add New Course'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block">Name:</label>
            <input type="text" name="name" className="input" value={courseData.name} onChange={handleInputChange} required />
          </div>
          <div>
            <label className="block">Description:</label>
            <textarea name="description" className="textarea" value={courseData.description} onChange={handleInputChange} required />
          </div>
          <div>
            <label className="block">Grade:</label>
            <input type="text" name="grade" className="input" value={courseData.grade} onChange={handleInputChange} required />
          </div>
          <div>
            <label className="block">Year:</label>
            <input type="number" name="year" className="input" value={courseData.year} onChange={handleInputChange} required />
          </div>
          <div className="flex justify-end space-x-2">
            <button type="submit" className="btn submit-btn">
              {isEditMode ? 'Update' : 'Submit'}
            </button>
            <button onClick={onClose} className="btn cancel-btn">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseModal;
