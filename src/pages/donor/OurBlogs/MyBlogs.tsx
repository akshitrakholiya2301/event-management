import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Button, Form, OverlayTrigger, Table, Tooltip } from 'react-bootstrap'
import defaultAvatar2 from '../../../assets/images/avatar-default2.png'
import { ENUM_FOR_DELETE_BLOG_RIGHT, ENUM_FOR_EDIT_BLOG_RIGHT, ENUM_FOR_LISTING_VIEW, ENUM_FOR_PUBLISH_BLOG_RIGHT, ENUM_FOR_SORT_ORDER, ENUM_FOR_STATUS, ENUM_FOR_UNPUBLISH_BLOG_RIGHT } from '../../../interfaces/enum'
import { NO_RECORD_FOUND_MSG, formatedDate, isEmptyObjectOrNullUndefiend, isNullUndefinedOrBlank } from '../../../Utility/Helper'
import { BlogsResponse, ENUMFORROUTES, ENUMFORSTATUS } from '../../../interfaces/interface'
import defaultAvatar from '../../../assets/images/avatar-default.svg'

const MyBlogs = (props) => {
    const [blogData, setBlogData] = useState<Array<BlogsResponse>>([])
    useEffect(() => {
        setBlogData(props?.data);
    }, [props.data])

    // console.log("hello")
    return (
        <>
            <div className="tab-data card-table-sticky">

                <Table responsive bordered hover className='table-theme table-sticky'>
                    <thead>
                        {
                            props.columName.map((item, index) => (
                                (item.isDisplay && <th className={`${item.classname} ${item.keyName === props.sortBy ? (props.sortOrder === ENUM_FOR_SORT_ORDER.ASC ? "sorting-asc" : "sorting-desc") : ""}`}
                                    onClick={() => {
                                        if (!isEmptyObjectOrNullUndefiend(blogData)) {
                                            props.columnSorting(item.keyName, props.sortOrder)
                                        }
                                    }} key={index}>{item.displayName} </th>)

                            ))
                        }

                    </thead>
                    <tbody>
                        <tr>
                            <td className=''>
                                <div className="table-blog-deatils">
                                    <img src={defaultAvatar2} alt="defaultAvatar2" />
                                    <div className="table-blog-deatils-deatils-text">
                                        <h6>Blog heading One</h6>
                                        <p>Aliquam a dui vel justo fringilla euismod id id enim. Nunc non semper tellus.</p>
                                    </div>
                                </div>
                            </td>
                            <td className=''>
                                12 March 2024
                            </td>
                            <td className=''>
                                12 March 2024 <br /><span className='text-success'>Published</span>
                            </td>
                            <td className=''>
                                <div className="tags-wrapper">
                                    <div className="tags">Cancer</div>
                                    <div className="tags">Help</div>
                                    <div className="tags">Charity</div>
                                </div>
                            </td>
                            <td className=''>150</td>
                            <td className='tbl-action'>
                                <div className="tbl-action-group">
                                    <OverlayTrigger
                                        trigger={["hover", "hover"]}
                                        placement="left"
                                        overlay={
                                            <Tooltip>Edit</Tooltip>
                                        }
                                    >
                                        <Button variant='action' className=''><i className='th-outline-edit'></i></Button>
                                    </OverlayTrigger>
                                    <OverlayTrigger
                                        trigger={["hover", "hover"]}
                                        placement="left"
                                        overlay={
                                            <Tooltip>Unpublished</Tooltip>
                                        }
                                    >
                                        <Button variant='action' className=''><i className='th-outline-tick-circle'></i></Button>
                                    </OverlayTrigger>
                                    <OverlayTrigger
                                        trigger={["hover", "hover"]}
                                        placement="left"
                                        overlay={
                                            <Tooltip>Publish</Tooltip>
                                        }
                                    >
                                        <Button variant='action' className=''><i className='th-outline-close-circle'></i></Button>
                                    </OverlayTrigger>
                                </div>
                            </td>
                        </tr> 
                        <tr>
                            <td className=''>
                                <div className="table-blog-deatils">
                                    <img src={defaultAvatar2} alt="defaultAvatar2" />
                                    <div className="table-blog-deatils-deatils-text">
                                        <h6>Blog heading One</h6>
                                        <p>Aliquam a dui vel justo fringilla euismod id id enim. Nunc non semper tellus.</p>
                                    </div>
                                </div>
                            </td>
                            <td className=''>
                                12 March 2024
                            </td>
                            <td className=''>
                                12 March 2024 <br /><span className='text-warning'>Draft</span>
                            </td>
                            <td className=''>
                                <div className="tags-wrapper">
                                    <div className="tags">Cancer</div>
                                    <div className="tags">Help</div>
                                    <div className="tags">Charity</div>
                                </div>
                            </td>
                            <td className=''>150</td>

                            <td className='tbl-action'>
                                <div className="tbl-action-group">
                                    <OverlayTrigger
                                        trigger={["hover", "hover"]}
                                        placement="left"
                                        overlay={
                                            <Tooltip>Edit</Tooltip>
                                        }
                                    >
                                        <Button variant='action' className=''><i className='th-outline-edit'></i></Button>
                                    </OverlayTrigger>
                                    <OverlayTrigger
                                        trigger={["hover", "hover"]}
                                        placement="left"
                                        overlay={
                                            <Tooltip>Unpublished</Tooltip>
                                        }
                                    >
                                        <Button variant='action' className=''><i className='th-outline-tick-circle'></i></Button>
                                    </OverlayTrigger>
                                    <OverlayTrigger
                                        trigger={["hover", "hover"]}
                                        placement="left"
                                        overlay={
                                            <Tooltip>Publish</Tooltip>
                                        }
                                    >
                                        <Button variant='action' className=''><i className='th-outline-close-circle'></i></Button>
                                    </OverlayTrigger>
                                </div>
                            </td>
                        </tr>



                    </tbody>
                </Table>
            </div>
        </>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(MyBlogs)