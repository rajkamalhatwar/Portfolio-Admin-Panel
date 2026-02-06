import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client' 

import './index.css'
import './App.css'

// // ✅ CSS imports are SAFE
// import './assets/vendors/feather/feather.css'
// import './assets/vendors/mdi/css/materialdesignicons.min.css'
// import './assets/vendors/ti-icons/css/themify-icons.css'
// import './assets/vendors/font-awesome/css/font-awesome.min.css'
// import './assets/vendors/typicons/typicons.css'
// import './assets/vendors/simple-line-icons/css/simple-line-icons.css'
// import './assets/vendors/css/vendor.bundle.base.css'
// import './assets/vendors/bootstrap-datepicker/bootstrap-datepicker.min.css'
// import './assets/vendors/datatables.net-bs4/dataTables.bootstrap4.css'
// import './assets/css/style.css' 
 
import "react-toastify/dist/ReactToastify.css";

import { RouterProvider } from 'react-router-dom'
 
import router from './routes/Router.jsx' 
import store from './store/store.js'
import { Provider } from 'react-redux'
import TostAlert from './componants/toastAlert/TostAlert.jsx'
 
 
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store} >
       <TostAlert />
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)
