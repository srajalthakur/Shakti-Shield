import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../Context/AuthContext';
import Loader from './Home/Loader';

const ProtectedRoute = ({ children }) => {
  const { auth, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // If auth check is done and user is not authenticated, redirect to login
    if (!loading && !auth) {
      navigate('/login', { replace: true });
    }
  }, [auth, loading, navigate]);

  // Show loader while auth status is being determined
  if (loading) {
    return <Loader />;
  }

  // Render children if authenticated, else null (redirect will have already happened)
  return auth ? children : null;
};

export default ProtectedRoute;
