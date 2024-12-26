import React from 'react'
import { connect } from 'react-redux'

import noRecord from '../../assets/images/no-record-found.svg'
import { isNullUndefinedOrBlank } from '../../Utility/Helper'

export const NoRecordsGrid = (props) => {
    return (
        <div className='no-record-found'>
            <div className="no-record-found-image">
                <img src={noRecord} alt="noRecord" />
            </div>
            <div className="no-record-found-text">
                {isNullUndefinedOrBlank(props.message) ?
                    <h2>No Records Found</h2>
                    :
                    <h2>{props.message}</h2>
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(NoRecordsGrid)