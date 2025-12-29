import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
// Import vendor CSS files
import './assets/vendors/feather/feather.css'
import './assets/vendors/mdi/css/materialdesignicons.min.css'
import './assets/vendors/ti-icons/css/themify-icons.css'
import './assets/vendors/font-awesome/css/font-awesome.min.css'
import './assets/vendors/typicons/typicons.css'
import './assets/vendors/simple-line-icons/css/simple-line-icons.css'
import './assets/vendors/css/vendor.bundle.base.css'
import './assets/vendors/bootstrap-datepicker/bootstrap-datepicker.min.css'
import './assets/vendors/datatables.net-bs4/dataTables.bootstrap4.css'
import './assets/css/style.css'

// Vendor bundle (includes jQuery + Bootstrap JS if template uses it)
import './assets/vendors/js/vendor.bundle.base.js'

// Plugins
import './assets/vendors/bootstrap-datepicker/bootstrap-datepicker.min.js'
import './assets/vendors/chart.js/chart.umd.js'
import './assets/vendors/progressbar.js/progressbar.min.js'

// Template / layout scripts
import './assets/js/off-canvas.js'
import './assets/js/template.js'
import './assets/js/settings.js'
import './assets/js/hoverable-collapse.js'
import './assets/js/todolist.js'

// Dashboard scripts
import './assets/js/jquery.cookie.js'
import './assets/js/dashboard.js'


import Layout from './Layout.jsx'

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Dashboard from './features/dashboard/Dashboard.jsx'
import UserReg from './features/UserReg/UserReg.jsx'
import Education from './features/education/Education.jsx'
import Skills from './features/skills/Skills.jsx'
import Experiance from './features/experiance/Experiance.jsx'
import Projects from './features/projects/Projects.jsx' 
 
 

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Dashboard />} />
      <Route path="UserReg" element={<UserReg />} />
      <Route path="Education" element={<Education />} /> 
      <Route path="Experiance" element={<Experiance />} />
      <Route path="Skills" element={<Skills />} />
      <Route path="Projects" element={<Projects />} />
     
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
