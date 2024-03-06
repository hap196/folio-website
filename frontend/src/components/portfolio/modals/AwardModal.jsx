import React, { useState, useEffect } from "react";
import axios from "axios";

const AwardModal = ({ isVisible, onClose, userId, awardData: initialAwardData, onSubmit, isEditMode = false }) => {
  const [awardData, setAwardData] = useState({
    title: "",
    description: "",
    issuer: "",
    year: "",
    dateReceived: "",
  });

  useEffect(() => {
    if (isEditMode && initialAwardData) {
      setAwardData({
        title: initialAwardData.title || "",
        description: initialAwardData.description || "",
        issuer: initialAwardData.issuer || "",
        year: initialAwardData.year || "",
        dateReceived: initialAwardData.dateReceived || "",
      });
    } else {
      setAwardData({
        title: "",
        description: "",
        issuer: "",
        year: "",
        dateReceived: "",
      });
    }
  }, [isEditMode, initialAwardData]);

  const handleInputChange = (e) => {
    setAwardData({ ...awardData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(awardData);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-sm w-full mx-4 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-2xl text-black">
          &times;
        </button>
        <h2 className="text-lg font-semibold mb-4">{isEditMode ? 'Edit Award' : 'Add New Award'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
              <div>
            <label className="block">Title:</label>
            <input
              type="text"
              name="title"
              value={awardData.title}
              onChange={handleInputChange}
              required
              className="input"
            />
          </div>
          <div>
            <label className="block">Description:</label>
            <textarea
              name="description"
              value={awardData.description}
              onChange={handleInputChange}
              required
              className="textarea"
            />
          </div>
          <div>
            <label className="block">Issuer:</label>
            <input
              type="text"
              name="issuer"
              value={awardData.issuer}
              onChange={handleInputChange}
              required
              className="input"
            />
          </div>

          <div>
            <label className="block">Year:</label>
            <input
              type="number"
              name="year"
              value={awardData.year}
              onChange={handleInputChange}
              required
              className="input"
            />
          </div>
          <div>
            <label className="block">Date Received:</label>
            <input
              type="date"
              name="dateReceived"
              value={awardData.dateReceived}
              onChange={handleInputChange}
              className="input"
            />
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

export default AwardModal;
