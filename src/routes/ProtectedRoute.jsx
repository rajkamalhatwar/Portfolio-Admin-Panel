import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRoute() {
 
const isAuthenticate = useSelector((state) => state.auth.status);
 // Replace with your actual authentication logic

  if (!isAuthenticate) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
 
}

export default ProtectedRoute
