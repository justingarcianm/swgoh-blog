import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const LoggedInUser = props => {
    const { param } = props
    const id = sessionStorage.getItem("userID")
    
    if(param.includes("author") && !props.blog) {

        const toggleEdit = () => props.editing();

        return (
            <Fragment>
        <button onClick={toggleEdit} className="btn btn-warning m-1">Edit Profile</button>
        <Link to={{pathname:`/create-post/${id}`, state:`${id}`}} className="btn btn-success m-1">New Post</Link>
        </Fragment>
        )
    }
    if(param.includes("post") || props.blog ){
        return <Link to={{pathname:`/edit-post/${props.postID}`, state:`${props.postID}`}} className="btn btn-warning m-1">Edit Post</Link>
    }
    if(!param.includes("author") && !param.includes("post")) {
        return <Link to={{pathname:`/create-post/${id}`, state:`${id}`}} className="btn btn-success m-1">New Post</Link>
    }
    
}

export default LoggedInUser