// src/components/Auth.js

import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../context/authContext'; // Adjust the path as needed

const Auth = ({ element, requiresAuth = false }) => {
  const { authUser } = useAuthContext();
  const location = useLocation();


  if (requiresAuth && !authUser) {
    // Redirect to login page if authentication is required and user is not authenticated
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // Render the child component if authentication state matches
  return <>{element}</>;
};

export default Auth;
