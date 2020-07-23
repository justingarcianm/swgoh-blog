import React from 'react'

const CreatePost = props => {
    if(!sessionStorage.getItem("userID")){
        props.history.push('/')
        alert("Please Log in to Create a Post")
        return <h2>Not Authorized</h2>
    }
    return (
        <h2>CreatePost</h2>
    )
}

export default CreatePost