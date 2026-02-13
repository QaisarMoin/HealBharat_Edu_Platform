import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';

function QuizDetail() {
  const { id } = useParams();
  return (
    <Layout>
      <div style={{ padding: '40px', background: 'white', borderRadius: '20px' }}>
        <h1>Quiz #{id}</h1>
        <p>Quiz questions will be displayed here</p>
      </div>
    </Layout>
  );
}

export default QuizDetail;
