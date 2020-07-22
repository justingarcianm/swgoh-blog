import React, { useState } from 'react'
import Axios from 'axios'

const CommentInput = props => {
    const [comment, setComment] = useState('')
    const config = {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
    };
    const body = {
        "commentBody": comment,
        "user": sessionStorage.getItem("userID"),
        "post": props.id
    };

    const handleSubmit = event => {
        event.preventDefault();
        if(sessionStorage.getItem("token")) {
            Axios.post('https://strapi-blog-swgoh.herokuapp.com/comments',
            body,
            config
            )
            .then(res => {
                console.log(res)
                setComment('');
                window.location.reload()
            })
            .catch( err => console.log(err))
        }
        else {
            alert("Please log in to leave a comment")
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="row">
            <div className="col-sm-9">
            
            <input 
            type="text" 
            placeholder="add comment"  
            className="form-control" 
            value={comment} 
            onChange={e => setComment(e.target.value)} 
            required
            />

            </div>
            <div className="col-sm-3">
            <button className="btn btn-dark">COMMENT</button>
            </div>
            </div>
        </form>
    )
}

export default CommentInput


