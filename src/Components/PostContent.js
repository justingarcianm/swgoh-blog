import React from 'react';
import { Link } from 'react-router-dom'
import Markdown from 'react-markdown'

const postContent = props => {


    const { updated_at, category, content, image, title, user } = props.post
    const date = new Date(updated_at).toLocaleDateString("en-US");
    return (
        <div id="post">
            <div className={`userBanner ${user.side.toLowerCase()}`}>
                <div className="container">
    <h1 className="display-4 text-center">{title}</h1>
    </div>
    </div>
    <div className="container">
    <div className="row ">
    <div className="col-md-3"></div>
        <div className="col-md-3 pt-5">
            <div className="row author-info">
                <div className="col-3">
                <img src={user.userImage.formats.thumbnail.url} alt={title} className="avatar" />     
                </div>
                <div className="col-9">
                <Link to={{pathname:`/author/${user.id}`, state:`${user.id}`}} className="article-author">{user.username}</Link>
                    <h6 className="article-date">{date}</h6>
                </div>
            </div>
        </div>
        <div className="col-sm-3 pt-5">
    <h3>Category: {category.catTitle}</h3>
        </div>
        <div className="col-sm-3"></div>
    </div>
    </div>
    <div className="container pb-5">
    <div className="text-center">
    <img src={image.url} alt={title} className="img-fluid my-5" />
    </div>
        <div className="postContent text-left">
        <Markdown source={content} />
        </div>
        </div>
        </div>
    )
}

export default postContent