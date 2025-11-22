import { useState } from 'react';
import { createLink } from '../utils/api';

const AddLinkForm = ({ onLinkCreated }) => {
  const [target, setTarget] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const data = await createLink(target, code || null);
      setSuccess('Link created successfully!');
      setTarget('');
      setCode('');
      if (onLinkCreated) {
        onLinkCreated();
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || 'Failed to create link');
      } else {
        setError('Network error. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Create Short Link</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="target" className="block text-sm font-medium text-gray-700 mb-1">
            Long URL *
          </label>
          <input
            type="url"
            id="target"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder="https://example.com"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
            Custom Shortcode (optional)
          </label>
          <input
            type="text"
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="6-8 alphanumeric characters"
            pattern="[A-Za-z0-9]{6,8}"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            disabled={loading}
          />
          <p className="mt-1 text-xs text-gray-500">
            Leave empty to auto-generate. Must be 6-8 alphanumeric characters.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
            {success}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !target}
          className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Creating...' : 'Create Short Link'}
        </button>
      </form>
    </div>
  );
};

export default AddLinkForm;

