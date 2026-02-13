import Layout from '../components/Layout';
import { AiOutlineHeart, AiOutlineDelete } from 'react-icons/ai';
import { MdComputer } from 'react-icons/md';
import './Bookmarks.css';

const bookmarkedItems = [
  { id: 1, title: 'React Hooks Deep Dive', type: 'Lesson', course: 'Advanced React', color: 'pink', date: '2 days ago' },
  { id: 2, title: 'CSS Grid Layout', type: 'Lesson', course: 'Web Design', color: 'purple', date: '5 days ago' },
  { id: 3, title: 'JavaScript Closures Quiz', type: 'Quiz', course: 'JS Fundamentals', color: 'blue', date: '1 week ago' },
  { id: 4, title: 'Database Normalization', type: 'Lesson', course: 'SQL Basics', color: 'green', date: '2 weeks ago' }
];

function Bookmarks() {
  return (
    <Layout>
      <div className="bookmarks-page">
        <div className="page-header-bookmarks">
          <h1 className="page-title-bookmarks">
            <AiOutlineHeart size={48} className="heart-icon" />
            Bookmarks
          </h1>
          <p className="page-subtitle">Your saved lessons and quizzes</p>
        </div>

        <div className="bookmarks-list">
          {bookmarkedItems.map((item) => (
            <div key={item.id} className={`bookmark-item card-${item.color}`}>
              <div className="bookmark-icon">
                <MdComputer size={24} />
              </div>
              <div className="bookmark-content">
                <span className="bookmark-type">{item.type}</span>
                <h3>{item.title}</h3>
                <p>{item.course} • {item.date}</p>
              </div>
              <button className="bookmark-delete">
                <AiOutlineDelete size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Bookmarks;
