import React, { useState } from "react";
import axios from "axios";

const ExtracurricularModal = ({ isVisible, onClose, userId }) => {
  const [extracurricularData, setExtracurricularData] = useState({
    name: "",
    position: "",
    description: "",
    location: "",
    startYear: "",
    endYear: "",
  });

  const handleInputChange = (e) => {
    setExtracurricularData({
      ...extracurricularData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `/${userId}/extracurriculars`,
        extracurricularData
      );
      if (response && response.data) {
        console.log("Extracurricular added successfully:", response.data);
        onClose();
      } else {
        console.error("Unexpected response format:", response);
      }
    } catch (error) {
      console.error(
        "Error adding extracurricular:",
        error.response ? error.response.data.message : error.message
      );
    }

    setExtracurricularData({
      name: "",
      position: "",
      description: "",
      location: "",
      startYear: "",
      endYear: "",
    });
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
        <h2 className="text-lg font-semibold mb-4">Add New Extracurricular</h2>
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
          <div className="flex justify-end space-x-2">
            <button type="submit" className="btn submit-btn">
              Submit
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

export default ExtracurricularModal;
