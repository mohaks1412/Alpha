// src/App.jsx
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect,  useState} from "react";
import { useSelector, useDispatch } from "react-redux";

import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Home from "./pages/Home";
import PrivateRoute from "./components/auth/PrivateRoute";
import { loginUser, logoutUser } from "./store/authSlice";
import authService from "./services/authService";
import socketService from "./services/socketService";
import ContactList from "./components/contacts/ContactList";
import ChatPage from "./pages/ChatPage";
import Profile from "./components/user/Profile";
import Navbar from "./components/utils/Navbar";
import Loading from "./components/utils/Loading";

const AppContent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await authService.getCurrentUser();
        
        if (data) {
          dispatch(loginUser(data));
          socketService.connect(data.user._id);
        }

      } catch (err) {
        
        dispatch(logoutUser());
        socketService.disconnect();
        navigate("/login");
      }
      finally{
        setLoading(false);
      }
    };
    fetchUser();
  }, [dispatch, navigate]);

  if (loading) {
    return <Loading />; // 👈 show spinner while checking auth
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Protected routes */}
      <Route path="/" element={<Home />} />
      <Route
        path="/users"
        element={
          <PrivateRoute>
            <ContactList />
          </PrivateRoute>
        }
      />
      <Route
        path="/chat/:userId"
        element={
          <PrivateRoute>
            <ChatPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/me"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <Navbar />
      <AppContent />
    </Router>
  );
}

export default App;
