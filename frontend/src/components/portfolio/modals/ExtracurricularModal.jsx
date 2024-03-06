import React, { useState, useEffect } from "react";
import axios from "axios";

const ExtracurricularModal = ({
  isVisible,
  onClose,
  userId,
  extracurricularData: initialExtracurricularData,
  onSubmit,
  onDelete,
  isEditMode = false,
}) => {
  const [extracurricularData, setExtracurricularData] = useState({
    name: "",
    position: "",
    description: "",
    location: "",
    startYear: "",
    endYear: "",
  });

  useEffect(() => {
    if (isEditMode && initialExtracurricularData) {
      setExtracurricularData(initialExtracurricularData);
    } else {
      setExtracurricularData({
        name: "",
        position: "",
        description: "",
        location: "",
        startYear: "",
        endYear: "",
      });
    }
  }, [isEditMode, initialExtracurricularData]);

  const handleInputChange = (e) => {
    setExtracurricularData({
      ...extracurricularData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(extracurricularData);
  };

  const handleDeleteClick = () => {
    if (initialExtracurricularData && initialExtracurricularData._id) {
      onDelete(initialExtracurricularData._id, "extracurriculars");
    }
    onClose();
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
          {isEditMode ? "Edit Extracurricular" : "Add New Extracurricular"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block">Name:</label>
            <input
              type="text"
              name="name"
              value={extracurricularData.name}
              onChange={handleInputChange}
              required
              className="input"
            />
          </div>
          <div>
            <label className="block">Position:</label>
            <input
              type="text"
              name="position"
              value={extracurricularData.position}
              onChange={handleInputChange}
              required
              className="input"
            />
          </div>
          <div>
            <label className="block">Description:</label>
            <textarea
              name="description"
              value={extracurricularData.description}
              onChange={handleInputChange}
              required
              className="textarea"
            />
          </div>
          <div>
            <label className="block">Location:</label>
            <input
              type="text"
              name="location"
              value={extracurricularData.location}
              onChange={handleInputChange}
              required
              className="input"
            />
          </div>
          <div>
            <label className="block">Start Year:</label>
            <input
              type="number"
              name="startYear"
              value={extracurricularData.startYear}
              onChange={handleInputChange}
              required
              className="input"
            />
          </div>
          <div>
            <label className="block">End Year:</label>
            <input
              type="number"
              name="endYear"
              value={extracurricularData.endYear}
              onChange={handleInputChange}
              required
              className="input"
            />
          </div>
          <div className="flex justify-between space-x-2">
            {isEditMode && (
              <button
                type="button"
                onClick={handleDeleteClick}
                className="btn delete-btn"
              >
                Delete
              </button>
            )}
            <button type="submit" className="btn submit-btn">
              {isEditMode ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExtracurricularModal;
