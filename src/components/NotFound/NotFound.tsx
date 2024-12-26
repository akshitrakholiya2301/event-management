import React from 'react'
import { connect } from 'react-redux'
import errorImage from '../../assets/images/404.svg'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { ENUMFORROUTES } from '../../interfaces/interface'
/**
 * NotFound component
 */
const NotFound = () => {
  let navigate = useNavigate();
  return (
    <>
      <div className="error-page-content">
        <div className="error-page-content-wrapper">
          <div className="error-wrapper">
            <div className="error-image">
              <img src={errorImage} alt="errorImage" />
            </div>
            <div className="error-image-details">
              <h2>Oops! Page Not Found</h2>
              <p>You may have mistyped the address or page may have moved.</p>
              <Button variant='primary' onClick={() => { navigate(ENUMFORROUTES.DASHBOARD) }} >Go back to Dashboard</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NotFound