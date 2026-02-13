import Layout from '../components/Layout';
import { AiOutlineSetting, AiOutlineBell, AiOutlineLock, AiOutlineGlobal } from 'react-icons/ai';
import './Settings.css';

function Settings() {
  return (
    <Layout>
      <div className="settings-page">
        <h1 className="page-title-settings">
          <AiOutlineSetting size={48} />
          Settings
        </h1>

        <div className="settings-grid">
          <div className="settings-section">
            <h3><AiOutlineBell size={20} /> Notifications</h3>
            <div className="setting-item">
              <div>
                <h4>Email Notifications</h4>
                <p>Receive updates via email</p>
              </div>
              <label className="toggle">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="setting-item">
              <div>
                <h4>Push Notifications</h4>
                <p>Get notified about new courses</p>
              </div>
              <label className="toggle">
                <input type="checkbox" />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>

          <div className="settings-section">
            <h3><AiOutlineLock size={20} /> Privacy</h3>
            <div className="setting-item">
              <div>
                <h4>Profile Visibility</h4>
                <p>Make your profile public</p>
              </div>
              <label className="toggle">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>

          <div className="settings-section">
            <h3><AiOutlineGlobal size={20} /> Language & Region</h3>
            <div className="setting-item">
              <div>
                <h4>Language</h4>
                <p>Choose your preferred language</p>
              </div>
              <select className="settings-select">
                <option>English</option>
                <option>Hindi</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Settings;
