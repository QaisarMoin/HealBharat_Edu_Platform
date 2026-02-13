import { useSelector } from 'react-redux';
import Layout from '../components/Layout';
import { AiOutlineMail, AiOutlinePhone, AiOutlineCalendar, AiOutlineEdit } from 'react-icons/ai';
import './Profile.css';

function Profile() {
  const { user } = useSelector((state) => state.auth);

  return (
    <Layout>
      <div className="profile-page">
        <div className="profile-header-section">
          <div className="profile-cover"></div>
          <div className="profile-info-wrapper">
            <div className="profile-avatar-large">
              {user?.studentProfile?.fullName?.charAt(0) || 'A'}
            </div>
            <div className="profile-details">
              <h1>{user?.studentProfile?.fullName || 'Annette Black'}</h1>
              <p className="profile-bio">Student • {user?.studentProfile?.classLevel || '10th Grade'}</p>
            </div>
            <button className="btn-edit-profile">
              <AiOutlineEdit size={18} />
              Edit Profile
            </button>
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-main">
            <div className="info-card">
              <h3>Personal Information</h3>
              <div className="info-grid">
                <div className="info-item">
                  <AiOutlineMail size={20} />
                  <div>
                    <label>Email</label>
                    <p>{user?.email || 'student@example.com'}</p>
                  </div>
                </div>
                <div className="info-item">
                  <AiOutlinePhone size={20} />
                  <div>
                    <label>Mobile</label>
                    <p>{user?.mobile || '+91 98765 43210'}</p>
                  </div>
                </div>
                <div className="info-item">
                  <AiOutlineCalendar size={20} />
                  <div>
                    <label>Age</label>
                    <p>{user?.studentProfile?.age || '16'} years</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="stats-card">
              <h3>Learning Stats</h3>
              <div className="stats-grid-profile">
                <div className="stat-box">
                  <span className="stat-value">12</span>
                  <span className="stat-label">Courses Enrolled</span>
                </div>
                <div className="stat-box">
                  <span className="stat-value">45h</span>
                  <span className="stat-label">Total Learning Time</span>
                </div>
                <div className="stat-box">
                  <span className="stat-value">8</span>
                  <span className="stat-label">Certificates</span>
                </div>
                <div className="stat-box">
                  <span className="stat-value">95%</span>
                  <span className="stat-label">Average Score</span>
                </div>
              </div>
            </div>
          </div>

          <div className="profile-sidebar-section">
            <div className="achievements-card">
              <h3>Recent Achievements</h3>
              <div className="achievement-list">
                <div className="achievement-item">
                  <div className="achievement-icon">🏆</div>
                  <div>
                    <h4>Course Completed</h4>
                    <p>Flutter Masterclass</p>
                  </div>
                </div>
                <div className="achievement-item">
                  <div className="achievement-icon">⭐</div>
                  <div>
                    <h4>Perfect Score</h4>
                    <p>React Quiz - 100%</p>
                  </div>
                </div>
                <div className="achievement-item">
                  <div className="achievement-icon">🎯</div>
                  <div>
                    <h4>Streak Master</h4>
                    <p>7 days learning streak</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
