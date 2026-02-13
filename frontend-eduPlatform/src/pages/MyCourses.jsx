import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { AiOutlineStar, AiOutlineClockCircle, AiOutlinePlayCircle } from 'react-icons/ai';
import { MdComputer } from 'react-icons/md';
import './MyCourses.css';

const enrolledCourses = [
  { id: 1, title: 'Flutter Masterclass (Dart, APIs, Firebase & More)', category: 'IT & Software', progress: 65, rating: 4.8, students: 9530, color: 'pink', totalLessons: 45, completedLessons: 29 },
  { id: 2, title: 'Advanced React Development', category: 'Business', progress: 40, rating: 4.9, students: 7234, color: 'orange', totalLessons: 32, completedLessons: 13 },
  { id: 3, title: 'Python for Data Science', category: 'IT & Software', progress: 85, rating: 4.7, students: 12450, color: 'purple', totalLessons: 50, completedLessons: 42 },
  { id: 4, title: 'UI/UX Design Fundamentals', category: 'Design', progress: 20, rating: 5.0, students: 5678, color: 'green', totalLessons: 28, completedLessons: 6 }
];

function MyCourses() {
  return (
    <Layout>
      <div className="my-courses-page">
        <div className="page-header-courses">
          <h1 className="page-title-courses">
            My <span className="gradient-text">Courses</span>
          </h1>
          <p className="page-subtitle">Continue your learning journey</p>
        </div>

        <div className="courses-list">
          {enrolledCourses.map((course) => (
            <Link to={`/course/${course.id}`} key={course.id} className={`enrolled-course-card card-${course.color}`}>
              <div className="course-card-header">
                <div className="course-category-badge">
                  <MdComputer size={16} />
                  <span>{course.category}</span>
                </div>
                <div className="course-rating-badge">
                  <AiOutlineStar size={14} />
                  <span>{course.rating}</span>
                </div>
              </div>
              
              <h3 className="enrolled-course-title">{course.title}</h3>
              
              <div className="course-meta-info">
                <span>
                  <AiOutlinePlayCircle size={16} />
                  {course.completedLessons}/{course.totalLessons} lessons
                </span>
                <span>
                  <AiOutlineClockCircle size={16} />
                  {course.students.toLocaleString()} students
                </span>
              </div>

              <div className="progress-section">
                <div className="progress-header">
                  <span>Progress</span>
                  <span className="progress-percentage">{course.progress}%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${course.progress}%` }}></div>
                </div>
              </div>

              <button className="continue-btn">Continue Learning</button>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default MyCourses;
