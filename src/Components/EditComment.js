import React, { Fragment, useState } from 'react'

const EditComment = () => {
const [ state, setState ] = useState({
    toggleEdit:false
})

    if (state.toggleEdit) {
        return (
            <Fragment>
                <button className="btn btn-danger">DELETE</button>
            <button className="btn btn-success">UPDATE</button>
            </Fragment>
        )
    }
    return (
        <Fragment>
            <button className="btn btn-warning" >EDIT</button>
        </Fragment>
    )
}

export default EditComment