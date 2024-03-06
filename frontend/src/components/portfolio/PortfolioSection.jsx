import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import CourseModal from "./modals/CourseModal";
import ExtracurricularModal from "./modals/ExtracurricularModal";
import AwardModal from "./modals/AwardModal";
import TestScoreModal from "./modals/TestScoreModal";
import { FaPlus, FaPencilAlt } from "react-icons/fa";
import Course from "./Course";
import Extracurricular from "./Extracurricular";
import Award from "./Award";
import TestScore from "./TestScore";

const PortfolioSection = ({ title, children, userId }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  // console.log("UserId in PortfolioSection:", userId);

  const [items, setItems] = useState([]);

  const fetchData = useCallback(async () => {
    let endpoint = title.toLowerCase().replace(/\s+/g, "");
    // adjust endpoint if it's "test scores" (since we want camelcase)
    if (title.toLowerCase() === "test scores") {
      endpoint = "testScores";
    }
    try {
      const response = await axios.get(`/${userId}/${endpoint}`);
      setItems(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  });
  
  useEffect(() => {

    fetchData();
  }, [userId, title, fetchData]);

  const handleModalSubmit = async (courseData, endpoint) => {
    try {
      const response = await axios.post(`/${userId}/${endpoint}`, courseData);
      if (response && response.data) {
        console.log(`${endpoint} added successfully:`, response.data);
        setIsModalVisible(false);
        fetchData(); // Call fetchData to refresh items after successful submission
      } else {
        console.error("Unexpected response format:", response);
      }
    } catch (error) {
      console.error(
        `Error adding ${endpoint}:`,
        error.response ? error.response.data.message : error.message
      );
    }
  };

  // determine the component to render based on the item type
  const renderComponent = (item, type) => {
    switch (type) {
      case "courses":
        return <Course {...item} />;
      case "extracurriculars":
        return <Extracurricular {...item} />;
      case "awards":
        return <Award {...item} />;
      case "testScores":
        return <TestScore {...item} />;
      default:
        return null;
    }
  };

  // determine the component to render based on the item type
  const renderModal = () => {
    const sectionType = title.toLowerCase();
    switch (sectionType) {
      case "courses":
        return (
          <CourseModal
            userId={userId}
            isVisible={isModalVisible}
            onClose={() => {
              setIsModalVisible(false);
              fetchData();
            }}
            onSubmit={handleModalSubmit}
          />
        );
      case "extracurriculars":
        return (
          <ExtracurricularModal
            userId={userId}
            isVisible={isModalVisible}
            onClose={() => {
              setIsModalVisible(false);
              fetchData();
            }}
            onSubmit={handleModalSubmit}
          />
        );
      case "awards":
        return (
          <AwardModal
            userId={userId}
            isVisible={isModalVisible}
            onClose={() => {
              setIsModalVisible(false);
              fetchData();
            }}
            onSubmit={handleModalSubmit}
          />
        );
      case "test scores":
        return (
          <TestScoreModal
            userId={userId}
            isVisible={isModalVisible}
            onClose={() => {
              setIsModalVisible(false);
              fetchData();
            }}
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
        {items.map((item, index) => {
          // need to modify test scores to be camelcase
          const itemType =
            title.toLowerCase() === "test scores"
              ? "testScores"
              : title.toLowerCase().replace(/\s+/g, "");

          // render the list of components
          return (
            <li
              key={item._id || index}
              className="py-2 border-b last:border-b-0 border-gray-300 text-start"
            >
              {renderComponent(item, itemType)}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PortfolioSection;
