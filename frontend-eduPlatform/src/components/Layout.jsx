import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';
import { 
  AiOutlineHome, 
  AiOutlineUser, 
  AiOutlineBook, 
  AiOutlineAppstore,
  AiOutlineFileText,
  AiOutlineHeart,
  AiOutlineLineChart,
  AiOutlineSetting,
  AiOutlineBell,
  AiOutlineLogout
} from 'react-icons/ai';
import './Layout.css';

function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const navItems = [
    { path: '/dashboard', icon: AiOutlineHome, label: 'Home' },
    { path: '/my-courses', icon: AiOutlineBook, label: 'My Courses' },
    { path: '/courses', icon: AiOutlineAppstore, label: 'Explore' },
    { path: '/quiz', icon: AiOutlineFileText, label: 'Quiz' },
    { path: '/bookmarks', icon: AiOutlineHeart, label: 'Bookmarks' },
    { path: '/activity', icon: AiOutlineLineChart, label: 'Activity' },
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="layout-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="brand-icon-small">
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
              <rect width="40" height="40" rx="10" fill="url(#gradient1)"/>
              <path d="M20 10L28 16V24L20 30L12 24V16L20 10Z" fill="white" fillOpacity="0.9"/>
              <defs>
                <linearGradient id="gradient1" x1="0" y1="0" x2="40" y2="40">
                  <stop stopColor="#bdb3ff"/>
                  <stop offset="1" stopColor="#ffb3ba"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-item ${isActive ? 'active' : ''}`}
                title={item.label}
              >
                <Icon size={24} />
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <Link
            to="/settings"
            className={`nav-item ${location.pathname === '/settings' ? 'active' : ''}`}
            title="Settings"
          >
            <AiOutlineSetting size={24} />
          </Link>
          <button
            onClick={handleLogout}
            className="nav-item logout-btn"
            title="Logout"
          >
            <AiOutlineLogout size={24} />
          </button>
          <Link
            to="/profile"
            className={`nav-item ${location.pathname === '/profile' ? 'active' : ''}`}
            title="Profile"
          >
            <div className="profile-avatar-small">
              {user?.studentProfile?.fullName?.charAt(0) || 'U'}
            </div>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}

export default Layout;
