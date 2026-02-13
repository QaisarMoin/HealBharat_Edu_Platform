import { useState, useEffect } from 'react';
import { AiOutlineSearch, AiOutlineEdit, AiOutlineDelete, AiOutlinePlus, AiOutlineEye } from 'react-icons/ai';
import { getAllCourses } from '../services/adminService';
import '../pages/Users.css'; // Reuse same styles

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const data = await getAllCourses();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="users-page">
      <div className="page-header">
        <div>
          <h1>Courses Management</h1>
          <p className="subtitle">Manage all courses and their content</p>
        </div>
        <button className="btn btn-primary">
          <AiOutlinePlus size={20} />
          Create Course
        </button>
      </div>

      <div className="card">
        <div className="table-controls">
          <div className="search-box">
            <AiOutlineSearch size={20} />
            <input type="text" placeholder="Search courses..." />
          </div>
          <div className="filter-buttons">
            <button className="btn btn-secondary">All</button>
            <button className="btn btn-secondary">Published</button>
            <button className="btn btn-secondary">Draft</button>
          </div>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Course Title</th>
                <th>Category</th>
                <th>Enrollments</th>
                <th>Price</th>
                <th>Status</th>
                <th>Created Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '40px' }}>
                    <div className="spinner" style={{ margin: '0 auto' }}></div>
                    <p style={{ marginTop: '16px', color: 'var(--text-secondary)' }}>Loading courses...</p>
                  </td>
                </tr>
              ) : courses.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
                    No courses found
                  </td>
                </tr>
              ) : (
                courses.map((course) => (
                  <tr key={course._id}>
                    <td>
                      <div className="user-cell">
                        <div className="user-avatar">📚</div>
                        <span className="user-name">{course.title}</span>
                      </div>
                    </td>
                    <td>{course.category || 'Uncategorized'}</td>
                    <td>{course.enrolledStudents?.length || 0}</td>
                    <td><strong>${course.price || 0}</strong></td>
                    <td>
                      <span className={`status-badge ${course.isPublished ? 'active' : 'inactive'}`}>
                        {course.isPublished ? 'published' : 'draft'}
                      </span>
                    </td>
                    <td>{new Date(course.createdAt).toLocaleDateString()}</td>
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

export default Courses;
