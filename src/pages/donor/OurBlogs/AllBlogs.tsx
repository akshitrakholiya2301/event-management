import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row, Table } from 'react-bootstrap'
import { connect } from 'react-redux'
import blogThumb from '../../../assets/images/blog-thumb.png';
import { useNavigate } from 'react-router-dom';
import { BlogsResponse, ENUMFORROUTES } from '../../../interfaces/interface';
import { formatedDate, isEmptyObjectOrNullUndefiend, isNullUndefinedOrBlank } from '../../../Utility/Helper';
import { ENUM_FOR_LISTING_VIEW } from '../../../interfaces/enum';
import singleBlog from './singleBlog';


const AllBlogs = (props) => {

    const navigate = useNavigate();


    /* -----------------------manage Data ------------------------ */

    const [blogData, setBlogData] = useState<Array<BlogsResponse>>([])
    useEffect(() => {
        if (!isNullUndefinedOrBlank(props.data)) {
            setBlogData(props.data)
            // setBlogData([])
        }
    }, [props.data])
    /*     navigate        */

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
     {/* <div className="page-filter">
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
                            <div className="form-control-icon icon-start">
                                <i className='th-outline-calendar-1'></i>
                                <Form.Control type="text" placeholder="Date Range" />
                            </div>
                        </Form.Group>

                        <Button variant="icon-sm" className='btn-icon-white-sm' > <i className='th-outline-filter'></i></Button>


                    </div>
                    <div className="page-filter-right">
                        <div className="custom-tab">
                            <ul>
                                <li className={`${props.view === ENUM_FOR_LISTING_VIEW.GRID_VIEW ? "active" : ""}`} onClick={() => { props.handleChangeView(ENUM_FOR_LISTING_VIEW.GRID_VIEW) }}><i className='th-outline-element-3'></i></li>
                                <li className={`${props.view === ENUM_FOR_LISTING_VIEW.LIST_VIEW ? "active" : ""}`} onClick={() => { props.handleChangeView(ENUM_FOR_LISTING_VIEW.LIST_VIEW) }}><i className='bi bi-list-task'></i></li>
                            </ul>
                        </div> 
                </div>
                </div> */}
                <Row>
                    <Col md={4}>
                        <div className="blog-card" onClick={singleBlog} >
                            <div className="blog-image">
                                <img src={blogThumb} alt="blogThumb" />
                            </div>
                            <div className="blog-details">
                                <h6>Dr Nicolas Cage: Making a difference for dads everywhere</h6>
                                <p>Dr. nicolas cage is doing everything he can to improve the outlook for childhood cancer patients. His research has the potential to change countless lives, but he also has another important job – being a dad to three beautiful children!</p>
                                <div className="blog-details-action">
                                    <div className="blog-action">
                                        <p> <i className='th-outline-like-1'></i> 56</p>
                                    </div>
                                    <div className="blog-user-data">
                                        <p>10 Apr 2024 <span>•</span> 56 Likes</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="blog-card" onClick={singleBlog} >
                            <div className="blog-image">
                                <img src={blogThumb} alt="blogThumb" />
                            </div>
                            <div className="blog-details">
                                <h6>Dr Nicolas Cage: Making a difference for dads everywhere</h6>
                                <p>Dr. nicolas cage is doing everything he can to improve the outlook for childhood cancer patients. His research has the potential to change countless lives, but he also has another important job – being a dad to three beautiful children!</p>
                                <div className="blog-details-action">
                                    <div className="blog-action">
                                        <p> <i className='th-outline-like-1'></i> 56</p>
                                    </div>
                                    <div className="blog-user-data">
                                        <p>10 Apr 2024 <span>•</span> 56 Likes</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="blog-card" onClick={singleBlog} >
                            <div className="blog-image">
                                <img src={blogThumb} alt="blogThumb" />
                            </div>
                            <div className="blog-details">
                                <h6>Dr Nicolas Cage: Making a difference for dads everywhere</h6>
                                <p>Dr. nicolas cage is doing everything he can to improve the outlook for childhood cancer patients. His research has the potential to change countless lives, but he also has another important job – being a dad to three beautiful children!</p>
                                <div className="blog-details-action">
                                    <div className="blog-action">
                                        <p> <i className='th-outline-like-1'></i> 56</p>
                                    </div>
                                    <div className="blog-user-data">
                                        <p>10 Apr 2024 <span>•</span> 56 Likes</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="blog-card" onClick={singleBlog} >
                            <div className="blog-image">
                                <img src={blogThumb} alt="blogThumb" />
                            </div>
                            <div className="blog-details">
                                <h6>Dr Nicolas Cage: Making a difference for dads everywhere</h6>
                                <p>Dr. nicolas cage is doing everything he can to improve the outlook for childhood cancer patients. His research has the potential to change countless lives, but he also has another important job – being a dad to three beautiful children!</p>
                                <div className="blog-details-action">
                                    <div className="blog-action">
                                        <p> <i className='th-outline-like-1'></i> 56</p>
                                    </div>
                                    <div className="blog-user-data">
                                        <p>10 Apr 2024 <span>•</span> 56 Likes</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="blog-card">
                            <div className="blog-image">
                                <img src={blogThumb} alt="blogThumb" />
                            </div>
                            <div className="blog-details">
                                <h6>Dr Nicolas Cage: Making a difference for dads everywhere</h6>
                                <p>Dr. nicolas cage is doing everything he can to improve the outlook for childhood cancer patients. His research has the potential to change countless lives, but he also has another important job – being a dad to three beautiful children!</p>
                                <div className="blog-details-action">
                                    <div className="blog-action">
                                        <p> <i className='th-outline-like-1'></i> 56</p>
                                    </div>
                                    <div className="blog-user-data">
                                        <p>10 Apr 2024 <span>•</span> 56 Likes</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row >

              
                </Row>
            </div>
        </>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(AllBlogs)