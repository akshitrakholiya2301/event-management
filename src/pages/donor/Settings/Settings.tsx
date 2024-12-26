import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap'
import ProfileInfo from './ProfileInfo'
import ChangePassword from './ChangePassword'
import NotificationSettings from './NotificationSettings'
import LanguageRegion from './LanguageRegion'
import PaymentMethod from './PaymentMethod'
import profileBg from '../../../assets/images/profile-bg.png'
import { ENUMFORACCOUNTTAB } from '../../../interfaces/interface'
import { getName } from '../../../Utility/Helper'

const Settings = (props) => {
    const [profileTab, setProfileTab] = useState<string>(ENUMFORACCOUNTTAB.PERSONAL_DETAILS)

    return (
        <>
            <div className="page-content">
                <div className="page-content-wrapper">
                    <div className="page-small-banner">
                        <div className="page-small-banner-image">
                            <img src={profileBg} alt="donorBg" />
                        </div>
                        <div className="page-small-banner-details">
                            <div className="page-small-banner-left">
                                <div className="page-small-banner-text">
                                    <p>Welcome {getName()}!</p>
                                    <h3>My Profile</h3>
                                </div>
                            </div>
                            <div className="page-small-banner-right">
                                {/* <Button variant='primary' size='sm' className='btn-icon-start'> <i className='th-outline-add-circle'></i> Add New Charity</Button>
                                <Button variant="icon-sm" className='btn-icon-primary-outline-sm' > <i className='th-outline-refresh-2'></i></Button> */}
                            </div>
                        </div>
                    </div>

                    <div className="admin-setting">
                        <div className="admin-setting-tab">
                            <div className="nomral-pill-tab vertical-tab">
                                <ul className="nav nav-pills " id="pills-tab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button className={`nav-link ${profileTab === ENUMFORACCOUNTTAB.PERSONAL_DETAILS ? 'active' : ''}`} id="pills-info-tab" data-bs-toggle="pill" data-bs-target="#pills-info" type="button" role="tab" aria-controls="pills-info" aria-selected="true" onClick={() => { setProfileTab(ENUMFORACCOUNTTAB.PERSONAL_DETAILS) }}><i className='th-outline-user'></i> Personal Info</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className={`nav-link ${profileTab === ENUMFORACCOUNTTAB.SETTINGS ? 'active' : ''}`} id="pills-settings-tab" data-bs-toggle="pill" data-bs-target="#pills-settings" type="button" role="tab" aria-controls="pills-settings" aria-selected="false" onClick={() => { setProfileTab(ENUMFORACCOUNTTAB.SETTINGS) }}> <i className='th-outline-setting-2'></i> Settings</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className={`nav-link ${profileTab === ENUMFORACCOUNTTAB.LANGUAGES_REGION ? 'active' : ''}`} id="pills-language-tab" data-bs-toggle="pill" data-bs-target="#pills-language" type="button" role="tab" aria-controls="pills-language" aria-selected="false" onClick={() => { setProfileTab(ENUMFORACCOUNTTAB.LANGUAGES_REGION) }}> <i className='th-outline-global'></i> Language & Region</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className={`nav-link ${profileTab === ENUMFORACCOUNTTAB.PAYMENT ? 'active' : ''}`} id="pills-integrations-tab" data-bs-toggle="pill" data-bs-target="#pills-integrations" type="button" role="tab" aria-controls="pills-integrations" aria-selected="false" onClick={() => { setProfileTab(ENUMFORACCOUNTTAB.PAYMENT) }}> <i className='th-outline-card-pos'></i> Payment Integrations</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className={`nav-link ${profileTab === ENUMFORACCOUNTTAB.UPDATE_PASSWORD ? 'active' : ''}`} id="pills-password-tab" data-bs-toggle="pill" data-bs-target="#pills-password" type="button" role="tab" aria-controls="pills-password" aria-selected="false" onClick={() => { setProfileTab(ENUMFORACCOUNTTAB.UPDATE_PASSWORD) }}> <i className='th-outline-key'></i> Change Password</button>
                                    </li>
                                </ul>
                                <div className="tab-content" id="pills-tabContent">
                                    <div className="tab-pane fade show active" id="pills-info" role="tabpanel" aria-labelledby="pills-info-tab">
                                        <ProfileInfo selectedTab={profileTab} />
                                    </div>

                                    <div className="tab-pane fade" id="pills-password" role="tabpanel" aria-labelledby="pills-password-tab">
                                        <ChangePassword selectedTab={profileTab} />
                                    </div>
                                    <div className="tab-pane fade" id="pills-settings" role="tabpanel" aria-labelledby="pills-settings-tab">
                                        <NotificationSettings />
                                    </div>
                                    <div className="tab-pane fade" id="pills-language" role="tabpanel" aria-labelledby="pills-language-tab">
                                        <LanguageRegion />
                                    </div>
                                    <div className="tab-pane fade" id="pills-integrations" role="tabpanel" aria-labelledby="pills-integrations-tab">
                                        <PaymentMethod />
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>




                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)