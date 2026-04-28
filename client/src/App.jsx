import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"; {/* ← Added Navigate */}
import './App.css';
import AdminDashboard from './Components/AdminDashboard';
import Home from './Components/Home/Home';
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import Signup from './Components/Signup';
import ShaktiButton from './Components/ShaktiButton';
import AfterLogin from "./Components/Home/AfterLogin";
import ProtectedRoute from "./Components/ProtectedRoute";
import Map from "./Components/Map";
import Progress from './Components/Progress';
import Reviews from "./Components/Reviews";
import Profile from "./Components/Profile";
import Settings from "./Components/Settings";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { auth } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <div style={{ background: "#080810", minHeight: "100vh" }}>

        <Routes>
          {/* Public routes — show Navbar */}
          <Route path='/' element={<><Navbar /><Home /></>} />
          <Route path='/login' element={<><Navbar /><Login /></>} />
          <Route path='/register' element={<><Navbar /><Signup /></>} />

          {/* Redirect /home → /HomePage */}
          <Route path='/home' element={<Navigate to="/HomePage" replace />} />

          {/* Protected routes — NO Navbar, they have BottomNav built in */}
          <Route path='/HomePage' element={<ProtectedRoute><AfterLogin /></ProtectedRoute>} />
          <Route path='/map' element={<ProtectedRoute><Map /></ProtectedRoute>} />
          <Route path='/reviews' element={<ProtectedRoute><Reviews /></ProtectedRoute>} />
          <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path='/settings' element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path='/Progress' element={<ProtectedRoute><Progress /></ProtectedRoute>} />
          <Route path='/sos' element={<ProtectedRoute><ShaktiButton /></ProtectedRoute>} />
          <Route path='/admin' element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        </Routes>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </BrowserRouter>
  );
}

export default App;