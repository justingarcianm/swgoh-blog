import React from 'react'
import { Link } from 'react-router-dom'

const UserArticles = props => {
    return (
        <div className="articles p-5 container-fluid">
            <h2 className="text-center">Articles</h2>
            <hr/>
            <div className="row">
        {props.user.posts.map( post => {
        const date = new Date(post.updated_at).toLocaleDateString("en-US");
            return (
                <div className="col-md-4" key={post.id}>
                <article className="article m-3">
                <Link to={{pathname:`/post/${post.id}`, state:`${post.id}`}}>
                    <img src={post.image.formats.small.url} alt={post.title} className="img-fluid" />
                    </Link>
                    <div className="article-body">
                    <Link to={{pathname:`/post/${post.id}`, state:`${post.id}`}}><h4 className="article-author">{post.title}</h4></Link>
                        <h6 className="article-date">{date}</h6>
                    </div>
                    
                </article>
                </div>
            )
        })}
            </div>
        </div>
    )
}

export default UserArticles