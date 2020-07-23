import React from 'react'

const EditUser = props => {
    if(!sessionStorage.getItem("userID")){
        props.history.push('/')
        alert("Please Log in to Edit this User")
        return <h2>Not Authorized</h2>
    }
    return (
        <h2>EditUser</h2>
    )
}

export default EditUser