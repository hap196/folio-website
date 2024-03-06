import React from 'react';
import { FaPencilAlt } from 'react-icons/fa';

const Course = ({ course, isEditMode, onEdit }) => {
  return (
    <div className="flex justify-between items-center w-full">
      <h1 className="text-left">{course.name}</h1>
      {isEditMode && (
        <button onClick={() => onEdit(course)} className="p-2 text-gray-500 hover:text-gray-800">
          <FaPencilAlt />
        </button>
      )}
    </div>
  );
};

export default Course;
