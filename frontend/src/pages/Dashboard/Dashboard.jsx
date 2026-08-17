import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>

      <p>Welcome to your dashboard.</p>

      <Link to="/notes">Go to My Notes</Link>
    </div>
  );
}

export default Dashboard;