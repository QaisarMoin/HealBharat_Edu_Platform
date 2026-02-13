import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { AiOutlineStar, AiOutlineTrophy, AiOutlineClockCircle, AiOutlineRight } from 'react-icons/ai';
import { MdQuiz } from 'react-icons/md';
import './Quiz.css';

const quizCategories = [
  {
    id: 1,
    title: 'Programming Fundamentals',
    quizzes: 12,
    color: 'pink',
    icon: '💻',
    difficulty: 'Beginner'
  },
  {
    id: 2,
    title: 'Web Development',
    quizzes: 18,
    color: 'purple',
    icon: '🌐',
    difficulty: 'Intermediate'
  },
  {
    id: 3,
    title: 'Data Structures',
    quizzes: 15,
    color: 'blue',
    icon: '📊',
    difficulty: 'Advanced'
  },
  {
    id: 4,
    title: 'Database Management',
    quizzes: 10,
    color: 'green',
    icon: '🗄️',
    difficulty: 'Intermediate'
  },
  {
    id: 5,
    title: 'Mobile Development',
    quizzes: 14,
    color: 'orange',
    icon: '📱',
    difficulty: 'Intermediate'
  },
  {
    id: 6,
    title: 'Cloud Computing',
    quizzes: 8,
    color: 'pink',
    icon: '☁️',
    difficulty: 'Advanced'
  }
];

const recentQuizzes = [
  { id: 1, title: 'React Basics Quiz', score: 85, total: 100, date: '2 days ago' },
  { id: 2, title: 'JavaScript ES6', score: 92, total: 100, date: '5 days ago' },
  { id: 3, title: 'CSS Flexbox', score: 78, total: 100, date: '1 week ago' }
];

function Quiz() {
  return (
    <Layout>
      <div className="quiz-page">
        <div className="page-header-quiz">
          <div>
            <h1 className="page-title-quiz">
              Test your<br/>
              <span className="gradient-text">knowledge</span>
            </h1>
            <p className="page-subtitle">Choose from various quiz categories and challenge yourself</p>
          </div>
          <div className="quiz-stats-header">
            <div className="stat-badge">
              <AiOutlineTrophy size={20} />
              <span>45 Completed</span>
            </div>
            <div className="stat-badge">
              <AiOutlineStar size={20} />
              <span>Avg: 87%</span>
            </div>
          </div>
        </div>

        <div className="quiz-content-grid">
          <div className="quiz-main">
            <h2 className="section-title">Quiz Categories</h2>
            <div className="quiz-categories-grid">
              {quizCategories.map((category) => (
                <Link to={`/quiz/${category.id}`} key={category.id} className={`quiz-category-card card-${category.color}`}>
                  <div className="quiz-card-icon">{category.icon}</div>
                  <h3>{category.title}</h3>
                  <div className="quiz-card-meta">
                    <span className="quiz-count">
                      <MdQuiz size={16} />
                      {category.quizzes} quizzes
                    </span>
                    <span className={`difficulty-badge ${category.difficulty.toLowerCase()}`}>
                      {category.difficulty}
                    </span>
                  </div>
                  <div className="quiz-card-action">
                    <span>Start Quiz</span>
                    <AiOutlineRight size={18} />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="quiz-sidebar">
            <div className="recent-quizzes-card">
              <h3>Recent Quizzes</h3>
              <div className="recent-quiz-list">
                {recentQuizzes.map((quiz) => (
                  <div key={quiz.id} className="recent-quiz-item">
                    <div className="quiz-icon-small">
                      <MdQuiz size={20} />
                    </div>
                    <div className="quiz-info">
                      <h4>{quiz.title}</h4>
                      <p>{quiz.date}</p>
                    </div>
                    <div className="quiz-score">
                      <span className="score-value">{quiz.score}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="quiz-tips-card">
              <h3>💡 Quiz Tips</h3>
              <ul className="tips-list">
                <li>Read each question carefully</li>
                <li>Manage your time wisely</li>
                <li>Review your answers before submitting</li>
                <li>Don't rush - accuracy matters!</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Quiz;
