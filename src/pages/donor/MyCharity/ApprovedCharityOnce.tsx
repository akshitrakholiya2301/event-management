import React from 'react'
import { connect } from 'react-redux'
import { Button, Form, OverlayTrigger, Table, Tooltip } from 'react-bootstrap'
import defaultAvatar2 from '../../../assets/images/avatar-default2.png'
const ApprovedCharityOnce = (props) => {
    return (
        <>
            <Table responsive bordered hover className='table-theme'>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th className=''>Donor Name</th>
                        <th className=''>Email</th>
                        <th className='text-center'>Date</th>
                        <th className='text-center'>Method</th>
                        <th className='text-center'>Status</th>
                        <th className='text-center'>Donation</th>
                        <th className='text-end'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className=''>PCU-858</td>
                        <td >
                            <div className="tbl-profile-container">
                                <div className="tbl-profile-image">
                                    <img src={defaultAvatar2} alt="10 & Deliver Limited" />
                                </div>

                                <div className="tbl-profile-content">
                                    <h6>Rhonda Rhodes</h6>
                                </div>
                            </div>
                        </td>
                        <td className=''>lorri73@gmail.com</td>
                        <td className='text-center'>20 April 2024</td>
                        <td className='text-center'>PayPal</td>
                        <td className="text-center">
                            <div className="status status-success m-auto">Success</div>
                        </td>
                        <td className='text-center text-secondary'>$500</td>
                        <td className='tbl-action'>
                            <div className="tbl-action-group">
                                <OverlayTrigger
                                    trigger={["hover", "hover"]}
                                    placement="left"
                                    overlay={
                                        <Tooltip>View</Tooltip>
                                    }
                                >
                                    <Button variant='action' className=''><i className='th-outline-eye'></i></Button>
                                </OverlayTrigger>
                                <OverlayTrigger
                                    trigger={["hover", "hover"]}
                                    placement="left"
                                    overlay={
                                        <Tooltip>Download</Tooltip>
                                    }
                                >
                                    <Button variant='action' className=''><i className='bi bi-download'></i></Button>
                                </OverlayTrigger>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className=''>PCU-858</td>
                        <td >
                            <div className="tbl-profile-container">
                                <div className="tbl-profile-image">
                                    <img src={defaultAvatar2} alt="10 & Deliver Limited" />
                                </div>

                                <div className="tbl-profile-content">
                                    <h6>Rhonda Rhodes</h6>
                                </div>
                            </div>
                        </td>
                        <td className=''>lorri73@gmail.com</td>
                        <td className='text-center'>20 April 2024</td>
                        <td className='text-center'>PayPal</td>
                        <td className="text-center">
                            <div className="status status-success m-auto">Success</div>
                        </td>
                        <td className='text-center text-secondary'>$500</td>
                        <td className='tbl-action'>
                            <div className="tbl-action-group">
                                <OverlayTrigger
                                    trigger={["hover", "hover"]}
                                    placement="left"
                                    overlay={
                                        <Tooltip>View</Tooltip>
                                    }
                                >
                                    <Button variant='action' className=''><i className='th-outline-eye'></i></Button>
                                </OverlayTrigger>
                                <OverlayTrigger
                                    trigger={["hover", "hover"]}
                                    placement="left"
                                    overlay={
                                        <Tooltip>Download</Tooltip>
                                    }
                                >
                                    <Button variant='action' className=''><i className='bi bi-download'></i></Button>
                                </OverlayTrigger>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className=''>PCU-858</td>
                        <td >
                            <div className="tbl-profile-container">
                                <div className="tbl-profile-image">
                                    <img src={defaultAvatar2} alt="10 & Deliver Limited" />
                                </div>

                                <div className="tbl-profile-content">
                                    <h6>Rhonda Rhodes</h6>
                                </div>
                            </div>
                        </td>
                        <td className=''>lorri73@gmail.com</td>
                        <td className='text-center'>20 April 2024</td>
                        <td className='text-center'>PayPal</td>
                        <td className="text-center">
                            <div className="status status-success m-auto">Success</div>
                        </td>
                        <td className='text-center text-secondary'>$500</td>
                        <td className='tbl-action'>
                            <div className="tbl-action-group">
                                <OverlayTrigger
                                    trigger={["hover", "hover"]}
                                    placement="left"
                                    overlay={
                                        <Tooltip>View</Tooltip>
                                    }
                                >
                                    <Button variant='action' className=''><i className='th-outline-eye'></i></Button>
                                </OverlayTrigger>
                                <OverlayTrigger
                                    trigger={["hover", "hover"]}
                                    placement="left"
                                    overlay={
                                        <Tooltip>Download</Tooltip>
                                    }
                                >
                                    <Button variant='action' className=''><i className='bi bi-download'></i></Button>
                                </OverlayTrigger>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ApprovedCharityOnce)