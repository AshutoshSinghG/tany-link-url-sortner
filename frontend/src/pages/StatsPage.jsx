import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getLinkStats, getShortUrl } from '../utils/api';
import Loader from '../components/Loader';

const StatsPage = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const [link, setLink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await getLinkStats(code);
        setLink(data);
      } catch (err) {
        if (err.response?.status === 404) {
          setError('Link not found');
        } else {
          setError(err.response?.data?.message || 'Failed to load stats');
        }
      } finally {
        setLoading(false);
      }
    };

    if (code) {
      fetchStats();
    }
  }, [code]);

  const handleCopy = () => {
    const shortUrl = getShortUrl(code);
    navigator.clipboard.writeText(shortUrl);
    alert('Short URL copied to clipboard!');
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  if (loading) {
    return <Loader />;
  }

  if (error || !link) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">404 - Link Not Found</h2>
          <p className="text-gray-600 mb-4">
            The short link with code <span className="font-mono font-semibold">{code}</span> does not exist.
          </p>
        </div>
        <Link
          to="/"
          className="inline-block bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700 transition-colors"
        >
          Go to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-primary-600 hover:text-primary-700 mb-4"
        >
          ← Back
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Link Statistics</h1>
        <p className="text-gray-600 mt-2">Detailed stats for short code: <span className="font-mono font-semibold">{code}</span></p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Short Code
            </label>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-mono font-semibold text-primary-600">{link.code}</span>
              <button
                onClick={handleCopy}
                className="text-sm text-gray-500 hover:text-primary-600"
                title="Copy short URL"
              >
                📋 Copy
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Short URL
            </label>
            <a
              href={getShortUrl(link.code)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg text-primary-600 hover:underline break-all"
            >
              {getShortUrl(link.code)}
            </a>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Original URL
            </label>
            <a
              href={link.target}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg text-blue-600 hover:underline break-all"
            >
              {link.target}
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Total Clicks
              </label>
              <p className="text-3xl font-bold text-gray-900">{link.totalClicks || 0}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Last Clicked
              </label>
              <p className="text-lg text-gray-900">{formatDate(link.lastClicked)}</p>
            </div>
          </div>

          <div className="pt-4 border-t">
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Created At
            </label>
            <p className="text-lg text-gray-900">{formatDate(link.createdAt)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;

