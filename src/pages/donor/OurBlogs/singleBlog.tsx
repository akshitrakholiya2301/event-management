import React, { useEffect, useState } from 'react'
import { Breadcrumb, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import blogCover from '../../../assets/images/blog-colver.png'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { BlogsResponse, ENUMFORROUTES } from '../../../interfaces/interface'
import { formatedDate, getName, isEmptyObjectOrNullUndefiend, isNullUndefinedOrBlank } from '../../../Utility/Helper'
import { ENUM_FOR_BLOG_TAB } from '../../../interfaces/enum'

const singleBlog = (props) => {
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState<BlogsResponse>({} as BlogsResponse);
  let { state } = useLocation();

  useEffect(() => {
    setBlogData(state)
  }, [state]);

  const handleBackOnCreate = () => {
    if (!isNullUndefinedOrBlank(state)) {
      if (isNullUndefinedOrBlank(state.propsData)) {
        navigate(ENUMFORROUTES.OUR_BLOGS);
      } else {
        navigate(ENUMFORROUTES.CREATE_BLOG, { state: state });
      }
    } else {
      navigate(ENUMFORROUTES.OUR_BLOGS);
    }
  }

  return (
    <>
      <div className="page-content">
        <div className="page-content-wrapper">
          <div className="blog-single-details">
            <div className="page-title border-bottom d-none">
              <div className="page-title-left">
                <div className="page-title-text">
                  <h2>Preview of ({(!isNullUndefinedOrBlank(blogData) && !isNullUndefinedOrBlank(blogData.heading)) ? blogData.heading : "-"})</h2>
                </div>
              </div>
              <div className="page-title-right">
                <Button variant="icon-sm" className='btn-icon-white-outline-sm' onClick={() => { handleBackOnCreate() }}> <i className='th-close'></i></Button>
              </div>
            </div>
            <div className="blog-details-cover">
              {
                !isEmptyObjectOrNullUndefiend(blogData.images) && blogData.images.some(val => val.doc_type === "cover_image") ?
                  blogData.images.filter(val => val.doc_type === "cover_image").map((val, index) => (
                    <div className="blog-image" key={index}>
                      <img src={val.url} alt="blogThumb" />
                    </div>
                  )) :
                  <div className="blog-image">
                    <img src={blogCover} alt="blogThumb" />
                  </div>

              }
              <Button variant="white" className='btn-sm btn-icon-start' onClick={() => { handleBackOnCreate() }}> <i className='th-outline-arrow-left'></i> Back</Button>
            </div>
            <div className="blog-info-content">
              <div className="blog-info">
                <div className="blog-info-left">
                  <div className="blog-info-tag">{!isNullUndefinedOrBlank(blogData?.author_name) ? blogData?.author_name : getName()}</div>
                  <div className="blog-info-date-like">{!isNullUndefinedOrBlank(blogData.createdAt) ? formatedDate(blogData.createdAt, "DD MMMM, YYYY") : formatedDate(new Date(), "DD MMMM, YYYY")} <span>•</span> {!isNullUndefinedOrBlank(blogData.likes) ? blogData.likes : 0}</div>
                </div>
                <div className="blog-info-right">
                  <div className="blog-info-icon">
                    <NavLink to="" className='round-icon icon-white'>
                      <i className='bi bi-link-45deg'></i>
                    </NavLink>
                    <NavLink to="" className='round-icon icon-white'>
                      <i className='bi bi-twitter'></i>
                    </NavLink>
                    <NavLink to="" className='round-icon icon-white'>
                      <i className='bi bi-facebook'></i>
                    </NavLink>
                  </div>
                </div>
              </div>
              <div className="blog-content">
                <h3>{(!isNullUndefinedOrBlank(blogData) && !isNullUndefinedOrBlank(blogData.heading)) ? blogData.heading : "-"}</h3>
                <div dangerouslySetInnerHTML={{ __html: (!isNullUndefinedOrBlank(blogData) && !isNullUndefinedOrBlank(blogData.description)) ? blogData.description : <>-</> as any }}>
                </div>
                {/* <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators</p>
                                                <h4>Dr Nicolas Cage: Making a difference for dads everywhere</h4>
                                                <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum</p>
                                                <p>There are many variations of passages of Lorem Ipsum available, but the majority have
                                                suffered alteration in some form, by injected humour</p> */}
                {/* <div className="blog-content-image"> */}
                <div className="blog-content-image">
                  {
                    !isEmptyObjectOrNullUndefiend(blogData.images) && blogData.images.some(val => val.doc_type === "blog_pic") ?
                      blogData.images.filter(val => val.doc_type === "blog_pic").map((val, index) => (
                        <>
                          {/* <pre>{index}</pre> */}
                          {
                            index < 2 &&
                            <div className="blog-content-image-wrapper">
                              <img src={val.url} alt="blogCover" />
                            </div>
                          }
                        </>
                      )) :

                      <div className="blog-content-image-wrapper">
                        <img src={blogCover} alt="blogCover" />
                      </div>
                  }
                </div>
                {
                  !isEmptyObjectOrNullUndefiend(blogData.images) && blogData.images.some(val => val.doc_type === "blog_pic") ?
                    blogData.images.filter(val => val.doc_type === "blog_pic").map((val, index) => (
                      <>
                        {
                          index == 2 &&
                          <div className="blog-content-image">
                            <div className="blog-content-image-wrapper">
                              <img src={val.url} alt="blogCover" />
                            </div>
                          </div>
                        }
                      </>
                    )) :

                    <div className="blog-content-image-wrapper">
                      <img src={blogCover} alt="blogCover" />
                    </div>
                }
                {/* <div className="blog-content-image-wrapper">
                                                        <img src={blogCover} alt="blogCover" />
                                                    </div>
                                                    <div className="blog-content-image-wrapper">
                                                        <img src={blogCover} alt="blogCover" />
                                                    </div>
                                                </div>
                                                <div className="blog-content-image">
                                                    <div className="blog-content-image-wrapper">
                                                        <img src={blogCover} alt="blogCover" />
                                                    </div>*/}

                {/* </div> */}

                <Button variant='outline-primary' className='btn-icon-start'> <i className='th-outline-like-1'></i> Like</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(singleBlog)