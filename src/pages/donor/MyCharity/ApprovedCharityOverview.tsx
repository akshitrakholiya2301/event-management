import React from 'react'
import { connect } from 'react-redux'
import { Card, Col, Form, Row } from 'react-bootstrap'
import chart1 from '../../../assets/images/chart.png'
import chart2 from '../../../assets/images/chart2.png'
import ApprovedCharityMonthly from './ApprovedCharityMonthly'
import ApprovedCharityOnce from './ApprovedCharityOnce'

const ApprovedCharityOverview = (props) => {
    return (
        <>
            <Row className='row-gap-3'>
                <Col md={8}>
                    <Card className='normal-card '>
                        <Card.Body>
                            <div className="chart-card">
                                <div className="chart-details">
                                    <div className="chart-details-left">
                                        <div className="chart-details-title">
                                            <h3>Payment History</h3>
                                            <p>Overview of charity collection</p>
                                        </div>
                                        <div className="chart-data">
                                            <div className="chart-data-icon suqare-icon icon-light-primary">
                                                <i className='th-outline-dollar-circle'></i>
                                            </div>
                                            <div className="chart-data-text">
                                                <h4>$78,282</h4>
                                                <p>Net Collection</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="chart-details-right">
                                        <div className="chart-filter">
                                            <Form.Group className="form-group filter-group mb-0">
                                                <Form.Select aria-label="Default select example">
                                                    <option>Year 2024</option>
                                                    <option value="1">Year 2022</option>
                                                    <option value="2">Year 2023</option>
                                                    <option value="3">Year 2024</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </div>
                                    </div>
                                </div>
                                <div className="main-chart">
                                    <div className="demo-chart">
                                        <img src={chart1} alt="chart1" />
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className='normal-card '>
                        <Card.Body>
                            <div className="chart-card">
                                <div className="chart-details">
                                    <div className="chart-details-left">
                                        <div className="chart-details-title">
                                            <h3>Payment History</h3>
                                            <p>Overview of charity collection</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="main-chart">
                                    <div className="demo-chart">
                                        <img src={chart2} alt="chart1" />
                                    </div>
                                </div>
                                <div className="chart-details mt-3">
                                    <div className="chart-details-left w-100 justify-content-between">
                                        <div className="chart-data w-100">
                                            <div className="chart-data-text">
                                                <p>Subscriber Collection</p>
                                                <h4>$54,525</h4>
                                            </div>
                                        </div>
                                        <div className="chart-data w-100">
                                            <div className="chart-data-text">
                                                <p>One time collection</p>
                                                <h4>$12,525</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <div className="page-tab normal-tab pt-3">
                <ul className="nav nav-pills" id="pills-tab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link nav-icon-start active" id="pills-monthly-subscriber-tab" data-bs-toggle="pill" data-bs-target="#pills-monthly-subscriber" type="button" role="tab" aria-controls="pills-monthly-subscriber" aria-selected="true"> <i className='th-outline-calendar-1'></i>Monthly Subscriber</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link nav-icon-start" id="pills-once-payment-tab" data-bs-toggle="pill" data-bs-target="#pills-once-payment" type="button" role="tab" aria-controls="pills-once-payment" aria-selected="false"><i className='th-outline-user'></i>Once Payment</button>
                    </li>

                </ul>
                <div className="tab-content" id="pills-tabContent">
                    <div className="tab-pane fade show active" id="pills-monthly-subscriber" role="tabpanel" aria-labelledby="pills-monthly-subscriber-tab">
                        <div className="tab-data">
                            <ApprovedCharityMonthly />
                        </div>
                    </div>
                    <div className="tab-pane fade" id="pills-once-payment" role="tabpanel" aria-labelledby="pills-once-payment-tab">
                        <div className="tab-data">
                            <ApprovedCharityOnce />
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ApprovedCharityOverview)