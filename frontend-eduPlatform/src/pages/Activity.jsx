import Layout from '../components/Layout';
import { AiOutlineLineChart } from 'react-icons/ai';
import './Activity.css';

const activityData = [
  { month: 'Jan', hours: 2.5 },
  { month: 'Feb', hours: 3.2 },
  { month: 'Mar', hours: 2.8 },
  { month: 'Apr', hours: 3.5 },
  { month: 'May', hours: 2.3 },
  { month: 'Jun', hours: 3.1 },
  { month: 'Jul', hours: 3.5 },
  { month: 'Aug', hours: 4.2 },
  { month: 'Sep', hours: 3.8 },
  { month: 'Oct', hours: 4.5 },
  { month: 'Nov', hours: 3.9 },
  { month: 'Dec', hours: 4.8 }
];

const recentActivity = [
  { id: 1, action: 'Completed lesson', title: 'React Hooks', course: 'Advanced React', time: '2 hours ago', color: 'pink' },
  { id: 2, action: 'Started quiz', title: 'JavaScript ES6', course: 'JS Fundamentals', time: '5 hours ago', color: 'purple' },
  { id: 3, action: 'Earned certificate', title: 'Python Basics', course: 'Python Course', time: '1 day ago', color: 'green' },
  { id: 4, action: 'Bookmarked lesson', title: 'CSS Grid', course: 'Web Design', time: '2 days ago', color: 'blue' }
];

function Activity() {
  const maxHours = Math.max(...activityData.map(d => d.hours));

  return (
    <Layout>
      <div className="activity-page">
        <div className="page-header-activity">
          <h1 className="page-title-activity">
            <AiOutlineLineChart size={48} />
            Activity
          </h1>
          <p className="page-subtitle">Track your learning progress</p>
        </div>

        <div className="activity-grid">
          <div className="activity-chart-card">
            <div className="chart-header">
              <h3>Learning Hours (2024)</h3>
              <div className="total-hours">
                <span className="hours-value">42.1h</span>
                <span className="hours-label">Total</span>
              </div>
            </div>
            <div className="yearly-chart">
              {activityData.map((data, index) => (
                <div key={index} className="chart-column">
                  <div 
                    className="column-fill"
                    style={{ height: `${(data.hours / maxHours) * 100}%` }}
                    title={`${data.hours}h`}
                  ></div>
                  <span className="column-label">{data.month}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="stats-overview">
            <div className="stat-card-activity">
              <span className="stat-icon">📚</span>
              <div>
                <span className="stat-number">12</span>
                <span className="stat-text">Courses</span>
              </div>
            </div>
            <div className="stat-card-activity">
              <span className="stat-icon">✅</span>
              <div>
                <span className="stat-number">45</span>
                <span className="stat-text">Completed</span>
              </div>
            </div>
            <div className="stat-card-activity">
              <span className="stat-icon">🔥</span>
              <div>
                <span className="stat-number">7</span>
                <span className="stat-text">Day Streak</span>
              </div>
            </div>
          </div>

          <div className="recent-activity-card">
            <h3>Recent Activity</h3>
            <div className="activity-timeline">
              {recentActivity.map((item) => (
                <div key={item.id} className={`timeline-item card-${item.color}`}>
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <span className="timeline-action">{item.action}</span>
                    <h4>{item.title}</h4>
                    <p>{item.course} • {item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Activity;
