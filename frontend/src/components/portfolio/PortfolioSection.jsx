import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
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

const PortfolioSection = ({ title, userId, isEditMode = false }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  const handleEditClick = () => {
    const sectionPath = title.toLowerCase().replace(/\s+/g, "-");
    navigate(`/edit/${sectionPath}`);
  };

  // when the main edit button is clicked
  const handleEditItem = (item) => {
    // puts us in edit mode
    setEditingCourse(item);
    // show the modal
    setIsModalVisible(true);
  };

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

  const handleModalSubmit = async (courseData) => {
    let response;

    try {
      if (editingCourse) {
        // editing an existing course
        response = await axios.put(
          `/${userId}/courses/${editingCourse._id}`,
          courseData
        );
      } else {
        // adding a new course
        response = await axios.post(`/${userId}/courses`, courseData);
      }

      if (response && response.data) {
        console.log(
          `${editingCourse ? "Course updated" : "Course added"} successfully:`,
          response.data
        );
        setIsModalVisible(false);
        setEditingCourse(null);
        // refresh the list after editing
        fetchData();
      } else {
        console.error("Unexpected response format:", response);
      }
    } catch (error) {
      console.error(
        `Error ${editingCourse ? "updating" : "adding"} course:`,
        error.response ? error.response.data.message : error.message
      );
    }
  };

  // determine the component to render based on the item type
  const renderComponent = (item, type, isEditMode) => {
    const commonProps = {
      isEditMode,
      onEdit: () => handleEditItem(item),
    };
    switch (type) {
      case "courses":
        return (
          <Course course={item} isEditMode={isEditMode} onEdit={handleEditItem} />
        );
      case "extracurriculars":
        return <Extracurricular {...item} {...commonProps} />;
      case "awards":
        return <Award {...item} {...commonProps} />;
      case "testScores":
        return <TestScore {...item} {...commonProps} />;
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
              setEditingCourse(null);
            }}
            // pass the editing course data to the modal
            courseData={editingCourse}
            onSubmit={handleModalSubmit}
            isEditMode={!!editingCourse}
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
          {!isEditMode && (
            <button
              onClick={handleEditClick}
              className="p-2 text-gray-500 hover:text-gray-800"
            >
              <FaPencilAlt />
            </button>
          )}
        </div>
      </div>

      {renderModal()}

      <ul>
        {items.map((item, index) => {
          const itemType =
            title.toLowerCase() === "test scores"
              ? "testScores"
              : title.toLowerCase().replace(/\s+/g, "");
          return (
            <li
              key={item._id || index}
              className="flex justify-between items-center py-2 border-b last:border-b-0 border-gray-300"
            >
              {renderComponent(item, itemType, isEditMode, handleEditItem)}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PortfolioSection;
