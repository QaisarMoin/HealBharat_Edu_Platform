import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser, reset } from '../store/authSlice';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import './Auth.css';

function Register() {
  const [formData, setFormData] = useState({
    mobile: '',
    email: '',
    password: '',
    profile: {
      fullName: '',
      age: '',
      classLevel: '10th',
    },
  });
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isSuccess) {
      navigate('/dashboard');
    }
    dispatch(reset());
  }, [isSuccess, navigate, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.profile) {
      setFormData({
        ...formData,
        profile: { ...formData.profile, [name]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        {/* Left Side - Illustration */}
        <div className="auth-left">
          <div className="auth-brand">
            <div className="brand-icon">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <rect width="40" height="40" rx="12" fill="url(#gradient1)"/>
                <path d="M20 10L28 16V24L20 30L12 24V16L20 10Z" fill="white" fillOpacity="0.9"/>
                <defs>
                  <linearGradient id="gradient1" x1="0" y1="0" x2="40" y2="40">
                    <stop stopColor="#bdb3ff"/>
                    <stop offset="1" stopColor="#ffb3ba"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="brand-name">HealBharat</span>
          </div>
          
          <div className="auth-illustration">
            <h1 className="auth-title">
              Start your<br/>
              <span className="gradient-text">learning journey</span>
            </h1>
            <p className="auth-subtitle">
              Join thousands of students discovering their career paths
            </p>
            
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-number">10K+</div>
                <div className="stat-label">Active Students</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">500+</div>
                <div className="stat-label">Courses</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">95%</div>
                <div className="stat-label">Success Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Register Form */}
        <div className="auth-right">
          <div className="auth-form-container">
            <div className="auth-header">
              <h2>Create an account</h2>
              <p>Start your personalized learning experience</p>
            </div>

            {isError && (
              <div className="alert alert-error">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"/>
                </svg>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    placeholder="John Doe"
                    value={formData.profile.fullName}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="age">Age</label>
                  <input
                    id="age"
                    name="age"
                    type="number"
                    placeholder="16"
                    value={formData.profile.age}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="mobile">Mobile Number</label>
                <input
                  id="mobile"
                  name="mobile"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <div className="password-input-wrapper">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      className="form-input"
                    />
                    <button
                      type="button"
                      className="password-toggle-btn"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="classLevel">Class Level</label>
                  <select
                    id="classLevel"
                    name="classLevel"
                    value={formData.profile.classLevel}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="10th">10th Grade</option>
                    <option value="12th">12th Grade</option>
                  </select>
                </div>
              </div>

              <label className="checkbox-label">
                <input type="checkbox" required />
                <span>I agree to the <a href="#" className="link-text">Terms & Conditions</a></span>
              </label>

              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary"
              >
                {isLoading ? (
                  <span className="btn-loading">
                    <span className="spinner"></span>
                    Creating account...
                  </span>
                ) : (
                  'Create account'
                )}
              </button>

              <div className="divider">
                <span>Or register with</span>
              </div>

              <div className="social-buttons">
                <button type="button" className="btn btn-social">
                  <svg width="20" height="20" viewBox="0 0 20 20">
                    <path fill="#4285F4" d="M19.6 10.23c0-.82-.1-1.42-.25-2.05H10v3.72h5.5c-.15.96-.74 2.31-2.04 3.22v2.45h3.16c1.89-1.73 2.98-4.3 2.98-7.34z"/>
                    <path fill="#34A853" d="M13.46 15.13c-.83.59-1.96 1-3.46 1-2.64 0-4.88-1.74-5.68-4.15H1.07v2.52C2.72 17.75 6.09 20 10 20c2.7 0 4.96-.89 6.62-2.42l-3.16-2.45z"/>
                    <path fill="#FBBC05" d="M3.99 10c0-.69.12-1.35.32-1.97V5.51H1.07A9.973 9.973 0 000 10c0 1.61.39 3.14 1.07 4.49l3.24-2.52c-.2-.62-.32-1.28-.32-1.97z"/>
                    <path fill="#EA4335" d="M10 3.88c1.88 0 3.13.81 3.85 1.48l2.84-2.76C14.96.99 12.7 0 10 0 6.09 0 2.72 2.25 1.07 5.51l3.24 2.52C5.12 5.62 7.36 3.88 10 3.88z"/>
                  </svg>
                  Google
                </button>
                <button type="button" className="btn btn-social">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M17.05 11.14c-.05-1.03.84-1.53.88-1.56-.48-.7-1.23-1.08-1.99-1.1-.85-.09-1.65.5-2.08.5s-1.09-.49-1.79-.47c-.92.01-1.77.54-2.24 1.36-.96 1.66-.25 4.12.69 5.47.46.66 1.01 1.4 1.73 1.37.7-.03.97-.45 1.82-.45s1.09.45 1.84.44c.76-.01 1.23-.67 1.69-1.34.53-.77.75-1.52.76-1.56-.02-.01-1.46-.56-1.48-2.22M14.27 5.42c.38-.46.64-1.1.57-1.74-.55.02-1.21.37-1.6.83-.35.41-.66 1.06-.58 1.69.61.05 1.24-.31 1.61-.78"/>
                  </svg>
                  Apple
                </button>
              </div>

              <p className="auth-switch">
                Already have an account? <Link to="/login" className="link-primary">Sign in</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
