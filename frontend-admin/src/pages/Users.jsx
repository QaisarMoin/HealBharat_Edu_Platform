import { useState, useEffect } from 'react';
import { AiOutlineSearch, AiOutlineEdit, AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import { getAllUsers, deleteUser, createUser, updateUser } from '../services/adminService';
import Modal from '../components/Modal';
import Toast from '../components/Toast';
import useDebounce from '../hooks/useDebounce';
import './Users.css';

function Users() {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 10, pages: 0 });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [toast, setToast] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    mobile: '',
    password: '',
    fullName: '',
    age: '',
    gender: ''
  });
  
  // Debounce search term
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Fetch users when debounced search term changes
  useEffect(() => {
    fetchUsers();
  }, [debouncedSearchTerm]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const params = {};
      if (debouncedSearchTerm) {
        params.search = debouncedSearchTerm;
      }
      
      console.log('Fetching users with params:', params);
      const data = await getAllUsers(params);
      console.log('Received data:', data);
      
      // Handle both old and new response formats
      if (data.users) {
        // New format with pagination
        setUsers(data.users);
        setPagination(data.pagination || { total: 0, page: 1, limit: 10, pages: 0 });
      } else if (Array.isArray(data)) {
        // Old format (direct array)
        setUsers(data);
        setPagination({ total: data.length, page: 1, limit: data.length, pages: 1 });
      } else {
        setUsers([]);
        setPagination({ total: 0, page: 1, limit: 10, pages: 0 });
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      showToast('Failed to fetch users', 'error');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  const handleAddUser = () => {
    setFormData({
      email: '',
      mobile: '',
      password: '',
      fullName: '',
      age: '',
      gender: ''
    });
    setIsAddModalOpen(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setFormData({
      email: user.email || '',
      mobile: user.mobile || '',
      fullName: user.studentProfile?.fullName || '',
      age: user.studentProfile?.age || '',
      gender: user.studentProfile?.gender || ''
    });
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteUser(selectedUser._id);
      // Refresh users list from backend
      fetchUsers();
      showToast('User deleted successfully', 'success');
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error('Error deleting user:', error);
      showToast('Failed to delete user', 'error');
    }
  };

  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        email: formData.email,
        mobile: formData.mobile,
        password: formData.password,
        role: 'student',
        studentProfile: {
          fullName: formData.fullName,
          age: parseInt(formData.age) || undefined,
          ...(formData.gender && { gender: formData.gender })
        }
      };
      
      const newUser = await createUser(userData);
      // Refresh users list from backend
      fetchUsers();
      showToast('User created successfully', 'success');
      setIsAddModalOpen(false);
    } catch (error) {
      console.error('Error creating user:', error);
      showToast(error.response?.data?.message || 'Failed to create user', 'error');
    }
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        email: formData.email,
        mobile: formData.mobile,
        studentProfile: {
          fullName: formData.fullName,
          age: parseInt(formData.age) || undefined,
          ...(formData.gender && { gender: formData.gender })
        }
      };
      
      await updateUser(selectedUser._id, userData);
      // Refresh users list from backend
      fetchUsers();
      showToast('User updated successfully', 'success');
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error updating user:', error);
      showToast(error.response?.data?.message || 'Failed to update user', 'error');
    }
  };

  // No client-side filtering needed - backend handles search

  return (
    <div className="users-page">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="page-header">
        <div>
          <h1>Users Management</h1>
          <p className="subtitle">Manage all registered users and their activities</p>
        </div>
        <button className="btn btn-primary" onClick={handleAddUser}>
          <AiOutlinePlus size={20} />
          Add User
        </button>
      </div>

      <div className="card">
        <div className="table-controls">
          <div className="search-box">
            <AiOutlineSearch size={20} />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-buttons">
            <button className="btn btn-secondary">All Users</button>
            <button className="btn btn-secondary">Active</button>
            <button className="btn btn-secondary">Inactive</button>
          </div>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Courses</th>
                <th>Status</th>
                <th>Joined Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '40px' }}>
                    <div className="spinner" style={{ margin: '0 auto' }}></div>
                    <p style={{ marginTop: '16px', color: 'var(--text-secondary)' }}>Loading users...</p>
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id}>
                    <td>
                      <div className="user-cell">
                        <div className="user-avatar">
                          {user.studentProfile?.fullName?.charAt(0) || user.email?.charAt(0).toUpperCase()}
                        </div>
                        <span className="user-name">{user.studentProfile?.fullName || 'N/A'}</span>
                      </div>
                    </td>
                    <td>{user.email || user.mobile}</td>
                    <td><span className="role-badge">{user.role}</span></td>
                    <td>{user.enrolledCourses?.length || 0}</td>
                    <td>
                      <span className={`status-badge ${user.isVerified ? 'active' : 'inactive'}`}>
                        {user.isVerified ? 'verified' : 'unverified'}
                      </span>
                    </td>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn-icon" title="Edit" onClick={() => handleEditUser(user)}>
                          <AiOutlineEdit size={18} />
                        </button>
                        <button 
                          className="btn-icon btn-danger" 
                          title="Delete"
                          onClick={() => handleDeleteClick(user)}
                        >
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

      {/* Add User Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New User">
        <form onSubmit={handleSubmitAdd} className="user-form">
          <div className="form-row">
            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Enter full name"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter email"
              />
            </div>
            <div className="form-group">
              <label>Mobile</label>
              <input
                type="tel"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                placeholder="Enter mobile number"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Password *</label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Enter password"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Age</label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                placeholder="Enter age"
              />
            </div>
            <div className="form-group">
              <label>Gender</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Create User
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit User Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit User">
        <form onSubmit={handleSubmitEdit} className="user-form">
          <div className="form-row">
            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Enter full name"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter email"
              />
            </div>
            <div className="form-group">
              <label>Mobile</label>
              <input
                type="tel"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                placeholder="Enter mobile number"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Age</label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                placeholder="Enter age"
              />
            </div>
            <div className="form-group">
              <label>Gender</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Update User
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Delete User">
        <div className="delete-confirmation">
          <p>Are you sure you want to delete this user?</p>
          <div className="user-info-box">
            <strong>{selectedUser?.studentProfile?.fullName || 'N/A'}</strong>
            <span>{selectedUser?.email || selectedUser?.mobile}</span>
          </div>
          <p className="warning-text">This action cannot be undone.</p>
          
          <div className="form-actions">
            <button className="btn btn-secondary" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </button>
            <button className="btn btn-danger" onClick={handleDeleteConfirm}>
              Delete User
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Users;
