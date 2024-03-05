import React, { useState } from "react";
import axios from "axios";

const AwardModal = ({ isVisible, onClose, userId }) => {
  const [awardData, setAwardData] = useState({
    title: "",
    description: "",
    issuer: "",
    year: "",
    dateReceived: "",
  });

  const handleInputChange = (e) => {
    setAwardData({ ...awardData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`/${userId}/awards`, awardData);
      if (response && response.data) {
        console.log("Award added successfully:", response.data);
        onClose();
      } else {
        console.error("Unexpected response format:", response);
      }
    } catch (error) {
      console.error(
        "Error adding award:",
        error.response ? error.response.data.message : error.message
      );
    }

    setAwardData({
      title: "",
      description: "",
      issuer: "",
      year: "",
      dateReceived: "",
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
        <h2 className="text-lg font-semibold mb-4">Add New Award</h2>
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
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AwardModal;
