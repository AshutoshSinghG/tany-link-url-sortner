import { useState } from 'react';
import { deleteLink, getShortUrl } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const LinkTable = ({ links, onDelete, loading }) => {
  const [deletingCode, setDeletingCode] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleDelete = async (code) => {
    if (!window.confirm('Are you sure you want to delete this link?')) {
      return;
    }

    setDeletingCode(code);
    try {
      await deleteLink(code);
      if (onDelete) {
        onDelete();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete link');
    } finally {
      setDeletingCode(null);
    }
  };

  const handleCopy = (code) => {
    const shortUrl = getShortUrl(code);
    navigator.clipboard.writeText(shortUrl);
    alert('Short URL copied to clipboard!');
  };

  const truncateUrl = (url, maxLength = 50) => {
    if (url.length <= maxLength) return url;
    return url.substring(0, maxLength) + '...';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const filteredLinks = links.filter((link) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      link.code.toLowerCase().includes(searchLower) ||
      link.target.toLowerCase().includes(searchLower)
    );
  });

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <p className="text-gray-500">Loading links...</p>
      </div>
    );
  }

  if (links.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <p className="text-gray-500">No links yet. Create your first short link above!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b">
        <input
          type="text"
          placeholder="Search by code or URL..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Short Code
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Long URL
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Clicks
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Clicked
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredLinks.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No links found matching your search.
                </td>
              </tr>
            ) : (
              filteredLinks.map((link) => (
                <tr key={link.code} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-primary-600">
                        {link.code}
                      </span>
                      <button
                        onClick={() => handleCopy(link.code)}
                        className="text-xs text-gray-500 hover:text-primary-600"
                        title="Copy short URL"
                      >
                        📋
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-md truncate" title={link.target}>
                      {truncateUrl(link.target)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{link.totalClicks || 0}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-500">{formatDate(link.lastClicked)}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => navigate(`/code/${link.code}`)}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        View Stats
                      </button>
                      <button
                        onClick={() => handleDelete(link.code)}
                        disabled={deletingCode === link.code}
                        className="text-red-600 hover:text-red-900 disabled:text-gray-400"
                      >
                        {deletingCode === link.code ? 'Deleting...' : 'Delete'}
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
  );
};

export default LinkTable;

