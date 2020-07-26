import React from 'react'

const Loading = props => {

    if(props.uploading) {
        return (
            <div className="d-flex align-items-center">
  <strong>Uploading...</strong>
  <div className="spinner-border ml-auto" role="status" aria-hidden="true"></div>
</div>
        )
    }

    return (
        <div className="container py-5">
        <div className="d-flex align-items-center">
        <strong>Loading...</strong>
        <div className="spinner-border ml-auto" role="status" aria-hidden="true"></div>
        </div>
        </div>
    )
}

export default Loading