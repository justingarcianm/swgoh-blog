import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'

import Loading from '../Components/Loading'

const PostRelated = props => (
    <Query query={gql`
    {
        posts(where: { category : {id:${props.related.id} } }, limit: 3, sort:"id:desc") {
          title
          updated_at
          id
          image {
              formats
          }
          user {
            username
            id
            userImage {
                formats
            }
        }
    }
    category(id:${props.related.id}){
        catTitle
        id
        }
      }
    `}>
        {
            ({ loading, data }) => {
                if( loading ) {
                    return <Loading/>
                }
                return (
                    <div className="container py-5">
                        <h3>Articles related to: {data.category.catTitle}</h3>
                <hr/>
                <div className="related-articles">
                    <div className="row">
                        {data.posts.map( post => {
                            const { id, user, updated_at, image, title } = post
                            const date = new Date(updated_at).toLocaleDateString("en-US");
                            return (
                                <div className="col-md-4" key={id}>
                                    <article className="related">
                                        <Link to={{pathname:`/post/${id}`,state:`${id}`}}>
                                        <img src={image.formats.small.url} alt={title} className="img-fluid"/>
                                                    <h3>{title}</h3>
                                        </Link>
                            <div className="row">
                                <div className="col-2">
                                    <img src={user.userImage.formats.thumbnail.url} alt={user.username} className="avatar" />
                                </div>
                                <div className="col-10">
                                <Link to={{pathname:`/author/${user.id}`, state:`${user.id}`}} className="article-author">{user.username}</Link>
                                    <h6 className="article-date">{date}</h6>
                                </div>
                            </div>
                                    </article>
                                </div>
                            )
                        })}
                    </div>
                </div>
                    </div>
                )
            }
        }
    </Query>
)

export default PostRelated