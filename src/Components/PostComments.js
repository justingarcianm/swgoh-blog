import React from 'react'
import { Link } from 'react-router-dom'

import CommentInput from './CommentInput'
import EditComment from './EditComment'

const postComments = props => {
    if(props.comments.length > 0){
    return (
        <div className="container">
    <h3>Comments</h3>
    <hr/>
    <CommentInput id={props.id} />
    <br/>
        {props.comments.map( comment => {
                const { id, user, commentBody, updated_at } = comment
                const date = new Date(updated_at).toLocaleDateString("en-US");
                return (
                    <div key={id} className="comment row">
                        <div className="col-1">
                        <img src={user.userImage.formats.thumbnail.url} alt={user.username} className="avatar" />
                        </div>
                        <div className="col-8">
                <Link to={{pathname:`/author/${user.id}`, state:`${user.id}`}}>{user.username}</Link> <span className="article-date"> {date}</span>
                        <p>{commentBody}</p>
                    </div>
                    <div className="col-3">
                        {sessionStorage.getItem("userID") === user.id ? <EditComment/> : ""}
                    </div>
                    </div>
                )
            })}
        </div>
    )
    }
    else {
        return (
            <div className="container">
    <h3>Comments</h3>
    <hr/>
    <CommentInput id={props.id}/>
        </div>
        )
    }
}

export default postComments