import { useState, useEffect } from 'react';
import { AiOutlineSearch, AiOutlineEdit, AiOutlineDelete, AiOutlinePlus, AiOutlineEye } from 'react-icons/ai';
import { getAllQuizzes } from '../services/adminService';
import '../pages/Users.css';

function Quizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const data = await getAllQuizzes();
      setQuizzes(data);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="users-page">
      <div className="page-header">
        <div>
          <h1>Quiz Management</h1>
          <p className="subtitle">Create and manage quizzes for all courses</p>
        </div>
        <button className="btn btn-primary">
          <AiOutlinePlus size={20} />
          Create Quiz
        </button>
      </div>

      <div className="card">
        <div className="table-controls">
          <div className="search-box">
            <AiOutlineSearch size={20} />
            <input type="text" placeholder="Search quizzes..." />
          </div>
          <div className="filter-buttons">
            <button className="btn btn-secondary">All</button>
            <button className="btn btn-secondary">Active</button>
            <button className="btn btn-secondary">Draft</button>
          </div>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Quiz Title</th>
                <th>Course</th>
                <th>Questions</th>
                <th>Attempts</th>
                <th>Avg Score</th>
                <th>Difficulty</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '40px' }}>
                    <div className="spinner" style={{ margin: '0 auto' }}></div>
                    <p style={{ marginTop: '16px', color: 'var(--text-secondary)' }}>Loading quizzes...</p>
                  </td>
                </tr>
              ) : quizzes.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
                    No quizzes found
                  </td>
                </tr>
              ) : (
                quizzes.map((quiz) => (
                  <tr key={quiz._id}>
                    <td>
                      <div className="user-cell">
                        <div className="user-avatar">📝</div>
                        <span className="user-name">{quiz.title}</span>
                      </div>
                    </td>
                    <td>{quiz.courseId?.title || 'N/A'}</td>
                    <td>{quiz.questions?.length || 0}</td>
                    <td>{quiz.attempts || 0}</td>
                    <td><strong>{quiz.passingScore || 70}%</strong></td>
                    <td>
                      <span className="role-badge">
                        {quiz.difficulty || 'medium'}
                      </span>
                    </td>
                    <td>
                      <span className={`status-badge ${quiz.isActive ? 'active' : 'inactive'}`}>
                        {quiz.isActive ? 'active' : 'inactive'}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn-icon" title="View">
                          <AiOutlineEye size={18} />
                        </button>
                        <button className="btn-icon" title="Edit">
                          <AiOutlineEdit size={18} />
                        </button>
                        <button className="btn-icon btn-danger" title="Delete">
                          <AiOutlineDelete size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Quizzes;
