import React, { useEffect, useState } from 'react'
import logo from "../../assets/images/dummy-logo.svg";
import defaultAvatar from "../../assets/images/avatar-default.svg";
import { Button, Form } from 'react-bootstrap';
import { RootState } from '../../redux/store';
import { loading } from '../../redux/Loader/loader.action';
import { connect } from 'react-redux';
import { getName, getProfile, isNullUndefinedOrBlank } from '../../Utility/Helper';
import { logoutFromSystem } from '../../redux/Service/login';
import { ENUMFORROUTES } from '../../interfaces/interface';
import { useNavigate } from 'react-router-dom';

/**
 * Navbar component
 */
const Navbar = (props) => {
  const navigate = useNavigate();
  const [profileUrl, setProfileUrl] = useState<any>(getProfile())
  const [userName, setUserName] = useState<any>(getName())
  const [SidebarSize, setSidebarSize] = useState('lg');
  const windowSize = document.documentElement.clientWidth;

  const toogleMenu = () => {
    if (windowSize > 1024) {
      setSidebarSize(SidebarSize === 'sm' ? 'lg' : 'sm');
      document.documentElement.setAttribute('data-sidebar-size', SidebarSize === 'lg' ? 'sm' : 'lg');
    }
  };

  useEffect(() => {
    if (!isNullUndefinedOrBlank(props.profileData?.data.url)) {
      setProfileUrl(props.profileData.data?.url);
    }
    else {
      setProfileUrl("");
    }
    if (!isNullUndefinedOrBlank(props.profileData?.data?.first_name) && !isNullUndefinedOrBlank(props.profileData?.data?.last_name)) {
      setUserName(props.profileData.data.first_name + ' ' + props.profileData.data.last_name);
    }

  }, [props.profileData])

  useEffect(() => {
    if (!isNullUndefinedOrBlank(getName)) {
      setUserName(getName());
    }
    if (!isNullUndefinedOrBlank(getProfile)) {
      setProfileUrl(getProfile())
    }
  }, [])
  return (

    <header id="page-topbar">
      <div className="layout-width">
        <div className="navbar-header">
          <div className="navbar-header-left ">
            {/* <!-- LOGO --> */}
            <div className="navbar-brand-box horizontal-logo">


              <a href="index.html" className="logo logo-light">
                <span className="logo-sm">
                  <img src={logo} alt="logoSm" height="22" />
                </span>
                <span className="logo-lg">
                  <img src={logo} alt="logoLight" height="17" />
                </span>
              </a>
            </div>

            {/* <button type="button" className="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger" */}
            <Button className=" vertical-menu-btn topnav-hamburger " id="topnav-hamburger-icon" onClick={toogleMenu}>
              <i className='th-outline-arrow-right-1'></i>
              {/* <span className="hamburger-icon">
                <span></span>
                <span></span>
                <span></span>
              </span> */}
            </Button>

            {/* <!-- App Search--> */}
            <form className="app-search d-none d-md-block">
              <div className="position-relative">

                <Form.Group className="form-group mb-0" controlId="exampleForm.ControlInput1">
                  <div className="form-control-icon icon-end">
                    <i className='th-outline-search-normal-1'></i>
                    <Form.Control
                      type="text"
                      placeholder="Search charities, Donor ..."
                      className=" mr-sm-2"
                      id="search-options"
                    />
                  </div>
                </Form.Group>

              </div>

            </form>
          </div>

          <div className="navbar-header-right d-flex align-items-center">

            <div className="header-item navbar-add-btn">
              <Button variant='grad-primary' className='btn-icon-end'>Donate Now <i className='th-bold-heart'></i></Button>
            </div>

            <div className="dropdown topbar-head-dropdown  header-item" id="notificationDropdown">
              <button type="button" className="btn-icon round"
              >
                <i className="th-outline-notification"></i>
                {/* <span
                  className="position-absolute topbar-badge fs-10 translate-middle badge rounded-pill bg-danger">3<span
                    className="visually-hidden">unread messages</span></span> */}
              </button>
            </div>


            <div className="dropdown header-item topbar-user">
              <button type="button" className="topbar-user-btn" id="page-header-user-dropdown" data-bs-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
                <span className="d-flex align-items-center">
                  {!isNullUndefinedOrBlank(profileUrl) ?
                    <img className="rounded-circle header-profile-user"
                      src={profileUrl} alt="Header Avatar" /> :
                    <img className="rounded-circle header-profile-user"
                      src={defaultAvatar} alt="Header Avatar" />
                  }
                  <span className="text-start">
                    <span className="d-none d-xl-inline-block  user-name-text">{getName()}</span>
                    <span className="d-none d-xl-block  user-name-sub-text">Founder</span>
                  </span>
                </span>
              </button>
              <div className="dropdown-menu dropdown-menu-end">
                <h6 className="dropdown-header">Welcome {getName()}!</h6>
                <a className="dropdown-item" onClick={() => { navigate(ENUMFORROUTES.SETTINGS) }}><i
                  className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i> <span
                    className="align-middle">Profile</span></a>
                <a className="dropdown-item"
                  onClick={() => props.logoutFromSystem()}
                ><i className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i> <span
                  className="align-middle" data-key="t-logout">Logout</span></a >
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

const mapStateToProps = (state: RootState) => ({

  profileData: state.SettingsReducer.getUserProfile
})
//   return { appReducer: state.loaderReducer };


const mapDispatchToProps = {
  loading,
  logoutFromSystem
};
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);