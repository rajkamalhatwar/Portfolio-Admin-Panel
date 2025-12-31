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


import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { RouterProvider } from 'react-router-dom'
 
import router from './routes/Router.jsx' 
import store from './store/store.js'
import { Provider } from 'react-redux'
 
// 🔒 HARD BLOCK native form submission (jQuery-safe)
document.addEventListener(
  "submit",
  function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    return false;
  },
  true // capture phase
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store} >
      <ToastContainer
        position="top-right"
        autoClose={3000}       // 3 seconds
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)
