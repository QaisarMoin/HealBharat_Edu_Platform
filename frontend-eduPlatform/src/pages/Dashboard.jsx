import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserProfile } from '../store/authSlice';
import Layout from '../components/Layout';
import { 
  AiOutlineBell, 
  AiOutlineSetting,
  AiOutlineStar,
  AiOutlineUser,
  AiOutlineRight
} from 'react-icons/ai';
import { 
  MdComputer,
  MdOndemandVideo,
  MdBusiness,
  MdDesignServices
} from 'react-icons/md';
import './Dashboard.css';

const mockCourses = [
  {
    id: 1,
    title: 'CCNA 2020 200-125 Video Boot Camp',
    category: 'IT & Software',
    students: 9530,
    rating: 4.8,
    color: 'pink',
    icon: MdComputer
  },
  {
    id: 2,
    title: 'Powerful Business Writing: How to Write Concisely',
    category: 'Business',
    students: 1463,
    rating: 4.9,
    color: 'orange',
    icon: MdBusiness
  },
  {
    id: 3,
    title: 'Certified Six Sigma Yellow Belt Training',
    category: 'Media Training',
    students: 6728,
    rating: 4.9,
    color: 'purple',
    icon: MdOndemandVideo
  },
  {
    id: 4,
    title: 'How to Design a Room in 10 Easy Steps',
    category: 'Interior',
    students: 8735,
    rating: 5.0,
    color: 'green',
    badge: 'Top 10',
    icon: MdDesignServices
  }
];

const myCourses = [
  {
    id: 1,
    title: 'Flutter Masterclass (Dart, APIs, Firebase & More)',
    category: 'IT & Software',
    students: 9530,
    rating: 4.8,
    color: 'pink'
  },
  {
    id: 2,
    title: 'Advanced React Development',
    category: 'Business',
    students: 7234,
    rating: 4.9,
    color: 'orange'
  }
];

const categories = [
  { id: 'all', label: 'All', icon: null },
  { id: 'it', label: 'IT & Software', icon: MdComputer },
  { id: 'media', label: 'Media Training', icon: MdOndemandVideo },
  { id: 'business', label: 'Business', icon: MdBusiness },
  { id: 'interior', label: 'Interior', icon: MdDesignServices }
];

function Dashboard() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    if (!user) {
      dispatch(getUserProfile());
    }
  }, [dispatch, user]);

  const activityData = [
    { month: 'Jan', hours: 2.5 },
    { month: 'Feb', hours: 3.2 },
    { month: 'Aug', hours: 2.8 },
    { month: 'Sep', hours: 3.5 },
    { month: 'Oct', hours: 2.3 },
    { month: 'Nov', hours: 3.1 },
    { month: 'Dec', hours: 3.5 }
  ];

  const maxHours = Math.max(...activityData.map(d => d.hours));

  return (
    <Layout>
      <div className="dashboard">
        {/* Header */}
        <div className="dashboard-header">
          <div className="header-left">
            <h1 className="page-title">
              Invest in your<br/>
              <span className="gradient-text">education</span>
            </h1>
          </div>

          <div className="header-right">
            <button className="icon-btn">
              <AiOutlineBell size={20} />
            </button>
            <button className="icon-btn">
              <AiOutlineSetting size={20} />
            </button>
          </div>
        </div>

        <div className="dashboard-grid">
          {/* Main Content */}
          <div className="dashboard-main">
            {/* Category Filter */}
            <div className="category-filter">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat.id)}
                  >
                    {Icon && <Icon size={20} />}
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Most Popular Courses */}
            <section className="course-section">
              <h2 className="section-title">Most popular</h2>
              <div className="course-grid">
                {mockCourses.map((course) => {
                  const Icon = course.icon;
                  return (
                    <Link to={`/course/${course.id}`} key={course.id} className={`course-card card-${course.color}`}>
                      <div className="course-header">
                        <div className="course-category">
                          <Icon size={18} />
                          <span>{course.category}</span>
                        </div>
                        <div className="course-rating">
                          <AiOutlineStar size={16} />
                          <span>{course.rating}</span>
                        </div>
                        {course.badge && <div className="course-badge">{course.badge}</div>}
                      </div>
                      <h3 className="course-title">{course.title}</h3>
                      <div className="course-footer">
                        <span className="course-students">{course.students.toLocaleString()} students</span>
                        <div className="course-avatars">
                          <div className="avatar"></div>
                          <div className="avatar"></div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="dashboard-sidebar">
            {/* Profile Card */}
            <div className="profile-card">
              <div className="profile-avatar">
                {user?.studentProfile?.fullName?.charAt(0) || 'A'}
              </div>
              <h3 className="profile-name">{user?.studentProfile?.fullName || 'Annette Black'}</h3>
              
              <div className="profile-stats">
                <div className="stat-item">
                  <AiOutlineUser size={18} />
                  <span>274 Friends</span>
                </div>
                <div className="friend-avatars">
                  <div className="friend-avatar"></div>
                  <div className="friend-avatar"></div>
                  <div className="friend-avatar"></div>
                  <AiOutlineRight size={16} />
                </div>
              </div>
            </div>

            {/* Activity Card */}
            <div className="activity-card">
              <div className="activity-header">
                <h3>Activity</h3>
                <select className="year-select">
                  <option>Year</option>
                  <option>2024</option>
                  <option>2023</option>
                </select>
              </div>
              <div className="activity-summary">
                <span className="activity-hours">3.5h</span>
                <span className="activity-badge">👍 Great result!</span>
              </div>
              <div className="activity-chart">
                {activityData.map((data, index) => (
                  <div key={index} className="chart-bar">
                    <div 
                      className="bar-fill"
                      style={{ height: `${(data.hours / maxHours) * 100}%` }}
                    ></div>
                    <span className="bar-label">{data.month}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* My Courses */}
            <div className="my-courses-card">
              <h3>My courses</h3>
              <div className="my-courses-list">
                {myCourses.map((course) => (
                  <Link to={`/course/${course.id}`} key={course.id} className={`my-course-item card-${course.color}`}>
                    <div className="my-course-icon">
                      <MdComputer size={20} />
                      <span>{course.category}</span>
                    </div>
                    <div className="my-course-rating">
                      <AiOutlineStar size={14} />
                      <span>{course.rating}</span>
                    </div>
                    <h4>{course.title}</h4>
                    <span className="my-course-students">{course.students.toLocaleString()} students</span>
                    <div className="my-course-avatars">
                      <div className="avatar-sm"></div>
                      <div className="avatar-sm"></div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
