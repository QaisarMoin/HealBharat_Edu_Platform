import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Results() {
  const navigate = useNavigate();
  const { result } = useSelector((state) => state.assessment);

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">No results available</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white shadow rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Assessment Results</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Total Score</h3>
              <p className="text-4xl font-bold text-blue-600">{result.totalScore}</p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-900 mb-2">Personality Type</h3>
              <p className="text-2xl font-bold text-green-600">{result.personalityType}</p>
            </div>
          </div>

          {result.categoryScores && Object.keys(result.categoryScores).length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Category Scores</h3>
              <div className="space-y-3">
                {Object.entries(result.categoryScores).map(([category, score]) => (
                  <div key={category} className="flex items-center">
                    <span className="w-32 text-gray-700 font-medium">{category}</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-4">
                      <div
                        className="bg-blue-600 h-4 rounded-full"
                        style={{ width: `${(score / 10) * 100}%` }}
                      />
                    </div>
                    <span className="ml-4 text-gray-900 font-semibold">{score}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {result.interestTags && result.interestTags.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Interest Areas</h3>
              <div className="flex flex-wrap gap-2">
                {result.interestTags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {result.suggestedStreams && result.suggestedStreams.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Suggested Streams</h3>
              <div className="space-y-3">
                {result.suggestedStreams.map((stream, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                  >
                    <p className="text-lg font-medium text-gray-900">{stream}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Back to Dashboard
            </button>
            <button
              onClick={() => navigate('/assessment')}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Retake Assessment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Results;
