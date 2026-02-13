import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import MyCourses from './pages/MyCourses';
import CourseList from './pages/CourseList';
import CourseDetail from './pages/CourseDetail';
import Quiz from './pages/Quiz';
import QuizDetail from './pages/QuizDetail';
import Bookmarks from './pages/Bookmarks';
import Activity from './pages/Activity';
import Settings from './pages/Settings';
import Assessment from './pages/Assessment';
import Results from './pages/Results';
import './App.css';

function App() {
  const { token } = useSelector((state) => state.auth);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={!token ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="/register" element={!token ? <Register /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/profile" element={token ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/my-courses" element={token ? <MyCourses /> : <Navigate to="/login" />} />
          <Route path="/courses" element={token ? <CourseList /> : <Navigate to="/login" />} />
          <Route path="/course/:id" element={token ? <CourseDetail /> : <Navigate to="/login" />} />
          <Route path="/quiz" element={token ? <Quiz /> : <Navigate to="/login" />} />
          <Route path="/quiz/:id" element={token ? <QuizDetail /> : <Navigate to="/login" />} />
          <Route path="/bookmarks" element={token ? <Bookmarks /> : <Navigate to="/login" />} />
          <Route path="/activity" element={token ? <Activity /> : <Navigate to="/login" />} />
          <Route path="/settings" element={token ? <Settings /> : <Navigate to="/login" />} />
          <Route path="/assessment" element={token ? <Assessment /> : <Navigate to="/login" />} />
          <Route path="/results" element={token ? <Results /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to={token ? "/dashboard" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
