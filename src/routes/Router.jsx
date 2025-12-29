import React from 'react'
import { Dashboard, Education, Experiance,Projects,Skills,UserReg,Login } from '../features/index';
import Layout from '../layouts/Layout.jsx';
import AuthLayout from '../layouts/AuthLayout.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  // PUBLIC ROUTES
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <Login /> }
    ]
  },

  // PROTECTED ROUTES
  {
    element: <ProtectedRoute />,
    children: [
      {
        
        element: <Layout />,
        children: [
          { path: "/", element: <Dashboard /> },
          { path: "/UserReg", element: <UserReg /> },
          { path: "/Education", element: <Education /> },
          { path: "/Experiance", element: <Experiance /> },
          { path: "/Skills", element: <Skills /> },
          { path: "/Projects", element: <Projects /> }
        ]
      }
    ]
  }
]);

export default router;

