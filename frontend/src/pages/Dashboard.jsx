import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import "../index.css";
import Navbar from "../components/Navbar";
import PortfolioSection from "../components/portfolio/PortfolioSection";
import OpportunitiesSidebar from "../components/portfolio/OpportunitiesSidebar";
import Course from "../components/portfolio/Course";
import Extracurricular from "../components/portfolio/Extracurricular";
import Award from "../components/portfolio/Award";
import TestScore from "../components/portfolio/TestScore";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  return (
    <div>
      <Navbar />
      {/* {!!user && <h2>Hi, {user.name}!</h2>} */}
      <h1 className="text-xl text-semibold text-start ml-48">My Portfolio</h1>
      <div className="flex flex-row">
        <div className="flex flex-col items-center justify-center w-2/3 py-4 ml-16">
          <PortfolioSection title="Courses">
            <Course name="AP Environmental Science" />
            <Course name="AP Environmental Science" />
          </PortfolioSection>
          <PortfolioSection title="Extracurriculars">
            <Extracurricular
              name="Google"
              position="Software Engineering Intern"
              description="Worked on the Web Data Indexing Team."
              location="Sunnyvale, California, United States"
              startYear="May 2022"
              endYear="Aug 2022"
            />
            <Extracurricular
              name="Google"
              position="Software Engineering Intern"
              description="Worked on the Web Data Indexing Team."
              location="Sunnyvale, California, United States"
              startYear="May 2022"
              endYear="Aug 2022"
            />
          </PortfolioSection>
          <PortfolioSection title="Awards">
            <Award
              title="National Science Scholarship"
              description="Awarded for outstanding achievement in computer science."
              year="2021"
            />
            <Award
              title="National Science Scholarship"
              description="Awarded for outstanding achievement in computer science."
              year="2021"
            />
          </PortfolioSection>
          <PortfolioSection title="Test Scores">
            <TestScore title="SAT" score="1480" year="2020" />
            <TestScore title="ACT" score="34" year="2020" />
          </PortfolioSection>
        </div>
        <div className="flex items-center justify-left w-1/3 h-full mr-14 py-4">
          <OpportunitiesSidebar />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
