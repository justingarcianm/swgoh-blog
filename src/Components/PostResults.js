import React, { Fragment } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'

import Loading from './Loading'

const PostResults = props => (
    <Query query={gql`
    {
        posts(where: { title_contains: "${props.data.match.params.slug || props.data.location.state}" }) {
            title
            id
            image {
                formats
            }
            category {
                catTitle
            }
            updated_at
            user {
                username
                id
                userImage {
                    formats
                }
            }
        }
    }
    `}>
        {
            ({ loading, data }) => {
                if( loading ) {
                    return <Loading />
                }
                if(!data.posts) {
                    return (
                        <div className="container pt-3">
                            <h3 style={{  textDecoration: "line-through"}}>No Posts Found</h3>
                        </div>
                    )
                }
                
                return (
                    <Fragment>
                        <h2>Posts</h2>
                        <hr/>
                        {data.posts.map( post => {
                            const { title, category, image, updated_at, user, id } = post
                            const date = new Date(updated_at).toLocaleDateString("en-US");
                            return (
                                <div className="postResult" key={id}>
                                    <Link to={{pathname:`/post/${id}`,state:`${id}`}}>
                                    <img src={image.formats.small.url} alt={title} className="img-fluid"/>
                                    </Link>
                                    <div className="postResultBody">
                                        <Link to={{pathname:`/post/${id}`,state:`${id}`}}><h3>{title}</h3></Link>
                                        <div className="row">
                                            <div className="col-2">
                                                <img src={user.userImage.formats.thumbnail.url} alt={user.username} className="avatar"/>
                                            </div>
                                            <div className="col-6 my-auto">
                                            <Link to={{pathname:`/author/${user.id}`,state:`${user.id}`}}>
                                            <h5>{user.username}</h5>
                                            </Link>
                                                <h6>{date}</h6>
                                            </div>
                                            <div className="col-4">
                                                <h5 className="category">{category.catTitle}</h5>
                                            </div>
                                        </div>
                            
                                    </div>
                                </div>
                            )
                        })}
                    </Fragment>
                    
                )
            }
        }
    </Query>
)

export default PostResults