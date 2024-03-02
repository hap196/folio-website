import React from "react";
import Logo from "../../assets/default-image.jpg";

const Extracurricular = ({
  name,
  position,
  description,
  location,
  startYear,
  endYear,
}) => {
  return (
    <div className="flex items-start space-x-4 py-4 text-start">
      <img src={Logo} alt="Company Logo" className="h-12 w-12 mt-1" /> {/* Adjust margin-top as needed */}
      <div className="flex flex-col justify-start">
        <span className="text-lg font-semibold">{position}</span>
        <span className="text-sm text-gray-600">{name}</span>
        <span className="text-sm text-gray-600">
          {startYear} - {endYear}
        </span>
        <span className="text-sm text-gray-600">{location}</span>
        <span className="text-sm font-semibold">{description}</span>
      </div>
    </div>
  );
};

export default Extracurricular;
