import React from "react";
import Logo from "../../assets/default-image.jpg";
import { FaPencilAlt } from 'react-icons/fa';

const Extracurricular = ({
  extracurricular,
  isEditMode,
  onEdit
}) => {
  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex items-start space-x-4 text-start">
        <img src={Logo} alt="Company Logo" className="h-12 w-12 mt-1" />
        <div className="flex flex-col justify-start">
          <span className="text-lg font-semibold">{extracurricular.position}</span>
          <span className="text-sm text-gray-600">{extracurricular.name}</span>
          <span className="text-sm text-gray-600">
            {extracurricular.startYear} - {extracurricular.endYear}
          </span>
          <span className="text-sm text-gray-600">{extracurricular.location}</span>
          <span className="text-sm font-semibold">{extracurricular.description}</span>
        </div>
      </div>
      {isEditMode && (
        <button onClick={() => onEdit(extracurricular)} className="p-2 text-gray-500 hover:text-gray-800">
          <FaPencilAlt />
        </button>
      )}
    </div>
  );
};

export default Extracurricular;
