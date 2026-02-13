import './Dashboard.css';

function Analytics() {
  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1>Analytics</h1>
          <p className="subtitle">Track platform performance and user engagement</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card card-pink">
          <div className="stat-icon">📊</div>
          <div className="stat-info">
            <h3>89.2%</h3>
            <p>Completion Rate</p>
            <span className="stat-change positive">+5.2% from last month</span>
          </div>
        </div>

        <div className="stat-card card-purple">
          <div className="stat-icon">⏱️</div>
          <div className="stat-info">
            <h3>42.5h</h3>
            <p>Avg Learning Time</p>
            <span className="stat-change positive">+3.1h this month</span>
          </div>
        </div>

        <div className="stat-card card-blue">
          <div className="stat-icon">🎯</div>
          <div className="stat-info">
            <h3>4.7/5</h3>
            <p>Avg Course Rating</p>
            <span className="stat-change positive">Excellent feedback</span>
          </div>
        </div>

        <div className="stat-card card-green">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <h3>$45.2K</h3>
            <p>Revenue (MTD)</p>
            <span className="stat-change positive">+18% from last month</span>
          </div>
        </div>
      </div>

      <div className="card">
        <h2>User Engagement Metrics</h2>
        <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
          <p>📈 Chart visualization would go here</p>
          <p style={{ fontSize: '14px', marginTop: '8px' }}>Integration with Recharts for detailed analytics</p>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
