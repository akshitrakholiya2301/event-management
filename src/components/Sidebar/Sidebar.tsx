import React, { useEffect, useState } from 'react'
import { Button, } from 'react-bootstrap';
import logo from "../../assets/images/dummy-logo.svg";
import sidebarLogoLg from "../../assets/images/sidebar-logo-lg.svg";
import sidebarLogosm from "../../assets/images/auth-logo.svg";
import { NavLink } from 'react-router-dom';
import SimpleBar from 'simplebar-react';
import { loading } from '../../redux/Loader/loader.action';
import { logoutFromSystem } from '../../redux/Service/login';
import { RootState } from '../../redux/store';
import { connect } from 'react-redux';
import { getIsAuthorizedForCharity, isNullUndefinedOrBlank } from '../../Utility/Helper';
import { ENUMFORROUTES } from '../../interfaces/interface';
/**
 * Sidebar component
 */
const Sidebar = (props) => {


  const [SidebarSize, setSidebarSize] = useState('lg');
  const windowSize = document.documentElement.clientWidth;
  const [isApproved, setisApproved] = useState(getIsAuthorizedForCharity())

  const toogleMenu = () => {
    if (windowSize > 1024) {
      setSidebarSize(SidebarSize === 'sm' ? 'lg' : 'sm');
      document.documentElement.setAttribute('data-sidebar-size', SidebarSize === 'lg' ? 'sm' : 'lg');
    }
  };



  console.log(isApproved, typeof isApproved)
  return (

    // {/* <!-- ========== App Menu ========== --> */ }
    < div className="app-menu navbar-menu" >
      {/* <!-- LOGO --> */}

      < div className="navbar-brand-box" >
        <a href="index.html" className="logo logo-dark">
          <span className="logo-sm">
            <img src={sidebarLogosm} alt="logoSm" height="48" />
          </span>
          <span className="logo-lg">
            <img src={sidebarLogoLg} alt="sidebarLogoLg" height="48" />
          </span>
        </a>
        <Button className=" vertical-menu-btn topnav-hamburger " id="topnav-hamburger-icon" onClick={toogleMenu}>
          <i className='th-outline-arrow-left'></i>
        </Button>
      </div >

      <div className='navbar-scrollbar'>
        <SimpleBar id="scrollbar" className='scrollbar'>
          <div className="navbar-sidemenu ">
            <ul className="navbar-nav" id="navbar-nav">
              <li className="nav-item">
                <NavLink to="/dashboard" className="nav-link menu-link" >
                  <i className="th-outline-home-2"></i> <span data-key="t-widgets">Home</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/all-charity" className="nav-link menu-link" >
                  <i className="th-outline-gift"></i> <span data-key="t-widgets">All Charity</span>
                </NavLink>
              </li>
              {
                // (isApproved == "true") &&
                <li className="nav-item">
                  <NavLink to={ENUMFORROUTES.MY_CHARITY} className="nav-link menu-link" >
                    <i className="th-outline-happyemoji"></i> <span data-key="t-widgets">My Charity</span>
                  </NavLink>
                </li>
              }
              <li className="nav-item">
                <NavLink to={ENUMFORROUTES.MY_SUBSCRIPTION} className="nav-link menu-link" >
                  <i className="th-outline-ticket-2"></i> <span data-key="t-widgets">My Subscriptions</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/our-blogs" className="nav-link menu-link" >
                  <i className="th-outline-document-text"></i> <span data-key="t-widgets">Blogs</span>
                </NavLink>
              </li>

            </ul>
          </div>
          <div className="active-others-tab">
            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
              <li className="nav-item" role="presentation">
                <button className="nav-link active" id="pills-active-tab" data-bs-toggle="pill" data-bs-target="#pills-active" type="button" role="tab" aria-controls="pills-active" aria-selected="true">Active(10)</button>
              </li>
              <li className="nav-item" role="presentation">
                <button className="nav-link" id="pills-other-tab" data-bs-toggle="pill" data-bs-target="#pills-other" type="button" role="tab" aria-controls="pills-other" aria-selected="false">Other(12)</button>
              </li>
            </ul>
            <div className="tab-content" id="pills-tabContent">
              <div className="tab-pane fade show active" id="pills-active" role="tabpanel" aria-labelledby="pills-active-tab">
                <div className="active-others-tab-data">
                  <div className="sidebar-charity-card">
                    <div className="sidebar-charity-icon suqare-icon icon-primary">
                      <i className='th-bold-box'></i>
                    </div>
                    <div className="sidebar-charity-text">
                      <h6>Cure Cancer</h6>
                      <p>$12 / Month</p>
                    </div>
                  </div>
                  <div className="sidebar-charity-card">
                    <div className="sidebar-charity-icon suqare-icon icon-secondary">
                      <i className='th-bold-box'></i>
                    </div>
                    <div className="sidebar-charity-text">
                      <h6>Cure Cancer</h6>
                      <p>$12 / Month</p>
                    </div>
                  </div>
                  <div className="sidebar-charity-card">
                    <div className="sidebar-charity-icon suqare-icon icon-success">
                      <i className='th-bold-box'></i>
                    </div>
                    <div className="sidebar-charity-text">
                      <h6>Cure Cancer</h6>
                      <p>$12 / Month</p>
                    </div>
                  </div>
                  <div className="sidebar-charity-card">
                    <div className="sidebar-charity-icon suqare-icon icon-warning">
                      <i className='th-bold-box'></i>
                    </div>
                    <div className="sidebar-charity-text">
                      <h6>Cure Cancer</h6>
                      <p>$12 / Month</p>
                    </div>
                  </div>
                  <div className="sidebar-charity-card">
                    <div className="sidebar-charity-icon suqare-icon icon-danger">
                      <i className='th-bold-box'></i>
                    </div>
                    <div className="sidebar-charity-text">
                      <h6>Cure Cancer</h6>
                      <p>$12 / Month</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="pills-other" role="tabpanel" aria-labelledby="pills-other-tab">
                <div className="active-others-tab-data">
                  <div className="sidebar-charity-card">
                    <div className="sidebar-charity-icon suqare-icon icon-primary">
                      <i className='th-bold-box'></i>
                    </div>
                    <div className="sidebar-charity-text">
                      <h6>Cure Cancer</h6>
                      <p>$12 / Month</p>
                    </div>
                  </div>
                  <div className="sidebar-charity-card">
                    <div className="sidebar-charity-icon suqare-icon icon-secondary">
                      <i className='th-bold-box'></i>
                    </div>
                    <div className="sidebar-charity-text">
                      <h6>Cure Cancer</h6>
                      <p>$12 / Month</p>
                    </div>
                  </div>
                  <div className="sidebar-charity-card">
                    <div className="sidebar-charity-icon suqare-icon icon-success">
                      <i className='th-bold-box'></i>
                    </div>
                    <div className="sidebar-charity-text">
                      <h6>Cure Cancer</h6>
                      <p>$12 / Month</p>
                    </div>
                  </div>
                  <div className="sidebar-charity-card">
                    <div className="sidebar-charity-icon suqare-icon icon-warning">
                      <i className='th-bold-box'></i>
                    </div>
                    <div className="sidebar-charity-text">
                      <h6>Cure Cancer</h6>
                      <p>$12 / Month</p>
                    </div>
                  </div>
                  <div className="sidebar-charity-card">
                    <div className="sidebar-charity-icon suqare-icon icon-danger">
                      <i className='th-bold-box'></i>
                    </div>
                    <div className="sidebar-charity-text">
                      <h6>Cure Cancer</h6>
                      <p>$12 / Month</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SimpleBar>

        <div className="navbar-bottom navbar-sidemenu pt-0">
          <ul className="navbar-nav" id="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link menu-link" to="/settings">
                <i className="th-outline-setting-2"></i> <span data-key="t-widgets">Settings</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link menu-link" to="" onClick={() => { props.logoutFromSystem() }}>
                <i className="th-outline-logout"></i> <span data-key="t-widgets">Logout</span>
              </NavLink>
            </li>
          </ul>
          <div className="sidebar-footer">
            <p>© 2024 PureCharity</p>
          </div>
        </div>
        {/* <!-- Sidebar --> */}
      </div>

      <div className="sidebar-background"></div>
    </div >
    // {/* <!-- Left Sidebar End --> */ }

  )
}

const mapStateToProps = (state: RootState) => ({
  requestCharity: state.CharityManagementReducer.approveCharityRequest
});

const mapDispatchToProps = {
  loading,
  logoutFromSystem
};
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);