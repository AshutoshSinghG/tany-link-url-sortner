import { useState, useEffect } from 'react';
import AddLinkForm from '../components/AddLinkForm';
import LinkTable from '../components/LinkTable';
import Loader from '../components/Loader';
import { getAllLinks } from '../utils/api';

const Dashboard = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchLinks = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getAllLinks();
      setLinks(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load links');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleLinkCreated = () => {
    fetchLinks();
  };

  const handleLinkDeleted = () => {
    fetchLinks();
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage your short links</p>
      </div>

      <AddLinkForm onLinkCreated={handleLinkCreated} />

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <Loader />
      ) : (
        <LinkTable links={links} onDelete={handleLinkDeleted} loading={false} />
      )}
    </div>
  );
};

export default Dashboard;

