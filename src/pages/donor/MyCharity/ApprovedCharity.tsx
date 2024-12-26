import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Button, Card, Col, Dropdown, Form, ProgressBar, Row, Table } from 'react-bootstrap'
import priority from '../../../assets/images/priority.png'
import { useNavigate } from 'react-router-dom'
import { ENUMFORROUTES } from '../../../interfaces/interface'
import { ENUM_FOR_LISTING_VIEW, ENUM_FOR_SORT_ORDER } from '../../../interfaces/enum'
import { NO_RECORD_FOUND_MSG, convertDecimalTwoPoint, formatedDate, getDate, isEmptyObjectOrNullUndefiend, isNullUndefinedOrBlank, roundDecimalValue } from '../../../Utility/Helper'
import DatePicker from 'react-datepicker';
import cancerFight from '../../../assets/images/cancer-fight.svg'
import NoRecordsGrid from '../../../components/NoRecordsFound/NoRecordsGrid'


const ApprovedCharity = (props) => {

    /* -----------------------manage view--------------------------- */

    const handleView = (selectedView) => {
        if (props.view != selectedView) {
            props.handleView(selectedView)
        }
    }

    /* -----------------------------data------------------------------ */
    const [data, setData] = useState<any>([]);

    useEffect(() => {
        if (!isNullUndefinedOrBlank(props.data)) {
            setData(props.data)
        }
    }, [props.data])

    /* ---------------------handle Progressbar----------------------- */
    const handleCalculateProgress = (collectedVal, goalVal) => {
        if (!isNullUndefinedOrBlank(collectedVal) && !isNullUndefinedOrBlank(goalVal)) {

            const calculate = (collectedVal / goalVal) * 100;

            return convertDecimalTwoPoint(calculate, 2);
        }
        else {
            return 0;
        }

    }

    const navigate = useNavigate();

    const apprevedCarityDetails = () => {
        navigate(ENUMFORROUTES.APPROVED_CHARITY_DETAILS);
    };


    const navigateToRelatedScreen = (route: any, val?: any, type?: string) => {
        if (val) {
            let dataObj = { ...val, type }
            navigate(route, { state: dataObj })
        }
        else {
            navigate(route)
        }

    }

    return (
        <>
            <div className="tab-data">
                <div className="page-filter">
                    <div className="page-filter-left">

                        {/* <Form.Group className="form-group filter-group">
                            <div className="form-control-icon icon-start">
                                <i className='th-outline-search-normal-1'></i>
                                <Form.Control type="search" placeholder="Search by name" />
                            </div>
                        </Form.Group> */}


                        {/* <Form.Group className="form-group filter-group">
                            <div className="form-control-icon icon-start">
                                <i className='th-outline-calendar-1'></i>
                                <Form.Control type="text" placeholder="Date Range" />
                            </div>
                        </Form.Group> */}
                        <Form.Group className="form-group filter-group">
                            <div className="form-control-icon icon-start">
                                <i className='th-outline-search-normal-1'></i>
                                <Form.Control type="search" placeholder="Search by name"
                                    onChange={(e) => { props.handleSearchData(e) }}
                                    onKeyDown={(e) => { props.handleSearchData(e) }}
                                    value={props.searchData}
                                />
                            </div>
                        </Form.Group>

                        <Form.Group className="form-group filter-group">
                            <div className="form-control-icon icon-start">
                                <i className='th-outline-calendar-1'></i>
                                {/* <Form.Control type="text" placeholder="Date Range" />
                                */}

                                <DatePicker
                                    // selected={searchByStartDate}
                                    selectsRange={true}
                                    onChange={(dates) => {
                                        const [start, end] = dates;
                                        props.setStartDate(!isNullUndefinedOrBlank(start) ? start : null);
                                        props.setEndDate(!isNullUndefinedOrBlank(end) ? end : null);
                                    }}
                                    startDate={props.startDate}
                                    endDate={props.endDate}
                                    // minDate={new Date()}
                                    isClearable
                                    dateFormat="dd-MM-yyyy"
                                    className="form-control"
                                    popperProps={{ strategy: "fixed" }}
                                    placeholderText="Select a Date"

                                    // inline
                                    showIcon
                                />
                            </div>
                        </Form.Group>

                    </div>
                    <div className="page-filter-right">
                        <div className="custom-tab">
                            <ul>

                                <li className={`${props.view === ENUM_FOR_LISTING_VIEW.GRID_VIEW ? "active" : ""}`}><i className='th-outline-element-3' onClick={() => { handleView(ENUM_FOR_LISTING_VIEW.GRID_VIEW) }}></i></li>
                                <li className={`${props.view === ENUM_FOR_LISTING_VIEW.LIST_VIEW ? "active" : ""}`}><i className='bi bi-list-task' onClick={() => { handleView(ENUM_FOR_LISTING_VIEW.LIST_VIEW) }}></i></li>

                            </ul>
                        </div>
                    </div>
                </div>
                {
                    (props.view === ENUM_FOR_LISTING_VIEW.GRID_VIEW) &&
                    <div className="grid-view">
                        <Row>
                            {!isEmptyObjectOrNullUndefiend(data) ?

                                data?.map((item, index) => (
                                    <Col md={4} key={index}>
                                        <Card className='normal-card'>
                                            <Card.Body>
                                                <div className="charity-card">
                                                    <div className="charity-card-title">
                                                        {
                                                            !isEmptyObjectOrNullUndefiend(item.images) && item.images.some(val => val.doc_type === "icon_pic") ?
                                                                item.images.filter(val => val.doc_type === "icon_pic").map((val, index) => (
                                                                    <div className="charity-image  suqare-icon icon-secondary">
                                                                        <img src={val.url} alt="cancerFight" />
                                                                    </div>

                                                                )) :

                                                                <div className="charity-icon  suqare-icon icon-secondary">
                                                                    <img src={cancerFight} alt="cancerFight" />
                                                                </div>
                                                        }
                                                        <div className="charity-text">
                                                            <div className="charity-text-action">
                                                                <h3>
                                                                    {!isNullUndefinedOrBlank(item.charity_name) ? item.charity_name : "-"}
                                                                </h3>
                                                                <Dropdown className="card-action ">
                                                                    <Dropdown.Toggle id="dropdown-basic">
                                                                        <i className='th-outline-more'></i>
                                                                    </Dropdown.Toggle>

                                                                    <Dropdown.Menu>
                                                                        <Dropdown.Item onClick={() => { props.handleEdit(item) }}> <i className='th-outline-edit-2'></i> Edit</Dropdown.Item>
                                                                        <Dropdown.Item onClick={apprevedCarityDetails}> <i className='th-outline-eye'></i> View</Dropdown.Item>
                                                                        <Dropdown.Item > <i className='th-outline-card'></i> Payment Method</Dropdown.Item>
                                                                        <Dropdown.Item > <i className='th-outline-tick-circle'></i> Mark as complated</Dropdown.Item>
                                                                    </Dropdown.Menu>
                                                                </Dropdown>
                                                            </div>
                                                            <div className='charity-text-description' dangerouslySetInnerHTML={{ __html: (!isNullUndefinedOrBlank(item.description)) ? item.description : <>-</> as any }}>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="charity-card-details">
                                                        <div className="admin-published">
                                                            <p> <img src={priority} alt="priority" />${!isNullUndefinedOrBlank(item?.monthly_amount) ? item?.monthly_amount : "0"}/ Month</p>
                                                            <p className="published-date">Approved : {!isNullUndefinedOrBlank(item.requestedAt) ? formatedDate(item.requestedAt, "DD MMMM,YYYY") : "-"}</p>
                                                        </div>

                                                    </div>

                                                    <div className="charity-target">
                                                        <div className="charity-target-item">
                                                            <h6>${!isNullUndefinedOrBlank(item?.goal_amount) ? item?.goal_amount : "-"}</h6>
                                                            <p>Target</p>
                                                        </div>
                                                        <div className="charity-target-item text-end" >
                                                            <h6 className='text-secondary'>${!isNullUndefinedOrBlank(item?.collected_amount) ? `${item?.collected_amount}` : 0}</h6>
                                                            <p>Collected</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))
                                :
                                <Col md={12}>
                                    {/* <NoRecordsGrid /> */}
                                </Col>

                            }
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
                                                                <Dropdown.Item onClick={apprevedCarityDetails}> <i className='th-outline-eye'></i> View</Dropdown.Item>
                                                                <Dropdown.Item href="#/action-2"> <i className='th-outline-card'></i> Payment Method</Dropdown.Item>
                                                                <Dropdown.Item href="#/action-3"> <i className='th-outline-tick-circle'></i> Mark as complated</Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </div>
                                                    <p>Loream ipsum is simply dummy text to mange </p>
                                                </div>
                                            </div>
                                            <div className="charity-card-details">
                                                <div className="admin-published">
                                                    <p className='text-primary'> <img src={priority} alt="priority" /> $20 / Month</p>
                                                    <p className="published-date">Published: 12 Mar, 2024</p>
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
                                                                <Dropdown.Item onClick={apprevedCarityDetails}> <i className='th-outline-eye'></i> View</Dropdown.Item>
                                                                <Dropdown.Item href="#/action-2"> <i className='th-outline-card'></i> Payment Method</Dropdown.Item>
                                                                <Dropdown.Item href="#/action-3"> <i className='th-outline-tick-circle'></i> Mark as complated</Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </div>
                                                    <p>Loream ipsum is simply dummy text to mange </p>
                                                </div>
                                            </div>
                                            <div className="charity-card-details">
                                                <div className="admin-published">
                                                    <p className='text-primary'> <img src={priority} alt="priority" /> $20 / Month</p>
                                                    <p className="published-date">Published: 12 Mar, 2024</p>
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
                }
                {
                    (props.view === ENUM_FOR_LISTING_VIEW.LIST_VIEW) &&
                    <div className="listing-view card-table-sticky">
                        <Table responsive bordered hover className='table-theme table-sticky'>
                            <thead>
                                {
                                    props.columName.map((item, index) => (
                                        (item.isDisplay && <th className={`${item.classname} ${item.keyName === props.sortBy ? (props.sortOrder === ENUM_FOR_SORT_ORDER.ASC ? "sorting-asc" : "sorting-desc") : ""}`}
                                            onClick={() => {
                                                if (!isEmptyObjectOrNullUndefiend(data)) {
                                                    props.columnSorting(item.keyName, props.sortOrder)
                                                }
                                            }} key={index}>{item.displayName} </th>)

                                    ))
                                }
                            </thead>
                            <tbody>

                                <tr>
                                    <td className=''>01</td>
                                    <td>Charity One</td>
                                    <td>Loream ipsum is simply dummy text to mange</td>
                                    <td className='text-center'>Admin</td>
                                    <td className="text-center">20 April 2024</td>
                                    <td className="text-center text-primary">
                                        <div className="tbl-amount d-flex align-items-center justify-content-center">
                                            <img className='me-2' src={priority} alt="priority" /> $20 / Month
                                        </div>
                                    </td>
                                    <td className='text-center'>$152,525</td>
                                    <td className="text-center text-secondary"><b>$15,652</b></td>



                                    <td className='progress-table-action'>
                                        <div className="d-flex">
                                            <ProgressBar variant="success" now={60} />
                                            <p>40%</p>
                                            <Dropdown className="card-action ">
                                                <Dropdown.Toggle id="dropdown-basic">
                                                    <i className='th-outline-more'></i>
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item onClick={apprevedCarityDetails}> <i className='th-outline-eye'></i> View</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-2"> <i className='th-outline-card'></i> Payment Method</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-3"> <i className='th-outline-slash'></i> Deactivate</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </td>
                                </tr>
                        

                            </tbody>
                        </Table>
                    </div>
                }
            </div>
        </>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ApprovedCharity)