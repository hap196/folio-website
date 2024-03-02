import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import "../index.css";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  return (
    <div>
      <h1 className="bg-red-100">Dashboard</h1>
      {!!user && <h2>Hi, {user.name}!</h2>}
    </div>
  );
};

export default Dashboard;
