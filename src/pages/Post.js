import React, { Fragment } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import PostRelated from '../Components/PostRelated'
import PostContent from '../Components/PostContent'
import PostComments from '../Components/PostComments'
import Loading from '../Components/Loading'
import Header from '../Components/Header'

const Post = props => (
<Query query={gql`
{
    post(id:${props.match.params.slug || props.location.state}){
      updated_at
      title
      id
      content
      image {
        url
      }
      category {
        catTitle
        id
      }
      user {
        id
        username
        side
        userImage {
          formats
        }
      }
      comments {
        commentBody
        id
        updated_at
        user {
          id
          updated_at
          username
          userImage {
            formats
          }
        }
      }
    }
  }
`}>
   {
       ({ loading, data }) => {
           if ( loading ){
               return <Loading />
           }
           return(
               <Fragment>
                 <Header props={props}/>
                   <PostContent post={data.post} />
                   <PostComments comments={data.post.comments} id={props.match.params.slug || props.location.state}/>
                   <PostRelated related={data.post.category} />
                   </Fragment>
           )
       }
   }
</Query>
)

export default Post