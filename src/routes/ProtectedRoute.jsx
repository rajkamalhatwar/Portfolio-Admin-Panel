import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRoute() {
 
const isAuthenticate = useSelector((state) => state.auth.status); 

  if (!isAuthenticate) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
 
}

export default ProtectedRoute
