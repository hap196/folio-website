import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import "../index.css";
import Navbar from "../components/Navbar";
import PortfolioSection from "../components/portfolio/PortfolioSection";
import OpportunitiesSidebar from "../components/portfolio/OpportunitiesSidebar";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  return (
    <div>
      <Navbar />
      {!!user && <h2>Hi, {user.id}!</h2>}
      <h1 className="text-xl text-semibold text-start ml-48">My Portfolio</h1>
      <div className="flex flex-row">
        <div className="flex flex-col items-center justify-center w-2/3 py-4 ml-16">
          {!!user && (
            <PortfolioSection title="Courses" userId={user.id} />
          )}
          {!!user && (
            <PortfolioSection title="Extracurriculars" userId={user.id} />
          )}
          {!!user && (
            <PortfolioSection title="Awards" userId={user.id} />
          )}
          {!!user && (
            <PortfolioSection title="Test Scores" userId={user.id} />
          )}
        </div>
        <div className="flex items-center justify-left w-1/3 h-full mr-14 py-4">
          <OpportunitiesSidebar />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
