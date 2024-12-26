import React from 'react'
import { connect } from 'react-redux'
import visa from '../../../assets/images/visa-card.svg'
import master from '../../../assets/images/master-card.svg'
import { Button } from 'react-bootstrap'

const PaymentMethod = (props) => {
    return (
        <>
            <div className="tab-from">
                <div className="tab-title">
                    <h3>Payment Method</h3>
                </div>
            </div>
            <div className="payment-card-wrapper">
                <h6>Saved Cards</h6>

                <div className="saved-card">
                    <div className="saved-card-item">
                        <div className="saved-card-title">
                            <h6>Card Details</h6>
                        </div>
                        <div className="saved-card-data">
                            <p> <img src={visa} alt="" /> **** **** **** 8545</p>
                        </div>
                    </div>
                    <div className="saved-card-item">
                        <div className="saved-card-title">
                            <h6>Name on the card</h6>
                        </div>
                        <div className="saved-card-data">
                            <p>jessica J.</p>
                        </div>
                    </div>
                    <div className="saved-card-item">
                        <div className="saved-card-title">
                            <h6>Expiring</h6>
                        </div>
                        <div className="saved-card-data">
                            <p>04/2027</p>
                        </div>
                    </div>
                    <div className="saved-card-item gap-2 d-flex">
                        <Button variant="icon-sm" className='btn-icon-white-sm' > <i className='th-outline-edit-2'></i></Button>
                        <Button variant="icon-sm" className='btn-icon-white-sm' > <i className='th-outline-trash text-danger'></i></Button>
                    </div>
                </div>
                <div className="saved-card">
                    <div className="saved-card-item">
                        <div className="saved-card-title">
                            <h6>Card Details</h6>
                        </div>
                        <div className="saved-card-data">
                            <p> <img src={master} alt="" /> **** **** **** 5855</p>
                        </div>
                    </div>
                    <div className="saved-card-item">
                        <div className="saved-card-title">
                            <h6>Name on the card</h6>
                        </div>
                        <div className="saved-card-data">
                            <p>jessica Johns</p>
                        </div>
                    </div>
                    <div className="saved-card-item">
                        <div className="saved-card-title">
                            <h6>Expiring</h6>
                        </div>
                        <div className="saved-card-data">
                            <p>12/2029</p>
                        </div>
                    </div>
                    <div className="saved-card-item gap-2 d-flex">
                        <Button variant="icon-sm" className='btn-icon-white-sm' > <i className='th-outline-edit-2'></i></Button>
                        <Button variant="icon-sm" className='btn-icon-white-sm' > <i className='th-outline-trash text-danger'></i></Button>
                    </div>
                </div>
                <div className="button-group">
                    <Button variant='white' className='btn-icon-start'> <i className='th-outline-add-circle'></i> Add Another</Button>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentMethod)