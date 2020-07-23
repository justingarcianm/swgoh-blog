import React from 'react'

const EditPost = props => {
    if(!sessionStorage.getItem("userID")){
        props.history.push('/')
        alert("Please Log in to Edit this Post")
        return <h2>Not Authorized</h2>
    }
    return (
        <h2>EditPost</h2>
    )
}

export default EditPost