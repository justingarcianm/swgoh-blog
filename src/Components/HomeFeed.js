import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Card from './Card'

import Loading from './Loading'
import LoggedInUser from './LoggedInUser'

const HomeFeed = props => (
    <Query query={gql`
    {
        posts(sort:"id:desc", limit: 10) {
            title
            content
            updated_at
            id
            category {
                catTitle
            }
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
        }      
    `}>
        {
            ({ loading, error, data }) => {
                if ( loading ) {
                    return <Loading/>
                }
                if(error) {
                    console.log(error)
                    window.location.reload();
                    return <h2>OPPS!!!</h2>
                }
                return (
                    <div id="homeFeed">
                        <h2>Latest Articles</h2>  
                        { sessionStorage.getItem("userID") ? <LoggedInUser param={props.props.location.pathname} /> : ""}

                        {data.posts.map( post => <Card key={post.id} post={post} url={post.id} />)}
                    </div>
                )
            }
        }
    </Query>
)

export default HomeFeed