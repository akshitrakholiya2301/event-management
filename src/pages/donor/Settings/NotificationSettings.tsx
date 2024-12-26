import React, { useState } from 'react'
import { Button, Collapse, Form } from 'react-bootstrap'
import { connect } from 'react-redux'

export const NotificationSettings = (props) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="tab-from">
            <div className="tab-title">
                <h3>Settings</h3>
            </div>
            <div className="notification-settings-text">
                <h6>Notification Setting</h6>
                <p>Manage your notification settings We may still send you important notifications about your account and content outside of your preferred notification settings.</p>
            </div>

            <div className="notification-settings-card">
                <div className="notification-settings-card-wrapper">
                    <div className="notification-settings-card-icon suqare-icon icon-white">
                        <i className='th-outline-monitor'></i>
                    </div>
                    <div className="notification-settings-card-text">
                        <h6>Desktop notifications</h6>
                        <p>Receive notifications directly on my Windows</p>
                    </div>
                    <div className="notification-settings-card-button">
                        <Button size='sm' variant='white'>Enable</Button>
                    </div>
                </div>
            </div>
            <div className="notification-settings-card">
                <div className="notification-settings-card-wrapper cursor-pointer" onClick={() => setOpen(!open)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}>
                    <div className="notification-settings-card-icon suqare-icon icon-white">
                        <i className='th-outline-sms'></i>
                    </div>
                    <div className="notification-settings-card-text">
                        <h6>Email notifications</h6>
                        <p>Send me notifications via email when someone...</p>
                    </div>
                    <div className="notification-settings-card-button">
                        <i className='th-outline-arrow-down-1'></i>
                    </div>
                </div>
                <Collapse in={open}>
                    <div className="notification-settings-card-data">
                        <div className="notification-settings-checkbox-wrapper">
                            <Form.Group className="form-group" controlId="formBasicCheckbox1">
                                <Form.Check type="checkbox" label="When added new charity" />
                            </Form.Group>
                            <Form.Group className="form-group" controlId="formBasicCheckbox2">
                                <Form.Check type="checkbox" label="When add new blog" />
                            </Form.Group>
                            <Form.Group className="form-group" controlId="formBasicCheckbox3">
                                <Form.Check type="checkbox" label="Writes an update on an Item I'm the owner of" />
                            </Form.Group>
                            <Form.Group className="form-group" controlId="formBasicCheckbox4">
                                <Form.Check type="checkbox" label="Writes an update on an Item I'm subscripted to" />
                            </Form.Group>
                        </div>
                        <div className="notification-settings-checkbox-wrapper">
                            <Form.Group className="form-group" controlId="formBasicCheckbox1">
                                <Form.Check type="checkbox" label="When added new charity" />
                            </Form.Group>
                            <Form.Group className="form-group" controlId="formBasicCheckbox2">
                                <Form.Check type="checkbox" label="When add new blog" />
                            </Form.Group>
                            <Form.Group className="form-group" controlId="formBasicCheckbox3">
                                <Form.Check type="checkbox" label="Writes an update on an Item I'm the owner of" />
                            </Form.Group>
                            <Form.Group className="form-group" controlId="formBasicCheckbox4">
                                <Form.Check type="checkbox" label="Writes an update on an Item I'm subscripted to" />
                            </Form.Group>
                        </div>
                    </div>
                </Collapse>
            </div>

            <div className="button-group">
                <Button variant='primary'>Save</Button>
                <Button variant='white'>Cancel</Button>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationSettings)