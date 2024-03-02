import React from "react";
import DefaultImage from "../../assets/default-image.jpg";

const Opportunity = ({ title, description }) => {
  return (
    <div className="flex items-start space-x-4 p-4 border-b-2 text-start">
      <img
        src={DefaultImage}
        alt="Opportunity"
        className="rounded-full w-14 h-14"
      />
      <div className="flex flex-col justify-between">
        <div>
          <h3 className="text-md font-semibold">{title}</h3>
          <p className="text-sm pb-2">{description}</p>
        </div>
        <button className="border-2 border-gray-300 rounded-full px-4 py-1 text-sm hover:bg-gray-100 w-2/3">
          Apply
        </button>
      </div>
    </div>
  );
};

export default Opportunity;
