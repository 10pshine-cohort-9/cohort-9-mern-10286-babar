import { Link, Outlet, useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";

function MainLayout() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div>
      <header>
        <h1>Notes App</h1>

        <nav>
          <Link to="/">Home</Link>{" "}

          {!isAuthenticated && (
            <>
              <Link to="/login">Login</Link>{" "}
              <Link to="/signup">Sign Up</Link>
            </>
          )}

          {isAuthenticated && (
            <>
              <Link to="/dashboard">Dashboard</Link>{" "}
              <Link to="/notes">Notes</Link>{" "}

              <button type="button" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;