import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { connect } from 'react-redux'

const LanguageRegion = (props) => {
    return (
        <div className="tab-from">
            <div className="tab-title">
                <h3>Language & Region</h3>
            </div>
            <div className="language-region">
                <Form.Group className="form-group">
                    <Form.Label>Language</Form.Label>
                    <Form.Select >
                        <option>English</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="form-group">
                    <Form.Label>Timezone</Form.Label>
                    <Form.Select >
                        <option>(GMT+OS:OO) Ekatennburg</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="form-group">
                    <Form.Label>Time format</Form.Label>
                    <div className='radio-group radio-group-button radio-button-square'>
                        <div className="radio-button active">
                            <Form.Check type="radio" name="time-format" aria-label="time-format1" id="12hours" label="12 Hours 06:18 PM" value='donationamount1' checked />
                        </div>
                        <div className="radio-button ">
                            <Form.Check type="radio" name="time-format" aria-label="time-format2" id="24hours" label="24 Hours 18:18" value='donationamount1' />
                        </div>
                    </div>
                </Form.Group>

                <div className="button-group">
                    <Button variant='primary'>Save</Button>
                    <Button variant='white'>Cancel</Button>
                </div>

            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(LanguageRegion)