import React from "react";
import ListItem from "./ListItem";
import { FaPlus, FaPencilAlt } from "react-icons/fa";

const PortfolioSection = ({ title, children }) => {
  return (
    <div className="bg-gray-100 py-4 px-8 h-auto w-3/4 text-start my-2 rounded-lg">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-lg">{title}</h2>
        <div>
          <button className="p-2 mr-2 text-gray-500 hover:text-gray-800">
            <FaPlus />
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-800">
            <FaPencilAlt />
          </button>
        </div>
      </div>

      <ul>
        {React.Children.map(children, (child) => {
          return child.type === ListItem ? child : <ListItem>{child}</ListItem>;
        })}
      </ul>
    </div>
  );
};

export default PortfolioSection;
