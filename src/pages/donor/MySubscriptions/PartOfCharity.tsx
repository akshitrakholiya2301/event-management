import React from 'react'
import { Button, Card, Col, Dropdown, Form, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import priority from '../../../assets/images/priority.png'

const PartOfCharity = (props) => {
    return (
        <>
            <div className="tab-data">
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
                        <div className="custom-tab">
                            <ul>
                                <li className='active'><i className='th-outline-element-3'></i></li>
                                <li><i className='bi bi-list-task'></i></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <Row>
                    <Col md={4}>
                        <Card className='normal-card'>
                            <Card.Body>
                                <div className="charity-card">
                                    <div className="charity-card-title">
                                        <div className="charity-icon suqare-icon icon-secondary ">
                                            <i className='th-bold-box'></i>
                                        </div>
                                        <div className="charity-text">
                                            <div className="charity-text-action">
                                                <h3>Charity One</h3>
                                                <Dropdown className="card-action ">
                                                    <Dropdown.Toggle id="dropdown-basic">
                                                        <i className='th-outline-more'></i>
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                        <Dropdown.Item > <i className='th-outline-eye'></i> View</Dropdown.Item>
                                                        <Dropdown.Item href="#/action-2"> <i className='th-outline-card'></i> Payment Method</Dropdown.Item>
                                                        <Dropdown.Item href="#/action-3"> <i className='th-outline-slash'></i> Deactivate</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                            <div className="charity-text-description">
                                                <p>Loream ipsum is simply dummy text to mange </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="charity-card-details">
                                        <div className="admin-published">
                                            <p className='text-primary'> <img src={priority} alt="priority" /> $20 / Month</p>

                                        </div>

                                    </div>

                                    <div className="charity-target">
                                        <div className="charity-target-item">
                                            <h6>$152,525</h6>
                                            <p>Target</p>
                                        </div>
                                        <div className="charity-target-item text-end" >
                                            <h6 className='text-secondary'>$152,525</h6>
                                            <p>Collected</p>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className='normal-card'>
                            <Card.Body>
                                <div className="charity-card">
                                    <div className="charity-card-title">
                                        <div className="charity-icon suqare-icon icon-warning ">
                                            <i className='th-bold-box'></i>
                                        </div>
                                        <div className="charity-text">
                                            <div className="charity-text-action">
                                                <h3>Charity One</h3>
                                                <Dropdown className="card-action ">
                                                    <Dropdown.Toggle id="dropdown-basic">
                                                        <i className='th-outline-more'></i>
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                        <Dropdown.Item > <i className='th-outline-eye'></i> View</Dropdown.Item>
                                                        <Dropdown.Item href="#/action-2"> <i className='th-outline-card'></i> Payment Method</Dropdown.Item>
                                                        <Dropdown.Item href="#/action-3"> <i className='th-outline-slash'></i> Deactivate</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                            <div className="charity-text-description">
                                                <p>Loream ipsum is simply dummy text to mange </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="charity-card-details">
                                        <div className="admin-published">
                                            <p className='text-primary'> <img src={priority} alt="priority" /> $20 / Month</p>

                                        </div>

                                    </div>

                                    <div className="charity-target">
                                        <div className="charity-target-item">
                                            <h6>$152,525</h6>
                                            <p>Target</p>
                                        </div>
                                        <div className="charity-target-item text-end" >
                                            <h6 className='text-secondary'>$152,525</h6>
                                            <p>Collected</p>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className='normal-card'>
                            <Card.Body>
                                <div className="charity-card">
                                    <div className="charity-card-title">
                                        <div className="charity-icon suqare-icon icon-success ">
                                            <i className='th-bold-box'></i>
                                        </div>
                                        <div className="charity-text">
                                            <div className="charity-text-action">
                                                <h3>Charity One</h3>
                                                <Dropdown className="card-action ">
                                                    <Dropdown.Toggle id="dropdown-basic">
                                                        <i className='th-outline-more'></i>
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                        <Dropdown.Item > <i className='th-outline-eye'></i> View</Dropdown.Item>
                                                        <Dropdown.Item href="#/action-2"> <i className='th-outline-card'></i> Payment Method</Dropdown.Item>
                                                        <Dropdown.Item href="#/action-3"> <i className='th-outline-slash'></i> Deactivate</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                            <div className="charity-text-description">
                                                <p>Loream ipsum is simply dummy text to mange </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="charity-card-details">
                                        <div className="admin-published">
                                            <p className='text-primary'> <img src={priority} alt="priority" /> $20 / Month</p>

                                        </div>
                                    </div>

                                    <div className="charity-target">
                                        <div className="charity-target-item">
                                            <h6>$152,525</h6>
                                            <p>Target</p>
                                        </div>
                                        <div className="charity-target-item text-end" >
                                            <h6 className='text-secondary'>$152,525</h6>
                                            <p>Collected</p>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>

                </Row>
            </div>
        </>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(PartOfCharity)