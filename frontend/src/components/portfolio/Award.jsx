import React from "react";

const Award = ({ title, description, year }) => {
  return (
    <div className="text-md">
      <h1 className="font-semibold">{title}</h1>
      <h6>{description}</h6>
      <h6>{year}</h6>
    </div>
  );
};

export default Award;
