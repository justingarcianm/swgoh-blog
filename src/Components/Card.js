import React from 'react'
import { Link } from 'react-router-dom'

const Card = props => {
    const { category, content, id, image, title, updated_at, user } = props.post
    const date = new Date(updated_at).toLocaleDateString("en-US");
    return (
        <article className="article-card">
            <div className="row">
                <div className="col-md-8 order-lg-5 order-sm-7">
                    <h6 className="category">{category.catTitle}</h6>
                        <Link to={{pathname:`/post/${id}`,state:`"${id}"`}} className="article-title">{title}</Link>
                            <p>{content.substring(0,100) + "..."}</p>
                                <Link to={{pathname:`/author/${user.id}`, state:`${user.id}`}} className="article-author">{user.username}</Link>
                                    <h6 className="article-date">{date}</h6>
                </div>
                <div className="col-md-4 order-lg-7 order-sm-5">
                    <Link to={{pathname:`/post/${id}`,state:`"${id}"`}}>
                        <img className="img-fluid" src={image.formats.small.url} alt={title}/>
                    </Link>
                </div>
            </div>
        </article>
    )
}

export default Card