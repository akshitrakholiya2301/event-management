import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Dropdown, Form, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import donorBg from '../../../assets/images/donor-bg-image-2.png'
import ApprovedCharity from './ApprovedCharity'
import RequestedCharity from './RequestedCharity'
import { useLocation, useNavigate } from 'react-router-dom'
import { ENUMFORROUTES, GetMyCharityReq, TableHeader } from '../../../interfaces/interface'
import { getMyCharityListDataApi } from '../../../redux/Service/charity Management/myCharity'
import { ENUM_FOR_LISTING_VIEW, ENUM_FOR_MY_CHARITY_TAB, ENUM_FOR_SORT_ORDER, ENUM_FOR_TABLE_HEADERS_CHARITY_MANAGEMENT, ENUM_FOR_TABLE_REQUEST_HEADERS_CHARITY_MANAGEMENT } from '../../../interfaces/enum'
import { getDate, getName, isEmptyObjectOrNullUndefiend, isNullUndefinedOrBlank } from '../../../Utility/Helper'
import Pagination from '../../../common/Pagination'
import DatePicker from 'react-datepicker';


const MyCharity = (props) => {
    const { state } = useLocation();
    const [view, setview] = useState(ENUM_FOR_LISTING_VIEW.GRID_VIEW)



    /* -------------------------------my charity tab---------------------------------------------- */
    const [myCharityTab, setMycharityTab] = useState<string>(ENUM_FOR_MY_CHARITY_TAB.APPROVED)

    const handleTab = (val) => {
        if (val != myCharityTab) {
            setMyCharityData([]);
            setMycharityTab(val)
        }
    }

    useEffect(() => {
        setColumName(initColumName);
        setSearchData("");
        setStartDate(null);
        setEndDate(null);
    }, [myCharityTab])


    /* --------------------------------manage Data of My charity---------------------------------------- */
    const [myCharityData, setMyCharityData] = useState<any>([]);
    const [pageNumber, setPageNumber] = React.useState<any>(1);
    const [noOfRecords, setNoOfRecords] = React.useState<any>(10);
    const [searchData, setSearchData] = useState<any>("");
    const [startDate, setStartDate] = useState<any>(null);
    const [endDate, setEndDate] = useState<any>(null);


    const initColumName: Array<TableHeader> = [

        {
            displayName: ENUM_FOR_TABLE_HEADERS_CHARITY_MANAGEMENT.ID_FOR_MANGEMENT,
            keyName: ENUM_FOR_TABLE_REQUEST_HEADERS_CHARITY_MANAGEMENT.ID_FOR_MANGEMENT,
            classname: "tbl-sorting",
            isDisplay: true,
        },
        // {
        //     displayName: ENUM_FOR_TABLE_HEADERS_CHARITY_MANAGEMENT.AUTHOR,
        //     keyName: ENUM_FOR_BLOGS_KEY_TABLE_HEADERS.AUTHOR,
        //     classname: "tbl-sorting",
        //     isDisplay: true,
        // },
        {
            displayName: ENUM_FOR_TABLE_HEADERS_CHARITY_MANAGEMENT.NAME_FOR_MANGEMENT,
            keyName: ENUM_FOR_TABLE_REQUEST_HEADERS_CHARITY_MANAGEMENT.NAME_FOR_MANGEMENT,
            classname: "tbl-sorting",
            isDisplay: true,
        },
        {
            displayName: ENUM_FOR_TABLE_HEADERS_CHARITY_MANAGEMENT.DESCRIPTION_FOR_MANGEMENT,
            keyName: ENUM_FOR_TABLE_REQUEST_HEADERS_CHARITY_MANAGEMENT.DESCRIPTION_FOR_MANGEMENT,
            classname: "tbl-sorting",
            isDisplay: true,
        },
        {
            displayName: ENUM_FOR_TABLE_HEADERS_CHARITY_MANAGEMENT.DATE_FOR_MANGEMENT,
            keyName: ENUM_FOR_TABLE_REQUEST_HEADERS_CHARITY_MANAGEMENT.DATE_FOR_MANGEMENT,
            classname: "text-center tbl-sorting",
            isDisplay: true,
        },
        {
            displayName: ENUM_FOR_TABLE_HEADERS_CHARITY_MANAGEMENT.AMOUNT_FOR_MANAGEMENT,
            keyName: ENUM_FOR_TABLE_REQUEST_HEADERS_CHARITY_MANAGEMENT.AMOUNT_FOR_MANAGEMENT,
            classname: "text-center tbl-sorting",
            isDisplay: true,
        },
        {
            displayName: ENUM_FOR_TABLE_HEADERS_CHARITY_MANAGEMENT.TARGET_FOR_MANGEMENT,
            keyName: ENUM_FOR_TABLE_REQUEST_HEADERS_CHARITY_MANAGEMENT.TARGET_FOR_MANGEMENT,
            classname: "text-center tbl-sorting",
            isDisplay: true,
        },
        {
            displayName: ENUM_FOR_TABLE_HEADERS_CHARITY_MANAGEMENT.COLLECTED_FOR_MANGEMENT,
            keyName: "",
            classname: "text-center tbl-action",
            isDisplay: myCharityTab == ENUM_FOR_MY_CHARITY_TAB.APPROVED,
        },
        {
            displayName: ENUM_FOR_TABLE_HEADERS_CHARITY_MANAGEMENT.STATUS_FOR_MANGEMENT,
            keyName: "",
            classname: "text-center tbl-action",
            isDisplay: myCharityTab == ENUM_FOR_MY_CHARITY_TAB.REQUESTED,
        },
        {
            displayName: ENUM_FOR_TABLE_HEADERS_CHARITY_MANAGEMENT.PROGRESS_FOR_MANGEMENT,
            keyName: "",
            classname: "text-center tbl-action",
            isDisplay: true,
        },
    ]

    const [columName, setColumName] = useState<Array<TableHeader>>(initColumName);
    const [sortBy, setSortBy] = useState<string>(ENUM_FOR_TABLE_REQUEST_HEADERS_CHARITY_MANAGEMENT.DATE_FOR_MANGEMENT);
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




    const handleGetData = async () => {
        let payload: GetMyCharityReq = {}
        payload.charity_status = myCharityTab
        if (view == ENUM_FOR_LISTING_VIEW.LIST_VIEW) {

            payload.page = pageNumber
            payload.limit = noOfRecords
        }
        payload.sortBy = sortBy
        payload.orderBy = sortOrder
        payload.search = searchData
        payload.start_date = !isNullUndefinedOrBlank(startDate) ? getDate(startDate, "yyyy-MM-DD") : null;
        payload.end_date = !isNullUndefinedOrBlank(endDate) ? getDate(endDate, "yyyy-MM-DD") : null;


        // const response = await props.getMyCharityListDataApi(payload);
        // if (!isNullUndefinedOrBlank(response)) {
        //     // console.log(response)
        //     if (isEmptyObjectOrNullUndefiend(response?.payload?.content)) {
        //         if (pageNumber > 1) {
        //             setPageNumber(pageNumber - 1)
        //         } else {
        //             setMyCharityData([])
        //         }
        //     }
        //     setMyCharityData(response.payload.content ? response.payload.content : [])
        // }
    }

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            handleGetData();
        }, 300);
        return () => clearTimeout(delayDebounceFn);
    }, [myCharityTab, startDate, endDate, searchData, sortBy, sortOrder, pageNumber, noOfRecords, view])

    /* -------------------------------handleEdit-------------------------- */
    const handleEdit = (item) => {
        if (!isNullUndefinedOrBlank(item)) {
            let propsData = {
                pageNumber,
                noOfRecords,
                view,
                myCharityTab,
                sortBy,
                sortOrder
            }
            let data = { ...item, propsData }
            navigateToRelatedScreen(ENUMFORROUTES.CREATE_CHARITY, data)
        }
    }

    const navigate = useNavigate();

    const createCharity = () => {
        navigate(ENUMFORROUTES.CREATE_CHARITY);
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

    useEffect(() => {
        // console.log(state)
        if (!isNullUndefinedOrBlank(state)) {
            setPageNumber(state.pageNumber)
            setNoOfRecords(state.noOfRecords);
            setSortBy(state.sortBy);
            setSortOrder(state.sortOrder);
            setview(state.view);
            setMycharityTab(state.myCharityTab);
        }
    }, [state])

    /* ------------------handle Search-------------------------- */
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
    // console.log(props.data.totalRecords)
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
                                <Button variant='primary' size='sm' className='btn-icon-start' onClick={createCharity}> <i className='th-outline-add-circle'></i> Add New Charity</Button>
                                <Button variant="icon-sm" className='btn-icon-primary-outline-sm' onClick={() => { handleGetData() }}> <i className='th-outline-refresh-2'></i></Button>
                            </div>
                        </div>
                    </div>
                    <div className="page-tab normal-tab mt-2">
                        <ul className="nav nav-pills" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className={`nav-link nav-icon-start ${myCharityTab === ENUM_FOR_MY_CHARITY_TAB.APPROVED ? "active" : ""}`} id="pills-approved-tab" data-bs-toggle="pill" data-bs-target="#pills-approved" type="button" role="tab" aria-controls="pills-approved" aria-selected="true" onClick={() => { handleTab(ENUM_FOR_MY_CHARITY_TAB.APPROVED) }}>
                                    <i className='th-outline-tick-circle'></i> Approved
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className={`nav-link nav-icon-start  ${myCharityTab === ENUM_FOR_MY_CHARITY_TAB.REQUESTED ? "active" : ""}`} id="pills-requested-tab" data-bs-toggle="pill" data-bs-target="#pills-requested" type="button" role="tab" aria-controls="pills-requested" aria-selected="false" onClick={() => { handleTab(ENUM_FOR_MY_CHARITY_TAB.REQUESTED) }}><i className='th-outline-document-text'></i>Requested</button>
                            </li>

                        </ul>

                        <div className="tab-content" id="pills-tabContent">
                            <div className={`tab-pane fade ${myCharityTab === ENUM_FOR_MY_CHARITY_TAB.APPROVED ? "show active" : ""}`} id="pills-approved" role="tabpanel" aria-labelledby="pills-approved-tab">
                                <ApprovedCharity data={myCharityData} handleView={setview} view={view} columName={columName} columnSorting={columnSorting} sortOrder={sortOrder} sortBy={sortBy} startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} searchData={searchData} handleSearchData={handleSearchData} handleEdit={handleEdit} />
                            </div>
                            <div className={`tab-pane fade ${myCharityTab === ENUM_FOR_MY_CHARITY_TAB.REQUESTED ? "show active" : ""}`} id="pills-requested" role="tabpanel" aria-labelledby="pills-requested-tab">
                                <RequestedCharity data={myCharityData} handleView={setview} view={view} columName={columName} columnSorting={columnSorting} sortOrder={sortOrder} sortBy={sortBy} startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} searchData={searchData} handleSearchData={handleSearchData} handleEdit={handleEdit} />
                            </div>
                        </div>
                    </div>

                    {
                        (ENUM_FOR_LISTING_VIEW.LIST_VIEW === view) && !isEmptyObjectOrNullUndefiend(myCharityData) &&
                        <div className='paginationbox pagination-fixed'>
                            <Pagination
                                className="pagination-bar"
                                currentPage={props.data &&
                                    pageNumber
                                }
                                totalCount={
                                    props.data && props.data.totalRecords
                                }
                                pageSize={
                                    props.data &&
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
        </>
    )
}

const mapStateToProps = (state) => ({
    data: state.MyCharityManagementReducer.myCharityData
})

const mapDispatchToProps = {
    getMyCharityListDataApi
}

export default connect(mapStateToProps, mapDispatchToProps)(MyCharity)