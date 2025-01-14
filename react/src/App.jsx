import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/Protected";

const App = () => {
  const NavigationButtons = () => {
    const navigate = useNavigate();

    return (
      <div>
        <button onClick={() => navigate("/login")}>Login</button>
        <button onClick={() => navigate("/register")}>Register</button>
      </div>
    );
  };

  return (
    <Router>
      <div>
        <NavigationButtons />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/protected" element={<ProtectedRoute />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;