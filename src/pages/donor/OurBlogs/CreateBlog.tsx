import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { Breadcrumb, Button, Card, Col, Dropdown, Form, Modal, OverlayTrigger, ProgressBar, Row, Table, Tooltip } from 'react-bootstrap';
import heading from '../../../assets/images/heading.svg';
import delete_icon from '../../../assets/images/delete.svg';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { BlogUploadedImages, BlogsResponse, DropdownListFormat, ENUMFORROUTES } from '../../../interfaces/interface';
import * as yup from 'yup';
import { FormikTouched, FormikValues, setNestedObjectValues, useFormik } from 'formik';
import { FILE_SIZE, SUPPORTED_FORMATS, checkFileSize, copyText, customJsonInclude, isEmptyObjectOrNullUndefiend, isNullUndefinedOrBlank, renderError } from '../../../Utility/Helper';
import { ENUM_FOR_BLOG_CREATE_PRIVIEW } from '../../../interfaces/enum';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build';
import { addEditBlogAPI, approveRejectAPI, deleteBlogAPI, updateBlogStatusAPI } from '../../../redux/Service/blogManagement';
import { FILE_FORMATE_VALIDATION, FILE_SIZE_VALIDATION, PLEASE_PROVIDE_VALID_LINK } from '../../../Utility/Validation_Message';
import { url } from 'inspector';
import { MAX_5, WEBSITE_PATTERN } from '../../../Utility/Validation_Helper';
import { getTagDropDownDataApi } from '../../../redux/Service/generic';
import Select from "react-select";
// import { getTagDropDownDataApi } from '../../../redux/Service/CharityMangement/charityMangement';

const CreateBlog = (props) => {
    /* ---------------------Blog Reference-------------------- */
    const blogCoverImage = useRef() as any;
    const blogImage = useRef() as any;

    const navigate = useNavigate();
    const { state } = useLocation();
    const [show, setDeleteShow] = useState(false);

    const handleDeleteClose = () => setDeleteShow(false);
    const handleDeleteShow = () => setDeleteShow(true);
    /* ------------------------------create blog---------------------------- */
    const [blogData, setBlogData] = useState<BlogsResponse>({} as BlogsResponse);

    // const handleUploadCoverImg = (event) => {
    //     const file = event.target.files[0];
    //     const reader = new FileReader();
    //     if (!isNullUndefinedOrBlank(file)) {

    //         // const fileSIzeInMb = +convertDecimalTwoPoint(file.size / (1024 ** 2));
    //         if (!checkFileSize(file.size, MAX_5)) {
    //             setShowError(true);
    //             setErrorMsgCoverImage("File size can not be exceeded than 5 mb.");
    //             blogCoverImages.current.value = null;
    //             setUploadedCoverImages(null);
    //             return;
    //         }
    //         const url = URL.createObjectURL(file);

    //         const splitValue = file?.name.split(".");
    //         const ExteValue = (splitValue[splitValue.length - 1]).toLowerCase();
    //         const CheckExteValues = ["png", "jpeg", "jpg"];

    //         if (CheckExteValues.includes(ExteValue)) {
    //             setUploadedCoverImages({ file: file, url: url })
    //             setShowError(false);
    //             setErrorMsgCoverImage("");
    //         }
    //         else {
    //             blogCoverImages.current.value = null;
    //             setShowError(true);
    //             setErrorMsgCoverImage("Uploaded Image type is not Valid");
    //             setUploadedCoverImages(null);
    //         }
    //     }
    //     else {
    //         setShowError(false);
    //         setErrorMsgCoverImage("");
    //     }
    // };

    // const handleremoveCoverImg = () => {
    //     blogCoverImages.current.value = null;
    //     setShowError(false);
    //     setErrorMsgCoverImage("");
    //     setUploadedCoverImages(null)
    // }


    // const onRemoveFileFromArray = (index) => {
    //     const uploaded: any[] = [...uploadedImages];
    //     uploaded.splice(index, 1);
    //     // console.log('uploaded',uploaded);

    //     setUploadedImages(uploaded);
    //     // console.log(inputProfileImg);

    //     // addPropertyForm.values.property_images_url.splice(index, 1);
    //     setErrorMsg("");
    //     setShowError(false);
    //     blogImages.current.value = null
    // }



    const initValues: BlogsResponse = {
        id: "",
        heading: "",
        description: "",
        link: "",
        tags: [],
        status: "",
        urls: [],
        cover_image: null,
        cover_image_name: "",
        cover_image_url: "",
        blog_pic_name: [],
        blog_pic: [],
    }
    const onSubmit = (values) => {
    };

    const validationSchema = yup.object({
        heading: yup.string().trim().required("Heading is Required"),
        description: yup.string().trim().required("Description is Required"),
        link: yup.string().trim().nullable().matches(WEBSITE_PATTERN, PLEASE_PROVIDE_VALID_LINK),
        tags: yup.array().nullable(),
        status: yup.string().nullable(),
        urls: yup.array(),
        cover_image: yup.mixed()
            .nullable()
            .notRequired(),
        blog_pic: yup.array()
            .nullable()
            .notRequired()

    });

    const addEditBlogFormData = useFormik({
        initialValues: blogData ? blogData : initValues,
        onSubmit,
        validationSchema,

    });

    const handleAddEditBlogSubmit = async ({ status: status }) => {
        addEditBlogFormData.handleSubmit();
        const addEditBlogErrors = await addEditBlogFormData.validateForm();
        // console.log(addEditBlogErrors);
        if (Object.keys(addEditBlogErrors).length > 0) {
            addEditBlogFormData.setTouched(
                setNestedObjectValues<
                    FormikTouched<FormikValues>
                >(addEditBlogErrors, true));

            return;
        }

        const reqBody = new FormData();
        let urls: any = [];
        if (!isEmptyObjectOrNullUndefiend(addEditBlogFormData.values.blog_pic)) {
            addEditBlogFormData.values.blog_pic.map((item, index) => {
                if (item) {
                    reqBody.append(`blog_pic`, item, item.name);
                }
            })
        }

        if (!isEmptyObjectOrNullUndefiend(addEditBlogFormData.values.blog_pic_name)) {
            addEditBlogFormData.values.blog_pic_name.map((item, index) => {
                if (item) {
                    urls.push(item)
                }
            })
        }

        if (!isNullUndefinedOrBlank(addEditBlogFormData.values.cover_image)) {
            reqBody.append(`cover_image`, addEditBlogFormData.values.cover_image);
        };

        if (!isNullUndefinedOrBlank(addEditBlogFormData.values.cover_image_name)) {
            urls.push(addEditBlogFormData.values.cover_image_name)
        };

        let requestValue = { ...addEditBlogFormData.values, status: status, urls: urls };
        customJsonInclude(requestValue);
        reqBody.append("blogsDetail", JSON.stringify(requestValue));

        delete addEditBlogFormData.values.blog_pic
        delete addEditBlogFormData.values.blog_pic_name
        delete addEditBlogFormData.values.cover_image_name
        delete addEditBlogFormData.values.cover_image
        // const response = await props.addEditBlogAPI(reqBody);

        // if (!isEmptyObjectOrNullUndefiend(response)) {
        //     console.log(state)
        //     navigateToRelatedScreen(ENUMFORROUTES.OUR_BLOGS, state && state.propsData)
        // }
    }
    /* -----------------------------handle upload blog images------------------------- */


    const handleFileEvent = (e: ChangeEvent<HTMLInputElement>) => {
        const chosenFiles = Array.prototype.slice.call(e.target.files)
        let flag: boolean = false;
        chosenFiles.map((key, index) => {
            if (!checkFileSize(key.size, MAX_5)) {
                flag = true
                addEditBlogFormData.setFieldError("blog_pic", "Not valid Length")
                return flag;
            } else {
                const splitValue = key?.name.split(".");
                const ExteValue = (splitValue[splitValue.length - 1]).toLowerCase();
                const CheckExteValues = ["png", "jpeg", "jpg"];

                if (CheckExteValues.includes(ExteValue)) {
                    return flag = false
                }
                else {
                    addEditBlogFormData.setFieldError("blog_pic", "Uploaded Image type is not Valid");
                    return flag = true;
                }
            }
        });

        if (!flag) {
            handleUploadFiles(chosenFiles);
        }


    };
    const handleUploadFiles = files => {
        const uploaded: any[] = addEditBlogFormData.values.blog_pic || [];
        const uploadedUrl: any[] = addEditBlogFormData.values.blog_pic_name || [];
        let limitExceeded = false;
        files.some((file) => {
            if (uploaded.findIndex((f: any) => f?.file?.name === file.name) === -1) {
                if (uploaded.length >= 10) {
                    addEditBlogFormData.errors.blog_pic = "Maximum 10 Images are allowed!";
                }
                else {
                    // let fileobj: BlogUploadedImages = {} as BlogUploadedImages;
                    // fileobj.file = file;
                    // fileobj.url = URL.createObjectURL(file);
                    // uploaded.push(fileobj);
                    uploaded.push(file);
                    uploadedUrl.push(URL.createObjectURL(file))
                    // inputProfileImg.current.value = null;
                }

            }
        })
        addEditBlogFormData.setFieldValue("blog_pic", uploaded)
        addEditBlogFormData.setFieldValue("blog_pic_name", uploadedUrl)
    };

    const handleRemoveBlogImg = (index) => {
        const uploaded: any[] = [...addEditBlogFormData.values.blog_pic || []];
        const uploadedName: any[] = [...addEditBlogFormData.values.blog_pic_name || []];
        uploaded.splice(index, 1);
        uploadedName.splice(index, 1);
        addEditBlogFormData.setFieldValue("blog_pic", uploaded);
        addEditBlogFormData.setFieldValue("blog_pic_name", uploadedName);
        blogImage.current.value = null;
        // console.log(addEditBlogFormData.errors.blog_pic)

    }

    /* ------------------------------handle Upload blog cover image--------------------------- */

    const handleUploadCoverImg = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        if (!isNullUndefinedOrBlank(file)) {

            // const fileSIzeInMb = +convertDecimalTwoPoint(file.size / (1024 ** 2));
            if (!checkFileSize(file.size, MAX_5)) {
                addEditBlogFormData.setFieldValue("cover_image", null)
                addEditBlogFormData.setFieldValue("cover_image_name", "")
                addEditBlogFormData.setFieldError("cover_image", "File size can not be exceeded than 5 mb.")
                return;
            }
            const url = URL.createObjectURL(file);
            console.log(url)
            const splitValue = file?.name.split(".");
            const ExteValue = (splitValue[splitValue.length - 1]).toLowerCase();
            const CheckExteValues = ["png", "jpeg", "jpg"];

            if (CheckExteValues.includes(ExteValue)) {
                addEditBlogFormData.setFieldValue("cover_image", file)
                addEditBlogFormData.setFieldValue("cover_image_name", file.name)
                addEditBlogFormData.setFieldValue("cover_image_url", url)
            }
            else {
                addEditBlogFormData.setFieldValue("cover_image", null)
                addEditBlogFormData.setFieldValue("cover_image_name", "")
                addEditBlogFormData.setFieldValue("cover_image_url", "")
                addEditBlogFormData.setFieldError("cover_image", "Uploaded Image type is not Valid")
            }
        }
        else {
            addEditBlogFormData.setFieldValue("cover_image", null)
            addEditBlogFormData.setFieldValue("cover_image_name", "")
            addEditBlogFormData.setFieldValue("cover_image_url", "")
        }
    };

    // useEffect(() => {
    //     if (isNullUndefinedOrBlank(addEditBlogFormData.errors?.cover_image)
    //         && !isEmptyObjectOrNullUndefiend(addEditBlogFormData?.values?.cover_image)
    //         && isNullUndefinedOrBlank(addEditBlogFormData?.values?.cover_image_name)) {
    //         addEditBlogFormData.setFieldValue("cover_image_name", addEditBlogFormData.values.cover_image[0]?.name)
    //     }
    //     return () => {

    //     }
    // }, [addEditBlogFormData.values.cover_image]);

    const handleremoveCoverImg = () => {
        addEditBlogFormData.setFieldValue("cover_image_name", "")
        addEditBlogFormData.setFieldValue("cover_image", null)
        addEditBlogFormData.setFieldValue("cover_image_url", "")
        blogCoverImage.current.value = null
    }

    /* -----------------------tags--------------------------------- */

    const handleSelectedTag = (selected) => {
        let tags: any = [];
        if ((!isNullUndefinedOrBlank(selected))) {
            selected.map((key, index) => {
                tags.push(key.label)
            })
        }
        addEditBlogFormData.setFieldValue("tags", tags)
    }

    useEffect(() => {
        if (!isNullUndefinedOrBlank(state)) {
            addEditBlogFormData.setValues({ ...state });
            setBlogData(state);
            if (!isEmptyObjectOrNullUndefiend(state.images)) {
                const images = state.images;
                let uploadedImages: any = [];
                let uploadedCoverImages: string = "";
                let uploadedCoverImagesUrl: string = "";
                images.map((item, index) => {
                    if (item.doc_type == "blog_pic") {
                        uploadedImages.push(item.url)
                    } else {
                        uploadedCoverImages = item.original_name
                        uploadedCoverImagesUrl = item.url
                    }
                });
                addEditBlogFormData.setValues({ ...state, blog_pic_name: uploadedImages, cover_image_name: uploadedCoverImages, cover_image_url: uploadedCoverImagesUrl });
            }
        }
    }, []);

    /* -----------------------------------get dropdown for tags----------------------------------- */

    const [tagForDropdownData, setTagForDropdownData] = useState<Array<DropdownListFormat>>([]);
    const getTagDropDownData = async () => {
        // const response = await props.getTagDropDownDataApi({ type: "Blog" });
        // if (response) {
        //     setTagForDropdownData(!isEmptyObjectOrNullUndefiend(response?.payload) ? response?.payload : []);
        // }

    }
    useEffect(() => {
        getTagDropDownData();
    }, [])

    /* -----------------------------------------------handle Back--------------------------------------------- */

    const handleBackToManageScreen = (route: any, data: any) => {
        if (data) {
            navigate(route, { state: data })
        }
        else {
            navigate(route)
        }
    }

    /* -------------------------------------------------handle Preview------------------------------------------ */

    const navigateToRelatedScreen = (route: any, val?: any, type?: string) => {
        if (val) {
            let dataObj = { ...val, type }
            console.log(dataObj)
            navigate(route, { state: dataObj })
        }
        else {
            navigate(route)
        }

    }

    const [handlePage, sethandlePage] = useState<string>(ENUM_FOR_BLOG_CREATE_PRIVIEW.CREATE_BLOG)

    const blogPreview = async () => {
        addEditBlogFormData.handleSubmit();
        const addEditBlogErrors = await addEditBlogFormData.validateForm();
        if (Object.keys(addEditBlogErrors).length > 0) {
            addEditBlogFormData.setTouched(
                setNestedObjectValues<
                    FormikTouched<FormikValues>
                >(addEditBlogErrors, true));
            return;
        } else {

            let image: any = []
            if (!isEmptyObjectOrNullUndefiend(addEditBlogFormData.values.blog_pic_name)) {
                addEditBlogFormData.values.blog_pic_name.map((key, index) => {
                    image.push({ doc_type: "blog_pic", url: key })
                })
            }
            if (!isNullUndefinedOrBlank(addEditBlogFormData.values.cover_image_name)) {
                image.push({ doc_type: "cover_image", url: addEditBlogFormData.values.cover_image_url, original_name: addEditBlogFormData.values.cover_image_name })
            }
            console.log(image)
            navigateToRelatedScreen(ENUMFORROUTES.SINGLE_BLOG, { ...addEditBlogFormData.values, images: image }, state?.type && "Edit");
            // let addImages: any = [];
            // if (uploadedCoverImages?.url) {
            //     console.log(uploadedCoverImages);
            //     addImages.push({ ...uploadedCoverImages, doc_type: "cover_image" })
            // }
            // if (!isEmptyObjectOrNullUndefiend(uploadedImages)) {
            //     uploadedImages.map((key, index) => {
            //         console.log();
            //         addImages.push({ ...key, doc_type: "blog_pic" })
            //     })
            // }
            // console.log(addImages);
            // let data = {
            //     ...addEditBlogFormData.values,
            //     tags: JSON.stringify(addEditBlogFormData.values.tags),
            //     type: state && state.type && state.type,
            //     author_name: addEditBlogFormData.values.author_name ? addEditBlogFormData.values.author_name : getName(),
            //     createdAt: addEditBlogFormData.values.createdAt ? addEditBlogFormData.values.createdAt : formatedDate(new Date(), "DD MMMM, YYYY"),
            //     likes: addEditBlogFormData.values.likes ? addEditBlogFormData.values.likes : 0,
            //     images: addEditBlogFormData.values.images ? addEditBlogFormData.values.images : addImages
            // }
            // console.log(data, "---data");
            // navigate(ENUMFORROUTES.SINGLE_BLOG, { state: data });

        }
    };


    console.log(state)
    return (
        <>
            <div className="page-content">
                <div className="page-content-wrapper">
                    <div className="page-breadcrumb pb-0">

                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item" onClick={() => { navigateToRelatedScreen(ENUMFORROUTES.OUR_BLOGS, state?.propsData) }}>
                                    <NavLink to="">
                                        <i className="th-outline-gift">
                                        </i>All Blogs
                                    </NavLink>
                                </li>
                                <li className={`breadcrumb-item ${handlePage === ENUM_FOR_BLOG_CREATE_PRIVIEW.CREATE_BLOG ? "active" : ""}`} aria-current="page" onClick={() => { sethandlePage(ENUM_FOR_BLOG_CREATE_PRIVIEW.CREATE_BLOG) }}>{(isNullUndefinedOrBlank(state?.type)) ? "Create New " : "Edit"} Blog</li>
                            </ol>
                        </nav>
                    </div>
                    <div className="page-title border-bottom">
                        <div className="page-title-left">
                            <div className="page-title-text">
                                <h2>{(isNullUndefinedOrBlank(state?.type)) ? "Create New " : "Edit"} Blog</h2>
                            </div>
                        </div>
                        <div className="page-title-right">
                            <Button variant="white" size='sm' className='btn-icon-start' onClick={blogPreview}> <i className='th-outline-eye'></i> Preview</Button>
                            <Button variant="secondary" size='sm' className='btn-icon-start' onClick={() => { handleAddEditBlogSubmit(!isNullUndefinedOrBlank(state.status) ? { status: state.status } : { status: "Draft" }) }}> <i className='th-outline-tick-circle'></i> Save</Button>
                            {
                                ((state?.status == "Draft") || isNullUndefinedOrBlank(state?.status)) &&
                                < Button variant="primary" size='sm' className='btn-icon-start' onClick={() => { handleAddEditBlogSubmit({ status: "Requested" }) }}> <i className='th-outline-tick-circle'></i> Send Request</Button>
                            }
                            <Button variant="icon-sm" className='btn-icon-white-outline-sm' onClick={() => { navigateToRelatedScreen(ENUMFORROUTES.OUR_BLOGS, state && state.propsData) }}> <i className='th-close'></i></Button>
                        </div>
                    </div>
                    <div className="create-charity-from">
                        <Row>
                            <Col md={8} >
                                <Form.Group className="form-group" >
                                    <Form.Label>Blog Heading</Form.Label>
                                    <Form.Control type="text" placeholder="Fight for nature protect |"  {...addEditBlogFormData.getFieldProps("heading")} />
                                    {addEditBlogFormData.touched.heading &&
                                        addEditBlogFormData.errors.heading
                                        ? renderError(addEditBlogFormData.errors.heading)
                                        : null}

                                </Form.Group>

                                {/* <Form.Group className="form-group" >
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as="textarea" rows={5} placeholder='Add detail description of charity event' {...addEditBlogFormData.getFieldProps("heading")} />
                                </Form.Group> */}
                                <Form.Group className="form-group" >
                                    <Form.Label>Description</Form.Label>
                                    <CKEditor
                                        editor={Editor as any}
                                        // data={}
                                        data={addEditBlogFormData.values.description}
                                        onReady={(editor) => {
                                            // You can store the "editor" and use when it is needed.
                                            // console.log("Editor is ready to use!", editor);
                                        }}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            addEditBlogFormData.setFieldValue("description", data);
                                            // console.log("On CHange", { event, editor, data });
                                        }}
                                        onBlur={(event, editor) => {
                                            const data = editor.getData();
                                            // console.log("Blur.", editor,data);
                                        }}
                                        onFocus={(event, editor) => {
                                            // console.log("Focus.", editor);
                                        }}


                                    />
                                    {/* <Form.Control as="textarea" rows={5} placeholder='Add detail description of Blog'{...addEditBlogFormData.getFieldProps("description")} maxLength={MAX_500} /> */}
                                    {addEditBlogFormData.touched.description &&
                                        addEditBlogFormData.errors.description
                                        ? renderError(addEditBlogFormData.errors.description)
                                        : null}


                                </Form.Group>


                                <Form.Group className="form-group file-darg-drop">
                                    <div className="form-label-action">
                                        <Form.Label>Add Image</Form.Label>
                                        <button className="text-danger" onClick={handleDeleteShow}><i className='th-outline-trash'></i></button>
                                    </div>

                          


                                    <div className="file-input-darg-drop mt-2">
                                        <div className="file-input-icon-text">
                                            <div className="file-input-icon">
                                                <i className="bi bi-upload"></i>
                                            </div>
                                            <p>Drag and Drop file here or <span>Choose file</span></p>
                                        </div>
                                        <input type="file"
                                            accept="image/png, image/jpeg,image/jpg"
                                            multiple
                                            onChange={(e) => { handleFileEvent(e) }}
                                            ref={blogImage}
                                        />
                                    </div>
                                    <div className='file-darg-drop-image-wrapper'>
                                        {(!isEmptyObjectOrNullUndefiend(addEditBlogFormData?.values?.blog_pic_name)) && (
                                            addEditBlogFormData?.values?.blog_pic_name.map((item, index) => (
                                                <div className='file-darg-drop-image' key={index}>
                                                    <img src={item} alt="" />
                                                    <button onClick={() => { handleRemoveBlogImg(index) }}> <i className='th-close'></i> </button>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                    {
                                        addEditBlogFormData.errors.blog_pic
                                            ? renderError(addEditBlogFormData.errors.blog_pic)
                                            : null}
                                </Form.Group>

                                <div className="add-blog-section">
                                    <Button variant='light-primary' className='btn-icon-start'><img src={heading} alt="heading" /> Heading</Button>
                                    <Button variant='light-primary' className='btn-icon-start'><i className='th-outline-document'></i> Description</Button>
                                    <Button variant='light-primary' className='btn-icon-start'><i className='th-outline-image'></i> Image</Button>
                                    <Button variant='light-primary' className='btn-icon-start'><i className='th-outline-video-play'></i> Video</Button>
                                </div>

                            </Col>
                            <Col md={4}>
                                <div className="create-charity-card-wrapper">
                                    {/* <Card className='paln-card'>
                                        <Card.Body >
                                            <div className="paln-card-title">
                                                <h6>STATUS</h6>
                                            </div>
                                            <Form.Group className="form-group mb-0" >
                                                <Form.Label>Blog Status</Form.Label>
                                                <Form.Select aria-label="Default select example">
                                                    <option>Publish</option>
                                                    <option value="1">One</option>
                                                    <option value="2">Two</option>
                                                    <option value="3">Three</option>
                                                </Form.Select>
                                                <Form.Text className="text-muted">
                                                    <i className='th-outline-info-circle'></i> Mange blog status here
                                                </Form.Text>
                                            </Form.Group>
                                        </Card.Body>
                                    </Card> */}
                                    <Card className='paln-card'>
                                        <Card.Body >
                                            <div className="paln-card-title">
                                                <h6>BLOG LINK</h6>
                                            </div>
                                            {/* <Form.Group className="form-group" >
                                                <Form.Label>Blog Link</Form.Label>
                                                <div className="form-control-icon icon-end">
                                                    <Form.Control type="text" placeholder="https://purecharity.au/blogs/charity" />
                                                    <i className='th-outline-copy'></i>
                                                </div>
                                            </Form.Group> */}
                                            <Form.Group className="form-group" >
                                                <Form.Label>Blog Link</Form.Label>
                                                <div className="form-control-icon icon-end">
                                                    <Form.Control type="text" placeholder="https://purecharity.au/blogs/charity"  {...addEditBlogFormData.getFieldProps("link")} />
                                                    <i className='th-outline-copy' onClick={() => { copyText(addEditBlogFormData.values.link) }}></i>
                                                </div>
                                                {addEditBlogFormData.touched.link &&
                                                    addEditBlogFormData.errors.link
                                                    ? renderError(addEditBlogFormData.errors.link)
                                                    : null}
                                            </Form.Group>
                                        </Card.Body>
                                    </Card>

                                    <Card className='paln-card'>
                                        <Card.Body >
                                            <div className="paln-card-title">
                                                <h6>TAGS</h6>
                                            </div>
                                            <Form.Group className="form-group " >
                                                <Form.Label>Blog Tags</Form.Label>
                                                <Select
                                                    options={tagForDropdownData}
                                                    onChange={(selectedOption) => {
                                                        handleSelectedTag(selectedOption)
                                                    }}
                                                    placeholder={<div>Select Tag </div>}
                                                    isClearable
                                                    value={tagForDropdownData.filter((item) => {
                                                        return (
                                                            addEditBlogFormData.values?.tags?.includes(item?.label)
                                                        );
                                                    })}
                                                    isMulti
                                                    className="react-select-container"
                                                />
                                            </Form.Group>
                                            <div className="tags-wrapper">
                                                {/* {(!isEmptyObjectOrNullUndefiend(ENUM_FOR_TAGS)) && ENUM_FOR_TAGS.map((keyArray, index) => (
                                                    (!isEmptyObjectOrNullUndefiend(addEditBlogFormData.values.tags)) && addEditBlogFormData.values?.tags?.map((key, index) => (
                                                        (key === keyArray.value) && (
                                                            <div className="tags" key={index}>{keyArray.label}</div>
                                                        )
                                                    ))

                                                ))} */}
                                                {
                                                    !isEmptyObjectOrNullUndefiend(addEditBlogFormData.values.tags) && !isEmptyObjectOrNullUndefiend(tagForDropdownData) ?
                                                        <>
                                                            <div className="tags-wrapper">
                                                                {
                                                                    tagForDropdownData.filter((val) => addEditBlogFormData.values?.tags.includes(val.label))?.map((item) => {
                                                                        return (
                                                                            <div className="tags">{!isNullUndefinedOrBlank(item?.label) ? item?.label : "-"}</div>

                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                        </>
                                                        :
                                                        <></>
                                                }

                                            </div>
                                        </Card.Body>
                                    </Card>

                                    <Card className='paln-card'>
                                        <Card.Body >
                                            <div className="paln-card-title">
                                                <h6>ADD COVER IMAGE</h6>
                                            </div>

                                            <Form.Group className="form-group file-darg-drop">
                                                {/* <Form.Label>Add Image</Form.Label> */}
                                                <div className="file-input-darg-drop">
                                                    <div className="file-input-icon-text">
                                                        <div className="file-input-icon">
                                                            <i className="bi bi-upload"></i>
                                                        </div>
                                                        <p>Drag and Drop file here or <span>Choose file</span></p>
                                                    </div>
                                                    <input type="file"
                                                        accept="image/png, image/jpeg,image/jpg"
                                                        onChange={(e) => { handleUploadCoverImg(e) }}
                                                        ref={blogCoverImage}
                                                    />

                                                </div>
                                                {
                                                    !isNullUndefinedOrBlank(addEditBlogFormData.values.cover_image_name) &&
                                                    // <>
                                                    //     <p>
                                                    //         {
                                                    //             addEditBlogFormData?.values?.cover_image_name
                                                    //         }
                                                    //     </p>
                                                    //     <button onClick={() => { handleremoveCoverImg() }}>Remove</button>
                                                    // </>


                                                    <div className="from-input-file-name">
                                                        <p>
                                                            {
                                                                addEditBlogFormData?.values?.cover_image_name
                                                            }

                                                            <i onClick={() => { handleremoveCoverImg() }} className='th-close'></i>
                                                        </p>
                                                    </div>

                                                }
                                                {
                                                    addEditBlogFormData.errors.cover_image
                                                        ? renderError(addEditBlogFormData.errors?.cover_image)
                                                        : null}
                                            </Form.Group>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div >


            <Modal show={show} onHide={handleDeleteClose} className='modal-theme modal-workspace' centered>
                <Modal.Header>
                    <Modal.Title>Delete Block</Modal.Title>
                    <Button variant="close" onClick={handleDeleteClose}><i className='th th-close'></i></Button>
                </Modal.Header>
                <Modal.Body>
                    <div className="delete-conformation">
                        <div className="delete-image">
                            <img src={delete_icon} alt="delete" />
                        </div>
                        <div className="delete-text">
                            <h3>Are you Sure?</h3>
                            <p>You want to Delete <b>“Heading”</b> Block</p>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className='justify-content-center'>
                    <Button variant="white" onClick={handleDeleteClose}>No, Change my mind</Button>
                    <Button variant="secondary">Yes, Delete Block</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {
    getTagDropDownDataApi,
    addEditBlogAPI,


}

export default connect(mapStateToProps, mapDispatchToProps)(CreateBlog)