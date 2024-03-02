import React from "react";

const ListItem = ({ children }) => {
  return (
    <li className="py-2 last:border-b-0 text-start">
      <div className="border-b border-gray-100">{children}</div>
    </li>
  );
};

export default ListItem;
