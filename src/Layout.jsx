 
import './App.css'
import logo from './assets/images/logo.svg'
import ProfileImage from './assets/images/faces/face8.jpg'
import LogoMini from './assets/images/logo-mini.svg';
import Navbar from './componants/layout/navbar/Navbar.jsx'
import Sidebar from './componants/layout/sidebar/Sidebar.jsx';
import Footer from './componants/layout/footer/Footer.jsx';
import Dashboard from './features/dashboard/Dashboard.jsx';
import { Outlet } from 'react-router-dom';
 

function Layout() {
 

  return (
    <>
      <div className="container-scroller">
 
        {/* partial:partials/_navbar.html */}
        <Navbar Logo={logo} LogoMini={LogoMini} ProfileImage={ProfileImage} UserName='Rajkamal' WelcomeText='Good Morning ,'  />
        {/* partial */}
        <div className="container-fluid page-body-wrapper">
          {/* partial:partials/_sidebar.html */}
          <Sidebar />
          {/* partial */}
          <div className="main-panel">
            <div className="content-wrapper">
              <div className="row">
                  <Outlet />
              </div>
            </div>
            {/* content-wrapper ends */}
            {/* partial:partials/_footer.html */}
            <Footer />
            {/* partial */}
          </div>
          {/* main-panel ends */}
        </div>
        {/* page-body-wrapper ends */}
      </div>
    </>
  )
}

export default Layout
