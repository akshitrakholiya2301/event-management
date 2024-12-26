import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Button, Card, Col, Collapse, Dropdown, Form, Modal, OverlayTrigger, ProgressBar, Row, Table, Tooltip } from 'react-bootstrap'
import bgCover from '../../../assets/images/cover-image-2.png'
import cancerFight from '../../../assets/images/cancer-fight.svg'
import defaultAvatar2 from '../../../assets/images/avatar-default2.png'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import blogImage from '../../../assets/images/blog.png'
import card from "../../../assets/images/card.svg";
import paypal from "../../../assets/images/paypal.svg";
import stripe from "../../../assets/images/stripe.svg";
import thankyou from "../../../assets/images/thankyou.svg";
import { CharityResponse, ENUMFORROUTES } from '../../../interfaces/interface'
import { useStateManager } from 'react-select'
import { formatedDate, isEmptyObjectOrNullUndefiend, isNullUndefinedOrBlank } from '../../../Utility/Helper'
import NoRecordsGrid from '../../../components/NoRecordsFound/NoRecordsGrid'

const AllCharityDetails = (props) => {
    const [open, setOpen] = useState(false);


    const [showOnceDonation, setOnceDonationShow] = useState(false);
    const handleOnceDonationClose = () => setOnceDonationShow(false);
    const handleOnceDonationShow = () => setOnceDonationShow(true);

    const [showMonthlyDonation, setMonthlyDonationShow] = useState(false);
    const handleMonthlyDonationClose = () => setMonthlyDonationShow(false);
    const handleMonthlyDonationShow = () => setMonthlyDonationShow(true);

    const { state } = useLocation();
    const [charityData, setCharityData] = useState<CharityResponse>({} as CharityResponse);



    useEffect(() => {
        setCharityData(state)
    }, [state])


    const navigate = useNavigate();
    const navigateToRelatedScreen = (route: any, val?: any) => {
        if (val) {
            navigate(route, { state: val })
        }
        else {
            navigate(route)
        }

    }

    return (

        <>
            <div className="page-content">
                <div className="page-content-wrapper">
                    <div className="page-header">

                        <div className="page-cover-image">
                            <img src={bgCover} alt="bgCover" />
                        </div>
                        <div className="page-back">
                            <Button variant="white" size='sm' className='btn-icon-start' onClick={() => { navigateToRelatedScreen(ENUMFORROUTES.All_CHARITY) }}> <i className='th-outline-arrow-left'></i> Back</Button>
                        </div>



                        {
                            !isEmptyObjectOrNullUndefiend(charityData.images) && charityData.images.some(val => val.doc_type === "icon_pic") ?
                                charityData.images.filter(val => val.doc_type === "icon_pic").map((val, index) => (
                                    // <div className="charity-icon">
                                    //     <img src={val.url} alt="cancerFight" />
                                    // </div>
                                    <div className="charity-details-profile">
                                        <div className="charity-details-profile-edit">
                                            <div className="charity-image">
                                                <img src={val.url} alt="cancerFight" />
                                            </div>
                                        </div>
                                    </div>

                                )) :
                                <div className="charity-details-profile">
                                    <div className="charity-details-profile-edit">
                                        <div className="charity-icon">
                                            <img src={cancerFight} alt="cancerFight" />
                                        </div>
                                    </div>
                                </div>
                        }






                    </div>
                    <div className="single-charity-details">

                        <div className="single-charity-content">
                            <div className="single-charity-content-left">
                                <div className="single-charity-text">
                                    <h2 className='mb-0'>Fundraise for {!isNullUndefinedOrBlank(charityData) && charityData.charity_name}</h2>
                                    {/* <p>Lorem Ipsum is simply dummy text of the printing and</p> */}
                                </div>
                            </div>
                            <div className="single-charity-content-right">
                            </div>
                        </div>
                    </div>

                    <div className="requested-charity-details">
                        <Row>
                            <Col md={8}>
                                <div className="requested-charity-details-text">
                                    <div dangerouslySetInnerHTML={{ __html: (!isNullUndefinedOrBlank(charityData.description)) ? charityData.description : <>-</> as any }}>
                                    </div>
                                    <Button variant='link' className='btn-icon-end'>Read More <i className='th-outline-arrow-right-3'></i></Button>
                                </div>
                                {/* <div className="requested-your-impact">
                                    <h6>Your Impact</h6>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                    <ul className='icon-list'>
                                        <li>Lorem Ipsum is simply dummy text</li>
                                        <li>Lorem Ipsum is simply dummy text of the printing</li>
                                        <li>Lorem Ipsum is simply dummy text of the printing</li>
                                        <li>Lorem Ipsum is simply dummy text of the printing</li>
                                    </ul>
                                </div> */}
                                {
                                    !isEmptyObjectOrNullUndefiend(charityData.blogsData) ?
                                        <>
                                            <div className="donor-details-charity-blog">
                                                <div className="donor-details-charity-blog-title" onClick={() => setOpen(!open)}
                                                    aria-controls="example-collapse-text"
                                                    aria-expanded={open}>
                                                    <div className="donor-details-charity-blog-title-left">
                                                        <div className="donor-details-charity-blog-text">
                                                            <i className='th-outline-arrow-down-1'></i> Charity Blogs
                                                        </div>
                                                    </div>
                                                    {
                                                        charityData?.blogsData && charityData?.blogsData?.length > 1 ?
                                                            <div className="donor-details-charity-blog-title-right">
                                                                <Button variant='white' size='sm' onClick={() => { setOpen(true) }}>View All</Button>
                                                            </div>
                                                            :
                                                            <div></div>
                                                    }
                                                </div>


                                                <div id="example-collapse-text">
                                                    <div className="blogs-gird">
                                                        <Row>
                                                            {

                                                                charityData?.blogsData?.map((item, index) => (

                                                                    < Col md={4} key={index} className={`${!open && index > 2 ? "d-none" : ""}`}>
                                                                        <div className="blogs-card">
                                                                            {
                                                                                !isEmptyObjectOrNullUndefiend(item.other.images) && item.other.images.some(val => val.doc_type === "cover_image") ?
                                                                                    item.other.images.filter(val => val.doc_type === "cover_image").map((val, index) => (
                                                                                        <div className="blogs-image" key={index}>
                                                                                            <img src={val.url} alt="blogImage" />
                                                                                        </div>

                                                                                    )) :

                                                                                    <div className="blogs-image">
                                                                                        <img src={blogImage} alt="blogImage" />
                                                                                    </div>
                                                                            }

                                                                            <div className="blogs-text">
                                                                                <h6>{!isNullUndefinedOrBlank(item.label) ? item.label : "-"}</h6>
                                                                                <div dangerouslySetInnerHTML={{ __html: (!isNullUndefinedOrBlank(item.other.description)) ? item.other.description : <>-</> as any }}>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </Col>
                                                                ))

                                                            }
                                                            {/* <Col md={4}>
                                                        <div className="blogs-card">
                                                            <div className="blogs-image">
                                                                <img src={blogImage} alt="blogImage" />
                                                            </div>
                                                            <div className="blogs-text">
                                                                <h6>Dr Nicolas Cage: Making a difference for dads everywhere</h6>
                                                                <p>Dr. nicolas cage is doing everything he can to improve the outlook for childhood cancer patients.</p>
                                                            </div>

                                                        </div>
                                                    </Col>
                                                    <Col md={4}>
                                                        <div className="blogs-card">
                                                            <div className="blogs-image">
                                                                <img src={blogImage} alt="blogImage" />
                                                            </div>
                                                            <div className="blogs-text">
                                                                <h6>Dr Nicolas Cage: Making a difference for dads everywhere</h6>
                                                                <p>Dr. nicolas cage is doing everything he can to improve the outlook for childhood cancer patients.</p>
                                                            </div>

                                                        </div>
                                                    </Col> */}
                                                        </Row>
                                                    </div>
                                                </div>
                                                {/* <Collapse in={open}>
                                                <div id="example-collapse-text">
                                                    <Row>
                                                        <Col md={4}>
                                                            <div className="blogs-card">
                                                                <div className="blogs-image">
                                                                    <img src={blogImage} alt="blogImage" />
                                                                </div>
                                                                <div className="blogs-text">
                                                                    <h6>Dr Nicolas Cage: Making a difference for dads everywhere</h6>
                                                                    <p>Dr. nicolas cage is doing everything he can to improve the outlook for childhood cancer patients.</p>
                                                                </div>

                                                            </div>
                                                        </Col>
                                                        <Col md={4}>
                                                            <div className="blogs-card">
                                                                <div className="blogs-image">
                                                                    <img src={blogImage} alt="blogImage" />
                                                                </div>
                                                                <div className="blogs-text">
                                                                    <h6>Dr Nicolas Cage: Making a difference for dads everywhere</h6>
                                                                    <p>Dr. nicolas cage is doing everything he can to improve the outlook for childhood cancer patients.</p>
                                                                </div>

                                                            </div>
                                                        </Col>
                                                        <Col md={4}>
                                                            <div className="blogs-card">
                                                                <div className="blogs-image">
                                                                    <img src={blogImage} alt="blogImage" />
                                                                </div>
                                                                <div className="blogs-text">
                                                                    <h6>Dr Nicolas Cage: Making a difference for dads everywhere</h6>
                                                                    <p>Dr. nicolas cage is doing everything he can to improve the outlook for childhood cancer patients.</p>
                                                                </div>

                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Collapse> */}
                                            </div>
                                        </>
                                        :
                                        <div>
                                            <NoRecordsGrid message={"No Blogs Found"} />
                                        </div>
                                }

                            </Col>
                            <Col md={4}>
                                <Card className='paln-card all-charity-details-card'>
                                    <Card.Body>
                                        <div className="donor-all-charity-details-card">
                                            <div className="donor-all-charity-details-user-data">
                                                <div className="donor-all-charity-details-user-data-left">
                                                    <div className="charity-details-user-data-text">
                                                        <h4>${!isNullUndefinedOrBlank(charityData?.monthly_amount) ? charityData?.monthly_amount : "0"} <span>/month</span></h4>
                                                        <p>0 People Already Donate</p>
                                                    </div>
                                                </div>
                                                <div className="donor-all-charity-details-user-data-right">
                                                    <div className="donor-userprofile-charity">
                                                        <img src={defaultAvatar2} alt="defaultAvatar2" />
                                                        <div className="donor-icon-userprofile">
                                                            <i className='th-bold-heart'></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="donor-raised-card">
                                                <div className="donor-raised-card-wrapper">
                                                    <div className="donor-raised-card-left">
                                                        <div className="donor-raised-card-text">
                                                            <p className='mb-0'>Raised</p>
                                                            <h5 className='mb-0'>${!isNullUndefinedOrBlank(charityData?.collected_amount) ? charityData?.collected_amount : "0"}</h5>
                                                        </div>
                                                    </div>
                                                    <div className="donor-raised-card-right">
                                                        <div className="donor-raised-card-text text-end">
                                                            <p className='mb-0'>Target</p>
                                                            <h5 className='mb-0'>${!isNullUndefinedOrBlank(charityData?.goal_amount) ? charityData?.goal_amount : "0"}</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                                <ProgressBar variant="success" now={!isNullUndefinedOrBlank(charityData?.goal_amount) && !isNullUndefinedOrBlank(charityData?.collected_amount) ? ((charityData?.collected_amount * 100) / charityData?.goal_amount) : 0} />
                                            </div>
                                            <div className="donor-all-charity-user-payment-date">
                                                <p>Start Date <span>{!isNullUndefinedOrBlank(charityData?.createdAt) ? formatedDate(charityData?.createdAt, "DD MMMM, YYYY") : "-"}</span></p>
                                                <p>End Date <span>Lifetime</span></p>
                                            </div>
                                            <div className="donor-all-charity-details">
                                                <Button variant='primary' onClick={handleMonthlyDonationShow}>Donate Now</Button>
                                                <Button variant='outline-primary' onClick={handleOnceDonationShow}>Once Donation</Button>
                                                <NavLink to="" className="normal-link"> <i className='th-outline-flag-2'></i> Need Help!</NavLink>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </div>




                </div>
            </div >

            <Modal show={showMonthlyDonation} size="lg" onHide={handleMonthlyDonationClose} className='modal-theme modal-workspace' centered>
                <Modal.Header>
                    <Modal.Title>Make Donation</Modal.Title>
                    <Button variant="close" onClick={handleMonthlyDonationClose}><i className='th th-close'></i></Button>
                </Modal.Header>
                <Modal.Body>
                    <div className="donet-now-form">
                        <div className="donet-now-form-title">
                            <div className="donet-now-stepper">
                                <ul>
                                    <li className='active'>
                                        <div className="stapper-indiacator"></div>
                                        <p>I like too donate</p>
                                    </li>
                                    <li>
                                        <div className="stapper-indiacator"></div>
                                        <p>Payment Details</p>
                                    </li>
                                    <li>
                                        <div className="stapper-indiacator"></div>
                                        <p>Confirmation</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="donet-now-data-wrapper ">
                            <div className="donet-now">
                                <h2>I love to monthly donate</h2>
                                <p>Choose your position on your company or role</p>
                            </div>
                            <div className="donet-now-data">
                                <div className='radio-group radio-group-button'>
                                    <div className="radio-button active">
                                        <Form.Check type="radio" name="donation_amount" aria-label="radio 1" id="Individual" label="$20" value='donationamount1' checked />
                                    </div>
                                    <div className="radio-button ">
                                        <Form.Check type="radio" name="donation_amount" aria-label="radio 1" id="Individual" label="$50" value='donationamount1' />
                                    </div>
                                    <div className="radio-button ">
                                        <Form.Check type="radio" name="donation_amount" aria-label="radio 1" id="Individual" label="$75" value='donationamount1' />
                                    </div>
                                    <div className="radio-button ">
                                        <Form.Check type="radio" name="donation_amount" aria-label="radio 1" id="Individual" label="$100" value='donationamount1' />
                                    </div>
                                    <div className="radio-button">
                                        <Form.Check type="radio" name="donation_amount" aria-label="radio 1" id="Individual" label="Manual Amount" value='donationamount1' />
                                    </div>
                                </div>
                                <Form.Group className="form-group">
                                    <Form.Label>Enter Amount</Form.Label>
                                    <div className="form-control-icon icon-start">
                                        <i className='th-outline-dollar-circle'></i>
                                        <Form.Control type="text" placeholder="500" />
                                    </div>
                                </Form.Group>
                            </div>
                            <div className="donet-now-footer">
                                <Button variant='white' className='btn-icon-start'> <i className='th-outline-arrow-left-2'></i> Back</Button>
                                <Button variant='primary'>Continue</Button>
                            </div>
                        </div>
                        <div className="donet-now-data-wrapper d-none">
                            <div className="donet-now">
                                <h2>Payment Details</h2>
                                <p>Choose payment method you want to pay</p>
                            </div>
                            <div className="donet-now-data">
                                <div className="normal-tab">

                                    <ul className="nav nav-pills " id="pills-tab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true"> <img src={card} alt="card" /> Credit Card</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false"><img src={paypal} alt="paypal" />PayPal</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false"><img src={stripe} alt="stripe" />Stripe</button>
                                        </li>
                                    </ul>
                                    <div className="tab-content" id="pills-tabContent">
                                        <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                            <div className="tab-data">
                                                <Form.Group className="form-group">
                                                    <Form.Label>Name on Card*</Form.Label>
                                                    <div className="form-control-icon icon-start">
                                                        <i className='th-outline-user'></i>
                                                        <Form.Control type="text" placeholder="Enter name" />
                                                    </div>

                                                </Form.Group>
                                                <Form.Group className="form-group">
                                                    <Form.Label>Card Number*</Form.Label>
                                                    <div className="form-control-icon icon-start">
                                                        <i className='th-outline-card'></i>
                                                        <Form.Control type="text" placeholder="Enter card no" />
                                                    </div>

                                                </Form.Group>
                                                <Row>
                                                    <Col md={8}>
                                                        <Form.Group className="form-group">
                                                            <Form.Label>Expiry*</Form.Label>
                                                            <Form.Control type="text" placeholder="MM/YY" />
                                                        </Form.Group>

                                                    </Col>
                                                    <Col md={4}>
                                                        <Form.Group className="form-group">
                                                            <Form.Label>CVV</Form.Label>
                                                            <Form.Control type="text" placeholder="" />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Form.Group className="" >
                                                    <Form.Check type="checkbox" label="i Agree to save my Card Details for future donation" />
                                                </Form.Group>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                            <div className="tab-data">
                                                <div className="payment-info">
                                                    <div className="payment-icon">
                                                        <img src={paypal} alt="paypal" />
                                                    </div>
                                                    <div className="payment-text">
                                                        <h3>PayPal</h3>
                                                        <p>This is detail description about hoe paypal work! It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960.</p>
                                                        <Button variant='primary' className='btn-icon-end'>Connect PayPal <i className='th-outline-arrow-right-3'></i></Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                                            <div className="tab-data">
                                                <div className="payment-info">
                                                    <div className="payment-icon">
                                                        <img src={stripe} alt="paypal" />
                                                    </div>
                                                    <div className="payment-text">
                                                        <h3>PayPal</h3>
                                                        <p>This is detail description about hoe paypal work! It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960.</p>
                                                        <Button variant='primary' className='btn-icon-end'>Connect Stripe <i className='th-outline-arrow-right-3'></i></Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="donet-now-footer">
                                <Button variant='white' className='btn-icon-start'> <i className='th-outline-arrow-left-2'></i> Back</Button>
                                <Button variant='primary'>Continue</Button>
                            </div>
                        </div>
                        <div className="donet-now-data-wrapper d-none">
                            <div className="donet-now-data">
                                <div className="thankyou">
                                    <img src={thankyou} alt="thankyou" />
                                    <div className="thankyou-text">
                                        <h2>Thank You!</h2>
                                        <p>For choosing us for donation you want to <br /> do nothing to say here.</p>
                                    </div>
                                    <div className="button-group">
                                        <Button variant='white'>Explore Charity</Button>
                                        <Button variant='primary' className='btn-icon-end'>Go to Dashboard <i className='th-outline-arrow-right-3'></i></Button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <Modal show={showOnceDonation} size="lg" onHide={handleOnceDonationClose} className='modal-theme modal-workspace' centered>
                <Modal.Header>
                    <Modal.Title>Make Donation</Modal.Title>
                    <Button variant="close" onClick={handleOnceDonationClose}><i className='th th-close'></i></Button>
                </Modal.Header>
                <Modal.Body>
                    <div className="donet-now-form">
                        <div className="donet-now-form-title">
                            <div className="donet-now-stepper">
                                <ul>
                                    <li className='active'>
                                        <div className="stapper-indiacator"></div>
                                        <p>I like too donate</p>
                                    </li>
                                    <li>
                                        <div className="stapper-indiacator"></div>
                                        <p>Payment Details</p>
                                    </li>
                                    <li>
                                        <div className="stapper-indiacator"></div>
                                        <p>Confirmation</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="donet-now-data-wrapper ">
                            <div className="donet-now">
                                <h2>I love to Once Donation</h2>
                                <p>Choose donation amount you want to do</p>
                            </div>
                            <div className="donet-now-data">
                                <div className='radio-group radio-group-button'>
                                    <div className="radio-button active">
                                        <Form.Check type="radio" name="donation_amount" aria-label="radio 1" id="Individual" label="$55" value='donationamount1' checked />
                                    </div>
                                    <div className="radio-button ">
                                        <Form.Check type="radio" name="donation_amount" aria-label="radio 1" id="Individual" label="$75" value='donationamount1' />
                                    </div>
                                    <div className="radio-button ">
                                        <Form.Check type="radio" name="donation_amount" aria-label="radio 1" id="Individual" label="$150" value='donationamount1' />
                                    </div>
                                    <div className="radio-button ">
                                        <Form.Check type="radio" name="donation_amount" aria-label="radio 1" id="Individual" label="$200" value='donationamount1' />
                                    </div>
                                    <div className="radio-button ">
                                        <Form.Check type="radio" name="donation_amount" aria-label="radio 1" id="Individual" label="$500" value='donationamount1' />
                                    </div>
                                    <div className="radio-button">
                                        <Form.Check type="radio" name="donation_amount" aria-label="radio 1" id="Individual" label="Manual Amount" value='donationamount1' />
                                    </div>
                                </div>
                                <Form.Group className="form-group">
                                    <Form.Label>Enter Amount</Form.Label>
                                    <div className="form-control-icon icon-start">
                                        <i className='th-outline-dollar-circle'></i>
                                        <Form.Control type="text" placeholder="500" />
                                    </div>
                                </Form.Group>
                            </div>
                            <div className="donet-now-footer">
                                <Button variant='white' className='btn-icon-start'> <i className='th-outline-arrow-left-2'></i> Back</Button>
                                <Button variant='primary'>Continue</Button>
                            </div>
                        </div>
                        <div className="donet-now-data-wrapper d-none">
                            <div className="donet-now">
                                <h2>Payment Details</h2>
                                <p>Choose payment method you want to pay</p>
                            </div>
                            <div className="donet-now-data">
                                <div className="normal-tab">

                                    <ul className="nav nav-pills " id="pills-tab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true"> <img src={card} alt="card" /> Credit Card</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false"><img src={paypal} alt="paypal" />PayPal</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false"><img src={stripe} alt="stripe" />Stripe</button>
                                        </li>
                                    </ul>
                                    <div className="tab-content" id="pills-tabContent">
                                        <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                            <div className="tab-data">
                                                <Form.Group className="form-group">
                                                    <Form.Label>Name on Card*</Form.Label>
                                                    <div className="form-control-icon icon-start">
                                                        <i className='th-outline-user'></i>
                                                        <Form.Control type="text" placeholder="Enter name" />
                                                    </div>

                                                </Form.Group>
                                                <Form.Group className="form-group">
                                                    <Form.Label>Card Number*</Form.Label>
                                                    <div className="form-control-icon icon-start">
                                                        <i className='th-outline-card'></i>
                                                        <Form.Control type="text" placeholder="Enter card no" />
                                                    </div>

                                                </Form.Group>
                                                <Row>
                                                    <Col md={8}>
                                                        <Form.Group className="form-group">
                                                            <Form.Label>Expiry*</Form.Label>
                                                            <Form.Control type="text" placeholder="MM/YY" />
                                                        </Form.Group>

                                                    </Col>
                                                    <Col md={4}>
                                                        <Form.Group className="form-group">
                                                            <Form.Label>CVV</Form.Label>
                                                            <Form.Control type="text" placeholder="" />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Form.Group className="" >
                                                    <Form.Check type="checkbox" label="i Agree to save my Card Details for future donation" />
                                                </Form.Group>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                            <div className="tab-data">
                                                <div className="payment-info">
                                                    <div className="payment-icon">
                                                        <img src={paypal} alt="paypal" />
                                                    </div>
                                                    <div className="payment-text">
                                                        <h3>PayPal</h3>
                                                        <p>This is detail description about hoe paypal work! It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960.</p>
                                                        <Button variant='primary' className='btn-icon-end'>Connect PayPal <i className='th-outline-arrow-right-3'></i></Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                                            <div className="tab-data">
                                                <div className="payment-info">
                                                    <div className="payment-icon">
                                                        <img src={stripe} alt="paypal" />
                                                    </div>
                                                    <div className="payment-text">
                                                        <h3>PayPal</h3>
                                                        <p>This is detail description about hoe paypal work! It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960.</p>
                                                        <Button variant='primary' className='btn-icon-end'>Connect Stripe <i className='th-outline-arrow-right-3'></i></Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="donet-now-footer">
                                <Button variant='white' className='btn-icon-start'> <i className='th-outline-arrow-left-2'></i> Back</Button>
                                <Button variant='primary'>Continue</Button>
                            </div>
                        </div>
                        <div className="donet-now-data-wrapper d-none">
                            <div className="donet-now-data">
                                <div className="thankyou">
                                    <img src={thankyou} alt="thankyou" />
                                    <div className="thankyou-text">
                                        <h2>Thank You!</h2>
                                        <p>For choosing us for donation you want to <br /> do nothing to say here.</p>
                                    </div>
                                    <div className="button-group">
                                        <Button variant='white'>Explore Charity</Button>
                                        <Button variant='primary' className='btn-icon-end'>Go to Dashboard <i className='th-outline-arrow-right-3'></i></Button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>

    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(AllCharityDetails)