import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  element: JSX.Element; // Expecting a React component or JSX element
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element,...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/users/verify');
        if (response.status === 401) {
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error verifying user:', error);
        setIsAuthenticated(false);
      }
    };

    fetchData();
  }, [location]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? element : <Navigate to='/login' />;
};

export default ProtectedRoute;