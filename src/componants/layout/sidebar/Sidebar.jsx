import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import { useMatch } from 'react-router-dom';

function Sidebar() {
    // Check if route matches "/"
  const dashboardMatch = useMatch({ path: "/", end: true });
  const userRegMatch = useMatch({ path: "/UserReg", end: true });
  const educationMatch = useMatch({ path: "/Education", end: true });
  const experianceMatch = useMatch({ path: "/Experiance", end: true });
  const skillseMatch = useMatch({ path: "/Skills", end: true });
  const projectseMatch = useMatch({ path: "/Projects", end: true });
  return (
    <>
          <nav className="sidebar sidebar-offcanvas" id="sidebar">
            <ul className="nav"> 

             <li className={`nav-item ${dashboardMatch ? "active" : ""}`}>
                <NavLink to="/" className="nav-link text-decoration-none">
                  <i className="mdi mdi-grid-large menu-icon"></i>
                  <span className="menu-title">Dashboard</span>
                </NavLink>
              </li>
              <li className="nav-item nav-category">Portfolio Section</li>
              <li className={`nav-item ${userRegMatch ? "active" : ""}`}>
                <NavLink to="/UserReg" className="nav-link text-decoration-none">
                  <i className="mdi mdi-account-multiple-plus-outline menu-icon"></i>
                  <span className="menu-title">User Reg</span>
                </NavLink>
              </li>  
              <li className={`nav-item ${educationMatch ? "active" : ""}`}>
                <NavLink to="/Education" className="nav-link text-decoration-none">
                  <i className="mdi mdi-school-outline menu-icon"></i>
                  <span className="menu-title">Education</span>
                </NavLink>
              </li>  
              <li className={`nav-item ${experianceMatch ? "active" : ""}`}>
                <NavLink to="/Experiance" className="nav-link text-decoration-none">
                  <i className="mdi mdi-badge-account-horizontal-outline menu-icon"></i>
                  <span className="menu-title">Experiance</span>
                </NavLink>
              </li>             
              <li className={`nav-item ${skillseMatch ? "active" : ""}`}>
                <NavLink to="/Skills" className="nav-link text-decoration-none">
                  <i className="mdi mdi-star-shooting-outline menu-icon"></i>
                  <span className="menu-title">Skills</span>
                </NavLink>
              </li>
              <li className={`nav-item ${projectseMatch ? "active" : ""}`}>
                <NavLink to="/Projects" className="nav-link text-decoration-none">
                  <i className="mdi mdi-file-document-multiple-outline menu-icon"></i>
                  <span className="menu-title">Projects</span>
                </NavLink>
              </li>                     
 
              <li className="nav-item">
                <a className="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                  <i className="menu-icon mdi mdi-floor-plan"></i>
                  <span className="menu-title">Elements</span>
                  <i className="menu-arrow"></i>
                </a>
                <div className="collapse" id="ui-basic">
                  <ul className="nav flex-column sub-menu">
                    <li className="nav-item"> <a className="nav-link" href="../../pages/ui-features/buttons.html">Buttons</a></li>
                    <li className="nav-item"> <a className="nav-link" href="../../pages/ui-features/dropdowns.html">Dropdowns</a></li>
                    <li className="nav-item"> <a className="nav-link" href="../../pages/ui-features/typography.html">Typography</a></li>
                  </ul>
                </div>
              </li> 
              <li className="nav-item">
                <a className="nav-link" data-bs-toggle="collapse" href="#form-elements" aria-expanded="false" aria-controls="form-elements">
                  <i className="menu-icon mdi mdi-card-text-outline"></i>
                  <span className="menu-title">Form elements</span>
                  <i className="menu-arrow"></i>
                </a>
                <div className="collapse" id="form-elements">
                  <ul className="nav flex-column sub-menu">
                    <li className="nav-item"><a className="nav-link" href="../../pages/forms/basic_elements.html">Basic Elements</a></li>
                  </ul>
                </div>
              </li>

       
            </ul>
          </nav>
    </>
  )
}

export default Sidebar
