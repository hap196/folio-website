import React, { useState } from "react";
import axios from "axios";
import ListItem from "./ListItem";
import CourseModal from "./modals/CourseModal";
import ExtracurricularModal from "./modals/ExtracurricularModal";
import AwardModal from "./modals/AwardModal";
import TestScoreModal from "./modals/TestScoreModal";
import { FaPlus, FaPencilAlt } from "react-icons/fa";

const PortfolioSection = ({ title, children, userId }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  // console.log("UserId in PortfolioSection:", userId);

  const handleModalSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`/${userId}/courses`, courseData);
      if (response && response.data) {
        console.log("Course added successfully:", response.data);
        onClose(); 
      } else {
        console.error("Unexpected response format:", response);
      }
    } catch (error) {
      console.error(
        "Error adding course:",
        error.response ? error.response.data.message : error.message
      );
    }

    
    setCourseData({
      name: "",
      description: "",
      grade: "",
      year: "",
    });
  };

  const renderModal = () => {
    const sectionType = title.toLowerCase();
    switch (sectionType) {
      case "courses":
        return (
          <CourseModal
            userId={userId} 
            isVisible={isModalVisible}
            onClose={() => setIsModalVisible(false)}
            onSubmit={handleModalSubmit}
          />
        );
      case "extracurriculars":
        return (
          <ExtracurricularModal
            userId={userId} 
            isVisible={isModalVisible}
            onClose={() => setIsModalVisible(false)}
            onSubmit={handleModalSubmit}
          />
        );
      case "awards":
        return (
          <AwardModal
            userId={userId} 
            isVisible={isModalVisible}
            onClose={() => setIsModalVisible(false)}
            onSubmit={handleModalSubmit}
          />
        );
      case "test scores":
        return (
          <TestScoreModal
            userId={userId} 
            isVisible={isModalVisible}
            onClose={() => setIsModalVisible(false)}
            onSubmit={handleModalSubmit}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-100 py-4 px-8 h-auto w-3/4 text-start my-2 rounded-lg">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-lg">{title}</h2>
        <div>
          <button
            onClick={() => setIsModalVisible(true)}
            className="p-2 mr-2 text-gray-500 hover:text-gray-800"
          >
            <FaPlus />
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-800">
            <FaPencilAlt />
          </button>
        </div>
      </div>

      {renderModal()}

      <ul>
        {React.Children.map(children, (child) => {
          return child.type === ListItem ? child : <ListItem>{child}</ListItem>;
        })}
      </ul>
    </div>
  );
};

export default PortfolioSection;
