import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { AiOutlineStar, AiOutlineSearch } from 'react-icons/ai';
import { MdComputer, MdBusiness, MdDesignServices } from 'react-icons/md';

const allCourses = [
  { id: 1, title: 'CCNA 2020 200-125 Video Boot Camp', category: 'IT & Software', students: 9530, rating: 4.8, color: 'pink', icon: MdComputer },
  { id: 2, title: 'Business Writing Masterclass', category: 'Business', students: 1463, rating: 4.9, color: 'orange', icon: MdBusiness },
  { id: 3, title: 'UI/UX Design Complete Course', category: 'Design', students: 8735, rating: 5.0, color: 'green', icon: MdDesignServices },
  { id: 4, title: 'Python for Data Science', category: 'IT & Software', students: 12450, rating: 4.7, color: 'purple', icon: MdComputer },
  { id: 5, title: 'Digital Marketing 2024', category: 'Business', students: 6890, rating: 4.6, color: 'blue', icon: MdBusiness },
  { id: 6, title: 'Full Stack Web Development', category: 'IT & Software', students: 15230, rating: 4.9, color: 'pink', icon: MdComputer }
];

function CourseList() {
  return (
    <Layout>
      <div className="course-list-page">
        <div className="page-header-courses">
          <h1 className="page-title-courses">Explore <span className="gradient-text">Courses</span></h1>
          <div className="search-bar">
            <AiOutlineSearch size={20} />
            <input type="text" placeholder="Search courses..." />
          </div>
        </div>
        <div className="courses-list">
          {allCourses.map((course) => {
            const Icon = course.icon;
            return (
              <Link to={`/course/${course.id}`} key={course.id} className={`enrolled-course-card card-${course.color}`}>
                <div className="course-card-header">
                  <div className="course-category-badge"><Icon size={16} /><span>{course.category}</span></div>
                  <div className="course-rating-badge"><AiOutlineStar size={14} /><span>{course.rating}</span></div>
                </div>
                <h3 className="enrolled-course-title">{course.title}</h3>
                <div className="course-meta-info"><span>{course.students.toLocaleString()} students</span></div>
                <button className="continue-btn">Enroll Now</button>
              </Link>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}

export default CourseList;
