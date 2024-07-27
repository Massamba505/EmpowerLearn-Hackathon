// src/components/Auth.js

import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../context/authContext'; // Adjust the path as needed

const Auth = ({ children, requiresAuth = false }) => {
  const { authUser } = useAuthContext();
  const location = useLocation();

  if (requiresAuth && !authUser) {
    // Redirect to login page if authentication is required and user is not authenticated
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // if (!requiresAuth && authUser) {
  //   // Redirect to home page if not authenticated but user is logged in
  //   return <Navigate to="/" />;
  // }

  // Render the child component if authentication state matches
  return <>{children}</>;
};

export default Auth;
