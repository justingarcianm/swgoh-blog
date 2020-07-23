import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'
import Loading from './Loading'
const Featured = () => (
    <Query query={gql`
    {
        posts(where:{featured:true}) {
        title
          id
          content
          updated_at
          image {
            formats
          }
          category {
              catTitle
          }
          user {
            id
            username
            userImage {
          formats
            }
          }
        }
        }
    `}>
        {
            ({ loading, error, data }) => {
                if( loading ) {
                    return <Loading/>
                }
                if( error ){
                    window.location.reload()
                    return <h2>OOPS!!!</h2>
                }
                const { title, id, updated_at, category, content, image, user } = data.posts[0]
                const date = new Date(updated_at).toLocaleDateString("en-US");
                return (
                    <div className="container" id="featured">
                    <div className="row pill">
                        <div className="col-md-6">
                        <Link to={{pathname:`/post/${id}`,state:`"${id}"`}}>
                        <img className="img-fluid featured-img" src={image.formats.small.url} alt={title}/>
                        </Link>
                        </div>
                        <div className="col-md-6">
                            <div className="featuredAuthor">
                        <h6 className="category">{category.catTitle}</h6>
                        <Link to={{pathname:`/post/${id}`,state:`"${id}"`}} className="article-title">{title}</Link>
                            <p>{content.substring(0,100) + "..."}</p>
                                <Link to={{pathname:`/author/${user.id}`, state:`${user.id}`}} className="article-author">{user.username}</Link>
                                    <h6 className="article-date">{date}</h6>
                        </div>
                        </div>
                    </div>
                    <div className="text-center pt-3">
                        <h1>Featured Post</h1>
                    </div>
                </div>
                )
            }
        }
    </Query>
)

export default Featured