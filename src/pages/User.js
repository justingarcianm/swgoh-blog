import React, { Fragment } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import UserInfo from '../Components/UserInfo'
import UserArticles from '../Components/UserArticles'
import Header from '../Components/Header'
import Loading from '../Components/Loading'

const User = props => (
    <Query query={gql`
    {
        user(id:${props.match.params.slug || props.location.state}) {
            username
            id
            tagline
            created_at
            side
            userBanner {
                url
            }
            userImage {
                formats
                id
            }
            userMedia {
                formats
            }
            posts(sort: "updated_at:desc") {
                id
                title
                updated_at
                image {
                    formats
                }
            }
        }
    }
    `}>
       { 
       ({ loading, error, data }) => {
            if( loading ) {
                return <Loading />
            }
            if(error) {
                window.location.reload()
                return <h2>Reloading...</h2>
            }
            return (
                 <Fragment>
                <Header props={props}/>
                <div id="user">
                        <div className={`${data.user.side.toLowerCase()} py-3`}>
                            <UserInfo user={data.user} param={props.location.pathname} />
                        </div>
                        <div className="neutral">
                            <UserArticles post={data.posts} user={data.user} param={props.location.pathname} />
                        </div>
                </div>
                </Fragment>
            )
        }
        }
    </Query>
)



export default User