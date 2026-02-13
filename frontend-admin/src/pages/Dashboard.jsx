import { useState, useEffect } from 'react';
import { 
  AiOutlineUser, 
  AiOutlineBook, 
  AiOutlineFileText,
  AiOutlineRise,
  AiOutlinePlus
} from 'react-icons/ai';
import { getDashboardStats } from '../services/adminService';
import './Dashboard.css';

function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCourses: 0,
    totalQuizzes: 0,
    activeUsers: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const recentActivity = [
    { id: 1, type: 'user', action: 'New user registered', user: 'John Doe', time: '2 minutes ago' },
    { id: 2, type: 'course', action: 'Course published', course: 'React Basics', time: '15 minutes ago' },
    { id: 3, type: 'quiz', action: 'Quiz completed', user: 'Jane Smith', time: '1 hour ago' },
    { id: 4, type: 'user', action: 'User enrolled in course', user: 'Mike Johnson', time: '2 hours ago' },
    { id: 5, type: 'course', action: 'Course updated', course: 'JavaScript Advanced', time: '3 hours ago' },
  ];

  const popularCourses = [
    { id: 1, title: 'Web Development Bootcamp', enrollments: 342, rating: 4.8 },
    { id: 2, title: 'Data Science Fundamentals', enrollments: 289, rating: 4.7 },
    { id: 3, title: 'Mobile App Development', enrollments: 256, rating: 4.9 },
    { id: 4, title: 'Cloud Computing Basics', enrollments: 198, rating: 4.6 },
  ];

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p className="subtitle">Welcome back! Here's what's happening today.</p>
        </div>
        <button className="btn btn-primary">
          <AiOutlinePlus size={20} />
          Quick Actions
        </button>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card card-pink">
          <div className="stat-icon">
            <AiOutlineUser size={32} />
          </div>
          <div className="stat-info">
            <h3>{stats.totalUsers.toLocaleString()}</h3>
            <p>Total Users</p>
            <span className="stat-change positive">+12% from last month</span>
          </div>
        </div>

        <div className="stat-card card-purple">
          <div className="stat-icon">
            <AiOutlineBook size={32} />
          </div>
          <div className="stat-info">
            <h3>{stats.totalCourses}</h3>
            <p>Total Courses</p>
            <span className="stat-change positive">+5 new courses</span>
          </div>
        </div>

        <div className="stat-card card-blue">
          <div className="stat-icon">
            <AiOutlineFileText size={32} />
          </div>
          <div className="stat-info">
            <h3>{stats.totalQuizzes}</h3>
            <p>Total Quizzes</p>
            <span className="stat-change positive">+18 this week</span>
          </div>
        </div>

        <div className="stat-card card-green">
          <div className="stat-icon">
            <AiOutlineRise size={32} />
          </div>
          <div className="stat-info">
            <h3>{stats.activeUsers.toLocaleString()}</h3>
            <p>Active Users</p>
            <span className="stat-change positive">71% engagement</span>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Recent Activity */}
        <div className="card activity-card">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="activity-item">
                <div className={`activity-dot ${activity.type}`}></div>
                <div className="activity-content">
                  <p className="activity-action">{activity.action}</p>
                  <p className="activity-meta">
                    {activity.user || activity.course} • {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Courses */}
        <div className="card popular-courses-card">
          <h2>Popular Courses</h2>
          <div className="courses-list">
            {popularCourses.map((course) => (
              <div key={course.id} className="course-item">
                <div className="course-info">
                  <h4>{course.title}</h4>
                  <p>{course.enrollments} enrollments</p>
                </div>
                <div className="course-rating">
                  ⭐ {course.rating}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
