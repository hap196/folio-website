import React from 'react';
import { FaPencilAlt } from 'react-icons/fa';

const Award = ({ award, isEditMode, onEdit }) => {
  return (
    <div className="flex justify-between items-center w-full">
      <h1 className="text-left">{award.title}</h1>
      {isEditMode && (
        <button onClick={() => onEdit(award)} className="p-2 text-gray-500 hover:text-gray-800">
          <FaPencilAlt />
        </button>
      )}
    </div>
  );
};

export default Award;
