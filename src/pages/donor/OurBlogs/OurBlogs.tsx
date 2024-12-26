import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import defaultAvatar2 from '../../../assets/images/avatar-default2.png'
import { Button, Form, Modal, OverlayTrigger, Table, Tooltip } from 'react-bootstrap'
import { BlogsReqBody, BlogsResponse, ENUMFORROUTES, TableHeader } from '../../../interfaces/interface'
import { useLocation, useNavigate } from 'react-router-dom'
// import heading from '../../../assets/images/heading.svg';
// import delete_icon from '../../../assets/images/delete.svg';
import blogBg from '../../../assets/images/blog-bg-image.png';
import AllBlogs from './AllBlogs'
import MyBlogs from './MyBlogs'
import { ENUM_FOR_BLOGS_KEY_TABLE_HEADERS, ENUM_FOR_BLOGS_TABLE_HEADERS, ENUM_FOR_BLOG_TAB, ENUM_FOR_LISTING_VIEW, ENUM_FOR_SORT_ORDER, ENUM_FOR_STUTUS } from '../../../interfaces/enum'
import { getDate, getName, isEmptyObjectOrNullUndefiend, isNullUndefinedOrBlank } from '../../../Utility/Helper'
import { getMyBlogListAPI, getAllBlogListAPI, addEditBlogAPI, deleteBlogAPI, updateBlogStatusAPI, approveRejectAPI } from '../../../redux/Service/blogManagement'
import Pagination from '../../../common/Pagination'
import delete_icon from '../../../assets/images/delete.svg';
import DatePicker from 'react-datepicker';
import Select from "react-select";

const OurBlogs = (props) => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const createBlog = () => {
        navigateToRelatedScreen(ENUMFORROUTES.CREATE_BLOG, { state: { type: "Create" } })
    };

    /* ------------------------------------handle tabs-------------------------------- */
    const [blogTab, setBlogTab] = useState<string>(ENUM_FOR_BLOG_TAB.ALL_BLOG)

    const handleOnChangeTab = (val) => {
        if (blogTab !== val) {
            setBlogTab(val);
        }
    }

    useEffect(() => {
        setBlogData([]);
        setSearchData("");
        setStartDate(null);
        setEndDate(null);
        setSelectedStatus("");
    }, [blogTab])

    /* --------------------------handleRefresh---------------------- */
    const handleRefreash = () => {
        setSearchData("");
        setPageNumber(1);
        setNoOfRecords(10);
        setSelectedStatus("");
        setStartDate(null);
        setEndDate(null)
        handleGetBlogs();
    }

    /* -------------------------------------get blogs Data------------------------------------- */

    const [blogData, setBlogData] = useState<Array<BlogsResponse>>(Array<BlogsResponse>)
    const [pageNumber, setPageNumber] = React.useState<any>(1);
    const [noOfRecords, setNoOfRecords] = React.useState<any>(10);
    const [searchData, setSearchData] = useState<any>("");
    const [startDate, setStartDate] = useState<any>(null);
    const [endDate, setEndDate] = useState<any>(null);
    const [selectedStatus, setSelectedStatus] = useState<any>("");
    const handleGetBlogs = async () => {

        let payload: BlogsReqBody = {} as BlogsReqBody;
        payload.page = pageNumber
        payload.limit = noOfRecords
        payload.sortBy = sortBy
        payload.orderBy = sortOrder
        payload.search = searchData
        payload.start_date = !isNullUndefinedOrBlank(startDate) ? getDate(startDate, "yyyy-MM-DD") : null;
        payload.end_date = !isNullUndefinedOrBlank(endDate) ? getDate(endDate, "yyyy-MM-DD") : null;

        payload.status = selectedStatus
        let response = {} as any;
        if (blogTab === ENUM_FOR_BLOG_TAB.ALL_BLOG) {
            // response = await props.getAllBlogListAPI(payload);
        } else {
            // response = await props.getMyBlogListAPI(payload);
        }
        // console.log(response);
        if (response) {
            if (isEmptyObjectOrNullUndefiend(response?.payload?.data?.content)) {
                if (pageNumber > 1) {
                    setPageNumber(pageNumber - 1)
                } else {
                    setBlogData([])
                }
            }
            setBlogData(!isEmptyObjectOrNullUndefiend(response?.payload?.data?.content) ? response?.payload?.data?.content : [])
        }

    }

    const initColumName: Array<TableHeader> = [

        {
            displayName: ENUM_FOR_BLOGS_TABLE_HEADERS.TITLE,
            keyName: ENUM_FOR_BLOGS_KEY_TABLE_HEADERS.TITLE,
            classname: "tbl-sorting",
            isDisplay: true,
        },
        // {
        //     displayName: ENUM_FOR_BLOGS_TABLE_HEADERS.AUTHOR,
        //     keyName: ENUM_FOR_BLOGS_KEY_TABLE_HEADERS.AUTHOR,
        //     classname: "tbl-sorting",
        //     isDisplay: true,
        // },
        {
            displayName: ENUM_FOR_BLOGS_TABLE_HEADERS.DATE,
            keyName: ENUM_FOR_BLOGS_KEY_TABLE_HEADERS.DATE,
            classname: " tbl-sorting",
            isDisplay: true,
        },
        {
            displayName: ENUM_FOR_BLOGS_TABLE_HEADERS.DATE,
            keyName: ENUM_FOR_BLOGS_KEY_TABLE_HEADERS.DATE,
            classname: " tbl-sorting",
            isDisplay: true,
        },
        {
            displayName: ENUM_FOR_BLOGS_TABLE_HEADERS.TAGS,
            keyName: ENUM_FOR_BLOGS_KEY_TABLE_HEADERS.TAGS,
            classname: "text-center tbl-sorting",
            isDisplay: true,
        },
        {
            displayName: ENUM_FOR_BLOGS_TABLE_HEADERS.LIKES,
            keyName: ENUM_FOR_BLOGS_KEY_TABLE_HEADERS.LIKES,
            classname: "text-center tbl-sorting",
            isDisplay: true,
        },
        {
            displayName: ENUM_FOR_BLOGS_TABLE_HEADERS.ACTIONS,
            keyName: ENUM_FOR_BLOGS_KEY_TABLE_HEADERS.ACTIONS,
            classname: "text-center tbl-action",
            isDisplay: true,
        }

    ]

    const [columName, setColumName] = useState<Array<TableHeader>>(initColumName);
    const [sortBy, setSortBy] = useState<string>(ENUM_FOR_BLOGS_KEY_TABLE_HEADERS.DATE);
    const [sortOrder, setSortOrder] = useState<string>(ENUM_FOR_SORT_ORDER.DESC);


    const columnSorting = (key: any, order: any) => {
        // console.log("caling",key,order);
        if (!isNullUndefinedOrBlank(key)) {
            let sortOrder = order
            if (sortBy === key && !isNullUndefinedOrBlank(order)) {
                sortOrder = order === ENUM_FOR_SORT_ORDER.DESC ? ENUM_FOR_SORT_ORDER.ASC : ENUM_FOR_SORT_ORDER.DESC;
            }
            else {
                sortOrder = ENUM_FOR_SORT_ORDER.ASC;
            }
            setSortBy(key);
            setSortOrder(sortOrder);
        }

    }

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            handleGetBlogs();
        }, 300);
        return () => clearTimeout(delayDebounceFn);
    }, [pageNumber, noOfRecords, sortBy, sortOrder, startDate, endDate, searchData, blogTab, selectedStatus])

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
    /* ------------------------Publish modals--------------------------- */
    const [show, setPublishShow] = useState(false);
    const [blogId, setBlogId] = useState<any>(null);


    const handlePublishClose = () => { setBlogId(null); setPublishShow(false); };
    const handlePublishShow = (item) => { setBlogId(item); setPublishShow(true); };

    const handlepublish = async () => {
        if (!isNullUndefinedOrBlank(blogId)) {
            let response = await props?.updateBlogStatusAPI({ id: blogId, status: "Published" })
            if (!isNullUndefinedOrBlank(response)) {
                handlePublishClose();
                setBlogId(null);
                handleGetBlogs();

            }
        }
    }

    /* ------------------------UnPublish modals--------------------------- */
    const [unPublishShow, setUnPublishShow] = useState(false);
    const [unPublishblogId, setUnPublishBlogId] = useState<any>(null);


    const handleUnPublishClose = () => { setUnPublishBlogId(null); setUnPublishShow(false); };
    const handleUnPublishShow = (item) => { setUnPublishBlogId(item); setUnPublishShow(true); };

    const handleUnpublish = async () => {
        if (!isNullUndefinedOrBlank(unPublishblogId)) {
            let response = await props?.updateBlogStatusAPI({ id: unPublishblogId, status: "Unpublished" })
            if (!isNullUndefinedOrBlank(response)) {
                handleUnPublishClose();
                setUnPublishBlogId(null);
                handleGetBlogs();

            }
        }
    }

    /* ------------------------Publish modals--------------------------- */
    const [deleteShow, setDeleteShow] = useState(false);
    const [deleteBlogId, setDeleteBlogId] = useState<any>(null);


    const handleDeleteClose = () => { setDeleteBlogId(null); setDeleteShow(false); };
    const handleDeleteShow = (item) => { setDeleteBlogId(item); setDeleteShow(true); };



    const handleDelete = async () => {
        if (!isNullUndefinedOrBlank(deleteBlogId)) {
            let response = await props?.deleteBlogAPI({ id: deleteBlogId })
            if (!isNullUndefinedOrBlank(response)) {
                handleDeleteClose();
                setDeleteBlogId(null);
                handleGetBlogs();
            }

        }
    }
    /* ------------------------Approve  modals--------------------------- */
    const [approveShow, setApproveShow] = useState(false);
    const [approveId, setApproveId] = useState<any>(null);


    const handleApproveClose = () => { setApproveId(null); setApproveShow(false); };
    const handleApproveShow = (item) => { setApproveId(item); setApproveShow(true); };



    const handleApprove = async () => {
        if (!isNullUndefinedOrBlank(approveId)) {
            let response = await props?.approveRejectAPI({ id: approveId, isApproved: true })
            if (!isNullUndefinedOrBlank(response)) {
                handleApproveClose();
                setApproveId(null);
                handleGetBlogs();
            }

        }
    }

    /* ------------------------ Reject modals--------------------------- */
    const [rejectShow, setRejectShow] = useState(false);
    const [DelineId, setDelineId] = useState<any>(null);


    const handleRejectClose = () => { setDelineId(null); setRejectShow(false); };
    const handleRejectShow = (item) => { setDelineId(item); setRejectShow(true); };



    const handleReject = async () => {
        if (!isNullUndefinedOrBlank(DelineId)) {
            let response = await props?.approveRejectAPI({ id: DelineId, isApproved: false })
            if (!isNullUndefinedOrBlank(response)) {
                handleRejectClose();
                setDelineId(null);
                handleGetBlogs();
            }

        }
    }

    //Common Dev Start
    const navigateToRelatedScreen = (route: any, val?: any, type?: string) => {
        if (val) {
            let data = {
                blogTab,
                sortBy,
                sortOrder,
                pageNumber,
                noOfRecords
            }
            let dataObj = { ...val, type, propsData: data }

            navigate(route, { state: dataObj })
        }
        else {
            navigate(route)
        }

    }



    useEffect(() => {
        if (!isNullUndefinedOrBlank(state)) {
            // console.log(state)
            setBlogTab(state.blogTab);
            if (state.blogTab === ENUM_FOR_BLOG_TAB.MY_BLOGS) {
                setPageNumber(state.pageNumber);
                setNoOfRecords(state.noOfRecords);
                setSortOrder(state.sortOrder);
                setSortBy(state.sortBy)
            }
        }
    }, [])
    return (
        <>
            <div className="page-content">
                <div className="page-content-wrapper">
                    <div className="page-small-banner">
                        <div className="page-small-banner-image">
                            <img src={blogBg} alt="donorBg" />
                        </div>
                        <div className="page-small-banner-details">
                            <div className="page-small-banner-left">
                                <div className="page-small-banner-text">
                                    {
                                        (!isNullUndefinedOrBlank(getName())) && (

                                            <p>Welcome {getName()!}</p>
                                        )
                                    }
                                    <h3>Our Blogs</h3>
                                </div>
                            </div>
                            <div className="page-small-banner-right">
                                <Button variant='primary' size='sm' className='btn-icon-start' onClick={() => { createBlog() }}> <i className='th-outline-add-circle'></i> Add New Blog</Button>
                                <Button variant="icon-sm" className='btn-icon-primary-outline-sm' onClick={() => { handleRefreash() }}> <i className='th-outline-refresh-2'></i></Button>
                            </div>
                        </div>
                    </div>

                    <div className="page-tab normal-tab mt-2">
                        <ul className="nav nav-pills" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className={`nav-link nav-icon-start ${blogTab === ENUM_FOR_BLOG_TAB.ALL_BLOG ? "active" : ""}`} id="pills-all-tab" data-bs-toggle="pill" data-bs-target="#pills-all" type="button" role="tab" aria-controls="pills-all" aria-selected="true" onClick={() => { handleOnChangeTab(ENUM_FOR_BLOG_TAB.ALL_BLOG) }}> <i className='th-outline-task-square'></i>All Blogs</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className={`nav-link nav-icon-start ${blogTab === ENUM_FOR_BLOG_TAB.MY_BLOGS ? "active" : ""}`} id="pills-my-blog-tab" data-bs-toggle="pill" data-bs-target="#pills-my-blog" type="button" role="tab" aria-controls="pills-my-blog" aria-selected="false" onClick={() => { handleOnChangeTab(ENUM_FOR_BLOG_TAB.MY_BLOGS) }}><i className='th-outline-document-text'></i>My Blogs</button>
                            </li>
                        </ul>
                        <div className="page-filter-wrapper">
                            <div className="page-filter">
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

                                    {
                                        (blogTab === ENUM_FOR_BLOG_TAB.MY_BLOGS) &&
                                        <Form.Group className="filter-group filter-select">
                                            <Select
                                                options={ENUM_FOR_STUTUS}
                                                onChange={(selectedOption) => {
                                                    setSelectedStatus(selectedOption?.value)
                                                }}
                                                placeholder={<div>Select status </div>}
                                                isClearable={true}
                                                value={ENUM_FOR_STUTUS?.filter(({ value }) => {
                                                    return (
                                                        value === selectedStatus
                                                    );
                                                })}
                                                className="react-select-container"
                                            />
                                        </Form.Group>
                                    }


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
                                                className="form-control"
                                                popperProps={{ strategy: "fixed" }}
                                                placeholderText="Select a Date"

                                                // inline
                                                showIcon
                                            />
                                        </div>
                                    </Form.Group>

                                    {/* <Button variant="icon-sm" className='btn-icon-white-sm' > <i className='th-outline-filter'></i></Button> */}


                                </div>
                                <div className="page-filter-right">
                                    {/* <div className="custom-tab">
                                <ul><pre>{props.view}</pre>
                                    <li className={`${props.view == ENUM_FOR_LISTING_VIEW.GRID_VIEW ? "active" : ""}`} onClick={() => { props.handleChangeView(ENUM_FOR_LISTING_VIEW.GRID_VIEW) }}><i className='th-outline-element-3'></i></li>
                                    <li className={`${props.view == ENUM_FOR_LISTING_VIEW.LIST_VIEW ? "active" : ""}`} onClick={() => { props.handleChangeView(ENUM_FOR_LISTING_VIEW.LIST_VIEW) }}><i className='bi bi-list-task'></i></li>
                                </ul>
                            </div> */}
                                </div>
                            </div>
                        </div>
                        <div className="tab-content" id="pills-tabContent">
                            <div className={`tab-pane fade  ${blogTab === ENUM_FOR_BLOG_TAB.ALL_BLOG ? " show active" : ""}`} id="pills-all" role="tabpanel" aria-labelledby="pills-all-tab">
                                <AllBlogs data={blogData} />
                            </div>
                            <div className={`tab-pane fade  ${blogTab === ENUM_FOR_BLOG_TAB.MY_BLOGS ? " show active" : ""}`} id="pills-my-blog" role="tabpanel" aria-labelledby="pills-my-blog-tab">
                                <MyBlogs selectedTab={blogTab} data={blogData} columName={columName} columnSorting={columnSorting} sortOrder={sortOrder} sortBy={sortBy}
                                    handlePublish={handlePublishShow} handleDeleteBlog={handleDeleteShow} handleEdit={navigateToRelatedScreen} handleUnpublish={handleUnPublishShow}
                                />
                            </div>
                        </div>
                    </div>

                    {
                        (blogTab === ENUM_FOR_BLOG_TAB.MY_BLOGS) && !isEmptyObjectOrNullUndefiend(blogData) &&
                        <div className='paginationbox pagination-fixed'>
                            <Pagination
                                className="pagination-bar"
                                currentPage={props.blogsData &&
                                    pageNumber
                                }
                                totalCount={
                                    props.blogsData && props.blogsData.data.totalRecords
                                }
                                pageSize={
                                    props.blogsData &&
                                    noOfRecords
                                }
                                onPageChange={(page: React.SetStateAction<number>) =>
                                    setPageNumber(page)
                                }
                                onPageSizeChange={(page: React.SetStateAction<number>) => {
                                    setPageNumber(1);
                                    setNoOfRecords(page);
                                }}
                            />
                        </div>
                    }
                </div>
            </div>

            <Modal show={show} onHide={handlePublishClose} className='modal-theme modal-workspace' centered>
                <Modal.Header>
                    <Modal.Title>Publish Blog</Modal.Title>
                    <Button variant="close" onClick={handlePublishClose}><i className='th th-close'></i></Button>
                </Modal.Header>
                <Modal.Body>
                    <div className="delete-conformation">
                        <div className="delete-image">
                            <img src={delete_icon} alt="delete" />
                        </div>
                        <div className="delete-text">
                            <h3>Are you Sure?</h3>
                            <p>You want to Publish this Blog</p>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className='justify-content-center'>
                    <Button variant="white" onClick={handlePublishClose}>No, Change my mind</Button>
                    <Button variant="secondary" onClick={() => { handlepublish() }}>Yes,Publish</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={unPublishShow} onHide={handleUnPublishClose} className='modal-theme modal-workspace' centered>
                <Modal.Header>
                    <Modal.Title>UnPublish Blog</Modal.Title>
                    <Button variant="close" onClick={handleUnPublishClose}><i className='th th-close'></i></Button>
                </Modal.Header>
                <Modal.Body>
                    <div className="delete-conformation">
                        <div className="delete-image">
                            <img src={delete_icon} alt="delete" />
                        </div>
                        <div className="delete-text">
                            <h3>Are you Sure?</h3>
                            <p>You want to UnPublish this Blog</p>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className='justify-content-center'>
                    <Button variant="white" onClick={handleUnPublishClose}>No, Change my mind</Button>
                    <Button variant="secondary" onClick={() => { handleUnpublish() }}>Yes,UnPublish</Button>
                </Modal.Footer>
            </Modal>


            <Modal show={deleteShow} onHide={handleDeleteClose} className='modal-theme modal-workspace' centered>
                <Modal.Header>
                    <Modal.Title>Delete Blog</Modal.Title>
                    <Button variant="close" onClick={handleDeleteClose}><i className='th th-close'></i></Button>
                </Modal.Header>
                <Modal.Body>
                    <div className="delete-conformation">
                        <div className="delete-image">
                            <img src={delete_icon} alt="delete" />
                        </div>
                        <div className="delete-text">
                            <h3>Are you Sure?</h3>
                            <p>You want to Delete this Blog</p>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className='justify-content-center'>
                    <Button variant="white" onClick={handleDeleteClose}>No, Change my mind</Button>
                    <Button variant="secondary" onClick={() => { handleDelete() }}>Yes,Delete</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={approveShow} onHide={handleApproveClose} className='modal-theme modal-workspace' centered>
                <Modal.Header>
                    <Modal.Title>Delete Blog</Modal.Title>
                    <Button variant="close" onClick={handleApproveClose}><i className='th th-close'></i></Button>
                </Modal.Header>
                <Modal.Body>
                    <div className="delete-conformation">
                        <div className="delete-image">
                            <img src={delete_icon} alt="delete" />
                        </div>
                        <div className="delete-text">
                            <h3>Are you Sure?</h3>
                            <p>You want to Approve this Blog</p>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className='justify-content-center'>
                    <Button variant="white" onClick={handleApproveClose}>No, Change my mind</Button>
                    <Button variant="secondary" onClick={() => { handleApprove() }}>Yes,Approve</Button>
                </Modal.Footer>
            </Modal>


            <Modal show={rejectShow} onHide={handleRejectClose} className='modal-theme modal-workspace' centered>
                <Modal.Header>
                    <Modal.Title>Delete Blog</Modal.Title>
                    <Button variant="close" onClick={handleRejectClose}><i className='th th-close'></i></Button>
                </Modal.Header>
                <Modal.Body>
                    <div className="delete-conformation">
                        <div className="delete-image">
                            <img src={delete_icon} alt="delete" />
                        </div>
                        <div className="delete-text">
                            <h3>Are you Sure?</h3>
                            <p>You want to Reject this Blog</p>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className='justify-content-center'>
                    <Button variant="white" onClick={handleRejectClose}>No, Change my mind</Button>
                    <Button variant="secondary" onClick={() => { handleReject() }}>Yes,Reject</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

const mapStateToProps = (state) => ({
    blogsData: state.BlogsManagementReducer.blogsData
})

const mapDispatchToProps = {
    getAllBlogListAPI,
    getMyBlogListAPI,
    deleteBlogAPI,
    updateBlogStatusAPI,
    approveRejectAPI

}

export default connect(mapStateToProps, mapDispatchToProps)(OurBlogs)