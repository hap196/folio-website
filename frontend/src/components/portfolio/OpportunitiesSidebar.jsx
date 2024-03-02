import React from "react";
import Opportunity from "./Opportunity";

const OpportunitiesSidebar = () => {
  return (
    <div className="bg-gray-100 p-4 h-full w-2/3 my-2 rounded-lg">
      <ul>
        <li>
          <h6 className="text-start px-4 font-semibold">Recommended ventures</h6>
        </li>
        <li>
          <Opportunity
            title="Summer Science Program"
            description="eget nulla facilisi etiam dignissim"
          />
        </li>
        <li>
          <Opportunity
            title="Summer Science Program"
            description="eget nulla facilisi etiam dignissim"
          />
        </li>

        <li>
          <Opportunity
            title="Summer Science Program"
            description="eget nulla facilisi etiam dignissim"
          />
        </li>
        <li>
          <Opportunity
            title="Summer Science Program"
            description="eget nulla facilisi etiam dignissim"
          />
        </li>
        <li>
          <button className="pt-4 text-gray-600 font-semibold">Show all</button>
        </li>
      </ul>
    </div>
  );
};

export default OpportunitiesSidebar;
