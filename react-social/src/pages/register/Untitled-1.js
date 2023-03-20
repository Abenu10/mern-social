import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {

  const { user } = useContext(AuthContext);
  console.log(user);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} >
          {user ? null : <Navigate to="/login" />}
        </Route>
        <Route path="/login" element={<Login />} >
          {!user ? null : <Navigate to="/" />}
        </Route>
        <Route path=\"/register" element={<Register />} >
          {!user ? null : <Navigate to="/" />}
        </Route>
        <Route path="/profile/:username" element={<Profile />} />
      </Routes>
    </Router>
  );
}