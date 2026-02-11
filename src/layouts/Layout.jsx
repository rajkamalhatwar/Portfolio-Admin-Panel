import logo from '../assets/images/logo.svg';
import ProfileImage from '../assets/images/faces/face1.jpg';
import LogoMini from '../assets/images/logo-mini.svg';
import Navbar from '../componants/layout/navbar/Navbar.jsx';
import Sidebar from '../componants/layout/sidebar/Sidebar.jsx';
import Footer from '../componants/layout/footer/Footer.jsx'; 
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import authService from '../features/login/authService.js';
import { useEffect, useState } from 'react';
 
 

function Layout() {

  const userId = useSelector((state) => state.auth.userId);
  const [userData, setUserData] = useState([]);

  const fetchUserData = async (userId) => {
      const userData = await authService.getUserById(userId);
      if (userData) { 
        setUserData(userData);
        // reset({
        //   userName: userData.userName || "",
        //   email: userData.email || "",
        //   mobileNo: userData.mobileNo || "",
        //   heroLine: userData.heroLine || "",
        //   designations: userData.designations || "",
        //   shortAbout: userData.shortAbout || "",
        //   longAbout: userData.longAbout || "",
        //   address: userData.address || "",
        //   city: userData.city || "",
        //   state: userData.state || "",
        //   country: userData.country || "",
        //   twitterLink: userData.twitterLink || "",
        //   linkedInLink: userData.linkedInLink || "",
        //   gitHubLink: userData.gitHubLink || "",
        //   instagramLink : userData.instagramLink || "",
        //   behanceLink : userData.behanceLink || "",  
        // });
      }
  };

  useEffect(()=>{
    fetchUserData(userId);
  },[userId]) 
  return (
    <>
      <div className="container-scroller">
 
        {/* partial:partials/_navbar.html */}
        <Navbar Logo={logo} LogoMini={LogoMini} ProfileImage={ProfileImage} UserName={userData.userName} WelcomeText='Hello,' Email={userData.email}  />
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
