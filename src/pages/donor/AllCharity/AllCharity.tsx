import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Dropdown, Form, Modal, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import donorBg from '../../../assets/images/donor-bg-image.png'
import priority from '../../../assets/images/priority.png'
import { getDate, getIsAuthorizedForCharity, getName, isEmptyObjectOrNullUndefiend, isNullUndefinedOrBlank, renderError } from '../../../Utility/Helper'
import { approveCharityRequestApi, getBlogDropDownDataApi, getCharityListDataApi } from '../../../redux/Service/charity Management/allCharity'
import { BlogDropDown, BlogsResponse, CharityResponse, ENUMFORROUTES } from '../../../interfaces/interface'
import { useNavigate } from 'react-router-dom'
import cancerFight from '../../../assets/images/cancer-fight.svg'
import DatePicker from 'react-datepicker';
import { MAX_300 } from '../../../Utility/Validation_Helper'
import { FormikTouched, FormikValues, setNestedObjectValues, useFormik } from 'formik';
import * as yup from 'yup';
import { te } from '../../../Utility/Toaster'
import NoRecordsGrid from '../../../components/NoRecordsFound/NoRecordsGrid'

const AllCharity = (props) => {


    const [show, setRequestForCharityShow] = useState(false);
    const handleRequestForCharityClose = () => setRequestForCharityShow(false);
    const handleRequestForCharityShow = () => setRequestForCharityShow(true);


    /* ----------------------------get charity list-------------------- */
    const [charityData, setCharityData] = useState<Array<CharityResponse>>([])
    const [searchData, setSearchData] = useState<any>("");
    const [startDate, setStartDate] = useState<any>(null);
    const [endDate, setEndDate] = useState<any>(null);
    const handleGetCharityList = async () => {
        let payload = {} as any;
        payload.search = searchData && searchData
        payload.start_date = !isNullUndefinedOrBlank(startDate) ? getDate(startDate, "yyyy-MM-DD") : null;
        payload.end_date = !isNullUndefinedOrBlank(endDate) ? getDate(endDate, "yyyy-MM-DD") : null;

        // let response = await props?.getCharityListDataApi(payload);
        // if (response) {
        //     setCharityData(response.payload.content)
        // }

    }

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            handleGetCharityList();
            // handleGetBlogs();
        }, 300);
        return () => clearTimeout(delayDebounceFn);
    }, [searchData, startDate, endDate])


    const navigate = useNavigate();
    const navigateToRelatedScreen = (route: any, val?: any) => {
        if (val) {
            navigate(route, { state: val })
        }
        else {
            navigate(route)
        }

    }

    /* -------------------------blog data-------------------- */


    const [blogData, setBlogData] = useState<Array<BlogDropDown>>([])
    const getDropDownAPI = async () => {

        // const response = await props.getBlogDropDownDataApi();
        // if (!isEmptyObjectOrNullUndefiend(response)) {
        //     setBlogData(response.payload)
        // }
    }

    const handleNavigateDetails = (data, value) => {
        if (!isEmptyObjectOrNullUndefiend(blogData)) {
            let blogDetail = blogData.filter((val) => {
                if (data.includes(val.value)) {
                    return val
                }
            });

            navigateToRelatedScreen(ENUMFORROUTES.All_CHARITY_DETAILS, { ...value, blogsData: blogDetail })
        }
    }

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            getDropDownAPI()
            // handleGetBlogs();
        }, 300);
        return () => clearTimeout(delayDebounceFn);
    }, [])

    /* ------------------------search data---------------------- */
    const handleSearchData = async (e) => {
        let value = e.target.value
        const regex = /^[^'"$%@]*$/;
        if (regex.test(value)) {
            setSearchData(value);
        }
        // if (e.key === 'Enter') {
        //     e.preventDefault();
        //     handleGetOwnerData();
        // }
    }

    /* ----------------------------Requestcharity----------------------- */
    const initRequestForCharity = {
        request_note: ""
    };


    const validationSchemaForRequestCharity = yup.object({
        request_note: yup.string().trim().notRequired()
    })

    const handleRequestForCharity = async () => {
        // requestForCharityFormData.handleSubmit();

        const requestForCharityErrors = await requestForCharityFormData.validateForm();
        console.log(requestForCharityErrors)
        if (Object.keys(requestForCharityErrors).length > 0) {
            requestForCharityFormData.setTouched(
                setNestedObjectValues<
                    FormikTouched<FormikValues>
                >(requestForCharityErrors, true))
            te("Please Fill Proper Data");
            return;
        }

        const requestForCharity = await props.approveCharityRequestApi(requestForCharityFormData.values)
        // console.log(requestForCharity)
        if (requestForCharity.payload == "Success") {
            handleRequestForCharityClose();
        }
    }

    const requestForCharityFormData = useFormik({
        initialValues: initRequestForCharity,
        validationSchema: validationSchemaForRequestCharity,
        onSubmit: handleRequestForCharity,
    });

    /* ----------------------handle Refresh--------------------------- */
    const handleRefresh = () => {
        setSearchData("");
        setStartDate(null);
        setEndDate(null);
        handleGetCharityList();
    }

    return (
        <>
            <div className="page-content">
                <div className="page-content-wrapper">
                    <div className="page-small-banner">
                        <div className="page-small-banner-image">
                            <img src={donorBg} alt="donorBg" />
                        </div>
                        <div className="page-small-banner-details">
                            <div className="page-small-banner-left">
                                <div className="page-small-banner-text">
                                    {
                                        !isNullUndefinedOrBlank(getName()) &&
                                        <p>Welcome {getName()}!</p>
                                    }
                                    <h3>Charity</h3>
                                </div>
                            </div>
                            <div className="page-small-banner-right">
                                {(getIsAuthorizedForCharity() == "false") ?
                                    <Button variant='primary' size='sm' className='btn-icon-start' onClick={() => { handleRequestForCharityShow() }}> <i className='th-outline-add-circle'></i> Request For Charity</Button>
                                    :
                                    <Button variant='primary' size='sm' className='btn-icon-start' onClick={() => { navigateToRelatedScreen(ENUMFORROUTES.CREATE_CHARITY_ALL) }}> <i className='th-outline-add-circle'></i> Add New Charity</Button>

                                }
                                <Button variant="icon-sm" className='btn-icon-primary-outline-sm' onClick={() => { handleRefresh() }}> <i className='th-outline-refresh-2'></i></Button>
                            </div>
                        </div>
                    </div>
                    <div className="donor-all-charity-data">
                        <div className="page-filter">
                            {/* <div className="page-filter-left">

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
                                    <div className="form-control-icon icon-start">
                                        <i className='th-outline-calendar-1'></i>
                                        <Form.Control type="text" placeholder="Date Range" />
                                    </div>
                                </Form.Group>
                                <Button variant="icon-sm" className='btn-icon-white-sm' > <i className='th-outline-filter'></i></Button>


                            </div> */}

                            <div className="page-filter-left">

                                <Form.Group className="form-group filter-group">
                                    <div className="form-control-icon icon-start">
                                        <i className='th-outline-search-normal-1'></i>
                                        <Form.Control type="search" placeholder="Search by name"
                                            onChange={(e) => { handleSearchData(e) }}
                                            onKeyDown={(e) => { handleSearchData(e) }}
                                            value={searchData}
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
                                                setStartDate(!isNullUndefinedOrBlank(start) ? start : null);
                                                setEndDate(!isNullUndefinedOrBlank(end) ? end : null);
                                            }}
                                            startDate={startDate}
                                            endDate={endDate}
                                            // minDate={new Date()}
                                            isClearable
                                            dateFormat="dd-MM-yyyy"
                                            className="form-control date-range"
                                            popperProps={{ strategy: "fixed" }}
                                            placeholderText="Select a Date"

                                            // inline
                                            showIcon
                                        />
                                    </div>
                                </Form.Group>

                                {/* <Button variant="icon-sm" className='btn-icon-white-sm' > <i className='th-outline-filter'></i></Button> */}



                                <div className="page-filter-right">
                                    {/* <div className="custom-tab">
                            <ul><pre>{props.view}</pre>
                                <li className={`${props.view == ENUM_FOR_LISTING_VIEW.GRID_VIEW ? "active" : ""}`} onClick={() => { props.handleChangeView(ENUM_FOR_LISTING_VIEW.GRID_VIEW) }}><i className='th-outline-element-3'></i></li>
                                <li className={`${props.view == ENUM_FOR_LISTING_VIEW.LIST_VIEW ? "active" : ""}`} onClick={() => { props.handleChangeView(ENUM_FOR_LISTING_VIEW.LIST_VIEW) }}><i className='bi bi-list-task'></i></li>
                            </ul>
                        </div> */}
                                </div>
                            </div>
                            <div className="page-filter-right">
                                <Button variant='secondary' size='sm' className='btn-icon-end'>Custom Donation <i className='th-bold-heart'></i> </Button>
                            </div>
                        </div>
                        <div className="grid-view">
                            <Row>
                          

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
                                                                    <Dropdown.Item href="#/action-1"> <i className='th-outline-eye'></i> View</Dropdown.Item>
                                                                    <Dropdown.Item href="#/action-2"> <i className='th-outline-card'></i> Payment Method</Dropdown.Item>
                                                                    <Dropdown.Item href="#/action-3"> <i className='th-outline-tick-circle'></i> Mark as complated</Dropdown.Item>
                                                                </Dropdown.Menu>
                                                            </Dropdown>
                                                        </div>
                                                        <p>Loream ipsum is simply dummy text to mange </p>
                                                    </div>
                                                </div>
                                                <div className="charity-card-details">
                                                    <div className="per-month-charity">
                                                        <p> <img src={priority} alt="priority" /> $20 / Month</p>
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
                                                                    <Dropdown.Item href="#/action-1"> <i className='th-outline-eye'></i> View</Dropdown.Item>
                                                                    <Dropdown.Item href="#/action-2"> <i className='th-outline-card'></i> Payment Method</Dropdown.Item>
                                                                    <Dropdown.Item href="#/action-3"> <i className='th-outline-tick-circle'></i> Mark as complated</Dropdown.Item>
                                                                </Dropdown.Menu>
                                                            </Dropdown>
                                                        </div>
                                                        <p>Loream ipsum is simply dummy text to mange </p>
                                                    </div>
                                                </div>
                                                <div className="charity-card-details">
                                                    <div className="per-month-charity">
                                                        <p> <img src={priority} alt="priority" /> $20 / Month</p>
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
                                                    <div className="charity-icon suqare-icon icon-primary ">
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
                                                                    <Dropdown.Item href="#/action-1"> <i className='th-outline-eye'></i> View</Dropdown.Item>
                                                                    <Dropdown.Item href="#/action-2"> <i className='th-outline-card'></i> Payment Method</Dropdown.Item>
                                                                    <Dropdown.Item href="#/action-3"> <i className='th-outline-tick-circle'></i> Mark as complated</Dropdown.Item>
                                                                </Dropdown.Menu>
                                                            </Dropdown>
                                                        </div>
                                                        <p>Loream ipsum is simply dummy text to mange </p>
                                                    </div>
                                                </div>
                                                <div className="charity-card-details">
                                                    <div className="per-month-charity">
                                                        <p> <img src={priority} alt="priority" /> $20 / Month</p>
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
                                                    <div className="charity-icon suqare-icon icon-danger ">
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
                                                                    <Dropdown.Item href="#/action-1"> <i className='th-outline-eye'></i> View</Dropdown.Item>
                                                                    <Dropdown.Item href="#/action-2"> <i className='th-outline-card'></i> Payment Method</Dropdown.Item>
                                                                    <Dropdown.Item href="#/action-3"> <i className='th-outline-tick-circle'></i> Mark as complated</Dropdown.Item>
                                                                </Dropdown.Menu>
                                                            </Dropdown>
                                                        </div>
                                                        <p>Loream ipsum is simply dummy text to mange </p>
                                                    </div>
                                                </div>
                                                <div className="charity-card-details">
                                                    <div className="per-month-charity">
                                                        <p> <img src={priority} alt="priority" /> $20 / Month</p>
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
                    </div>
                </div>
            </div>


            <Modal show={show} onHide={handleRequestForCharityClose} className='modal-theme modal-workspace' centered>
                <Modal.Header>
                    <Modal.Title>Request For Charity</Modal.Title>
                    <Button variant="close" onClick={handleRequestForCharityClose}><i className='th th-close'></i></Button>
                </Modal.Header>
                <Modal.Body>

                    <div className="requested-for-charity p-0">
                        <Form.Group className="mb-3">
                            <Form.Label>Add Note</Form.Label>
                            <Form.Control as="textarea" rows={4} placeholder='Add detail note here why you want to create charity'
                                {...requestForCharityFormData.getFieldProps("request_note")}
                                maxLength={MAX_300}
                            />
                            {requestForCharityFormData.touched.request_note &&
                                requestForCharityFormData.errors.request_note
                                ? renderError(requestForCharityFormData.errors?.request_note)
                                : null}
                        </Form.Group>
                    </div>

                </Modal.Body>
                <Modal.Footer className='justify-content-center'>
                    <Button variant="white" onClick={handleRequestForCharityClose}>Cancel</Button>
                    <Button variant="primary" onClick={() => { requestForCharityFormData.handleSubmit() }}>Send Request </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {
    getCharityListDataApi,
    getBlogDropDownDataApi,
    approveCharityRequestApi
}

export default connect(mapStateToProps, mapDispatchToProps)(AllCharity)