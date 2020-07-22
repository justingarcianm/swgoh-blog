import React, { Fragment } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'

import Loading from './Loading'

const UserResults = props => (
    
    <Query query={gql`
        {
            users(where: { username_contains: "${props.data.match.params.slug || props.data.location.state}" }) {
                username
                id
                userImage {
                    formats
                }
                created_at
                side
                tagline
            }
        }
    `}>
        {
            ({ loading, data }) => {
                if( loading ) {
                    return <Loading/>
                }

                if(!data.users.length) {
                    return (
                        <div className="container pt-3">
                            <h3>No Users Found</h3>
                        </div>
                    )
                }

                return (
                    <Fragment>
                    <h2>Users</h2>
                    <hr/>
                    {data.users.map( user => {
                        const date = new Date(user.created_at).toLocaleDateString("en-US");
                        return (
                            <Link to={{pathname:`/author/${user.id}`,state:`${user.id}`}} key={user.id}>
                            <div className={`userResults ${user.side.toLowerCase()}`}>
                                <div className="row">
                                    <div className="col-6 my-auto">
                                    <h3>{user.username}</h3>
                                        <h4>{user.tagline}</h4>
                        <h6>Joined: {date}</h6>
                                    </div>
                                    <div className="col-6">
                                        <img className="img-fluid userImage" src={user.userImage.formats.small.url} alt={user.username} />
                                    </div>
                                </div>
                        
                            </div>
                             </Link>
                        )
                    })}
                    </Fragment>
                )
            }
        }
    </Query>
)

export default UserResults