import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, signout } = useAuth();

  const handleLogout = () => {
    signout();
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-primary-600">TinyLink</h1>
            <span className="text-sm text-gray-500">URL Shortener</span>
          </Link>
          <nav className="flex items-center space-x-4">
            {user && (
              <>
                <span className="text-sm text-gray-600">
                  Welcome, <span className="font-semibold">{user.username}</span>
                </span>
                <Link
                  to="/"
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                >
                  Logout
                </button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

