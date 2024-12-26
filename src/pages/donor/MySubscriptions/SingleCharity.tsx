import React, { useState } from 'react'
import { connect } from 'react-redux'

import bgCover from '../../../assets/images/cover-image-2.png'
import { Button, Col, Form, Modal, OverlayTrigger, Row, Table, Tooltip } from 'react-bootstrap'
import cancerFight from '../../../assets/images/cancer-fight.svg'
import trash from '../../../assets/images/trash.svg'
import defaultAvatar2 from '../../../assets/images/avatar-default2.png'

const SingleCharity = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <div className="page-content">
                <div className="page-content-wrapper">
                    <div className="page-header">
                        <div className="page-cover-image">
                            <img src={bgCover} alt="bgCover" />
                        </div>
                        <div className="page-back">
                            <Button variant="white" size='sm' className='btn-icon-start'> <i className='th-outline-arrow-left'></i> Back</Button>
                        </div>

                        <div className="charity-details-profile">
                            <div className="charity-icon">
                                <img src={cancerFight} alt="cancerFight" />
                            </div>
                        </div>
                    </div>
                    <div className="single-charity-details">

                        <div className="single-charity-content">
                            <div className="single-charity-content-left">
                                <div className="single-charity-text">
                                    <h2>Charity One</h2>
                                    <p>Lorem Ipsum is simply dummy text of the printing and</p>
                                </div>
                            </div>
                            <div className="single-charity-content-right">
                                <div className="single-charity-action-btn">
                                    <Button variant='white' size='sm' className='btn-icon-start'> <i className='th-outline-copy'></i> Copy Link</Button>
                                    <Button variant='outline-secondary' size='sm' className='btn-icon-end' onClick={handleShow}> Deactivate Subscription <i className='th-outline-slash'></i></Button>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="charity-counter">
                        <div className="charity-counter-card">

                            <div className="charity-counter-item">
                                <p>Next invoice issue date</p>
                                <h5>May 4, 2024</h5>
                            </div>
                            <div className="charity-counter-item">
                                <p>Next invoice Amount</p>
                                <h5>$20</h5>
                            </div>
                            <div className="charity-counter-item">
                                <p>Start Date</p>
                                <h5>20 Dec, 2023</h5>
                            </div>
                            <div className="charity-counter-item">
                                <p>Total Amount Donate</p>
                                <h5>$100</h5>
                            </div>
                        </div>
                    </div>
                    <div className="charity-table">
                        <div className="small-title">
                            <h3>Invoices</h3>
                        </div>
                        <div className="page-filter">
                            <div className="page-filter-left">
                                <Form.Group className="form-group filter-group">
                                    <div className="form-control-icon icon-start">
                                        <i className='th-outline-search-normal-1'></i>
                                        <Form.Control type="search" placeholder="Search by name" />
                                    </div>
                                </Form.Group>

                                <Form.Group className="form-group filter-group">
                                    <Form.Select aria-label="Type">
                                        <option>Type</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="form-group filter-group">
                                    <Form.Select aria-label="Type">
                                        <option>Status</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="form-group filter-group">
                                    <div className="form-control-icon icon-start">
                                        <i className='th-outline-calendar-1'></i>
                                        <Form.Control type="text" placeholder="Date Range" />
                                    </div>
                                </Form.Group>
                            </div>
                            <div className="page-filter-right">
                                <Button variant='outline-primary' size='sm'>Update Payment Method</Button>
                            </div>
                        </div>
                        <Table responsive bordered hover className='table-theme'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th className='text-center'>Date</th>
                                    <th className='text-center'>Type</th>
                                    <th className='text-center'>Method</th>
                                    <th className='text-center'>Status</th>
                                    <th className='text-center'>Donation</th>
                                    <th className='text-end'>Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr>
                                    <td className=''>INV-858</td>
                                    <td className='text-center'>20 April 2024</td>
                                    <td className='text-center'>Monthly</td>
                                    <td className='text-center'>PayPal</td>
                                    <td className="text-center">
                                        <div className="status status-success m-auto">Success</div>
                                    </td>
                                    <td className='text-center text-primary'>$20</td>
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
                                    <td className=''>INV-858</td>
                                    <td className='text-center'>20 April 2024</td>
                                    <td className='text-center'>Monthly</td>
                                    <td className='text-center'>PayPal</td>
                                    <td className="text-center">
                                        <div className="status status-success m-auto">Success</div>
                                    </td>
                                    <td className='text-center text-primary'>$20</td>
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
                    </div>
                </div>
            </div>

            <Modal show={show} size="lg" onHide={handleClose} className='modal-theme modal-workspace' centered>
                <Modal.Header>
                    <Modal.Title>Cancel Subscription</Modal.Title>
                    <Button variant="close" onClick={handleClose}><i className='th th-close'></i></Button>
                </Modal.Header>
                <Modal.Body>
                    <div className="cancel-subscription">
                        <div className="cancel-subscription-image">
                            <img src={trash} alt="trash" />
                        </div>
                        <div className="cancel-subscription-text">
                            <h3>Are you Sure?</h3>
                            <p>You want to cancel subscription for <b>“Charity Two”</b></p>
                        </div>

                        <div className="cancel-subscription-form">

                            <Form.Group className="" controlId="formBasicCheckbox1">
                                <Form.Label>Select Reason For Cancel Subscription</Form.Label>
                                <Form.Check type="checkbox" label="Changes in personal finances might require reallocating funds" />
                            </Form.Group>
                            <Form.Group className="" controlId="formBasicCheckbox2">
                                <Form.Check type="checkbox" label="Changes in personal finances might require reallocating funds" />
                            </Form.Group>
                            <Form.Group className="" controlId="formBasicCheckbox3">
                                <Form.Check type="checkbox" label="Changes in personal finances might require reallocating funds" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox3">
                                <Form.Check type="checkbox" label="Other" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Add Comment</Form.Label>
                                <Form.Control as="textarea" rows={3} placeholder='Add comment' />
                            </Form.Group>
                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer className='justify-content-center'>
                    <Button variant="white" onClick={handleClose}>No, Change my Mind</Button>
                    <Button variant="secondary">Yes, Cancel Subscription </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(SingleCharity)