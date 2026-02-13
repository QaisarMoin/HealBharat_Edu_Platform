import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';

function CourseDetail() {
  const { id } = useParams();
  return (
    <Layout>
      <div style={{ padding: '40px', background: 'white', borderRadius: '20px' }}>
        <h1>Course Detail #{id}</h1>
        <p>Course content will be displayed here</p>
      </div>
    </Layout>
  );
}

export default CourseDetail;
