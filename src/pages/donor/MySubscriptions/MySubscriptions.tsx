import React from 'react'
import { Button, Card, Col, Dropdown, Form, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import subscriptionsBg from '../../../assets/images/subscriptions-bg.png'

import { useNavigate } from 'react-router-dom'
import { ENUMFORROUTES } from '../../../interfaces/interface'
import PartOfCharity from './PartOfCharity'
import PaymentManagemnet from './PaymentManagemnet'

const MySubscriptions = (props) => {
    return (
        <>
            <div className="page-content">
                <div className="page-content-wrapper">
                    <div className="page-small-banner">
                        <div className="page-small-banner-image">
                            <img src={subscriptionsBg} alt="donorBg" />
                        </div>
                        <div className="page-small-banner-details">
                            <div className="page-small-banner-left">
                                <div className="page-small-banner-text">
                                    <p>Welcome Jessica Johns!</p>
                                    <h3>My Subscriptions</h3>
                                </div>
                            </div>
                            <div className="page-small-banner-right">
                                {/* <Button variant='primary' size='sm' className='btn-icon-start'> <i className='th-outline-add-circle'></i> Add New Charity</Button> */}
                                <Button variant="icon-sm" className='btn-icon-primary-outline-sm' > <i className='th-outline-refresh-2'></i></Button>
                            </div>
                        </div>
                    </div>
                    <div className="page-tab normal-tab mt-2">
                        <ul className="nav nav-pills" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link nav-icon-start active" id="pills-charity-tab" data-bs-toggle="pill" data-bs-target="#pills-charity" type="button" role="tab" aria-controls="pills-charity" aria-selected="true"> <i className='th-outline-note-add'></i>Part of charity</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link nav-icon-start" id="pills-management-tab" data-bs-toggle="pill" data-bs-target="#pills-management" type="button" role="tab" aria-controls="pills-management" aria-selected="false"><i className='th-outline-card'></i>Payment Management</button>
                            </li>

                        </ul>
                        <div className="tab-content" id="pills-tabContent">
                            <div className="tab-pane fade show active" id="pills-charity" role="tabpanel" aria-labelledby="pills-charity-tab">
                                <PartOfCharity />
                            </div>
                            <div className="tab-pane fade" id="pills-management" role="tabpanel" aria-labelledby="pills-management-tab">
                                <PaymentManagemnet />
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

export default connect(mapStateToProps, mapDispatchToProps)(MySubscriptions)