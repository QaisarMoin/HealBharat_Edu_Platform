import './Dashboard.css';

function Settings() {
  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1>Settings</h1>
          <p className="subtitle">Manage platform settings and configurations</p>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '24px' }}>
        <h2 style={{ marginBottom: '24px' }}>Platform Settings</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '20px', borderBottom: '1px solid var(--border-color)' }}>
            <div>
              <h4 style={{ marginBottom: '4px' }}>Email Notifications</h4>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Receive updates via email</p>
            </div>
            <label className="switch">
              <input type="checkbox" defaultChecked />
              <span className="slider"></span>
            </label>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '20px', borderBottom: '1px solid var(--border-color)' }}>
            <div>
              <h4 style={{ marginBottom: '4px' }}>User Registration</h4>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Allow new user registrations</p>
            </div>
            <label className="switch">
              <input type="checkbox" defaultChecked />
              <span className="slider"></span>
            </label>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '20px', borderBottom: '1px solid var(--border-color)' }}>
            <div>
              <h4 style={{ marginBottom: '4px' }}>Course Auto-Publish</h4>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Automatically publish approved courses</p>
            </div>
            <label className="switch">
              <input type="checkbox" />
              <span className="slider"></span>
            </label>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ marginBottom: '4px' }}>Maintenance Mode</h4>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Put platform in maintenance mode</p>
            </div>
            <label className="switch">
              <input type="checkbox" />
              <span className="slider"></span>
            </label>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 style={{ marginBottom: '24px' }}>Admin Profile</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px' }}>Email</label>
            <input type="email" defaultValue="admin@healbharat.com" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '14px' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px' }}>Name</label>
            <input type="text" defaultValue="Admin User" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '14px' }} />
          </div>
          <button className="btn btn-primary" style={{ alignSelf: 'flex-start', marginTop: '8px' }}>Save Changes</button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
