import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import Navbar from "../components/Navbar";
import PortfolioSection from "../components/portfolio/PortfolioSection";
import OpportunitiesSidebar from "../components/portfolio/OpportunitiesSidebar";

const EditSection = () => {
  const { section } = useParams();
  const formattedSection =
    section.charAt(0).toUpperCase() + section.slice(1).replace(/-/g, " ");
  const { user } = useContext(UserContext);

  return (
    <div>
      <Navbar />
      {!!user && (
        <h2 className="text-xl text-semibold text-start ml-48">
          Edit {formattedSection}
        </h2>
      )}
      <div className="flex flex-row mt-4">
        <div className="w-2/3 ml-48 py-4">
          {!!user && (
            <PortfolioSection
              title={formattedSection}
              userId={user.id}
              isEditMode={true}
            />
          )}
        </div>
        <div className="w-1/3 py-4">
          <OpportunitiesSidebar />
        </div>
      </div>
    </div>
  );
};

export default EditSection;
