import React ,{ Fragment } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import Header from '../Components/Header'
import Loading from '../Components/Loading'
import PostResults from '../Components/PostResults'
import UserResults from '../Components/UserResults'
import NoSearchResults from '../Components/NoSearchResults'

const searchResults = props => (
    <Query query={gql`
    {
    users(where: {username_contains: "${props.match.params.slug || props.location.state}" }) {
        username  
        }
        posts(where: {title_contains: "${props.match.params.slug || props.location.state}" }){
        title
        }
      }
    `}>
        {
            ({ loading, data }) => {
                if( loading ) {
                    return (
                    <Fragment>
                        <Header props={props}/>
                        <Loading/>
                    </Fragment>
                    )
                }
                if(data.posts.length || data.users.length){
                    return (
                        <Fragment>
                                <Header props={props}/>
                                <div className="container pt-5" id="displayResults">
                                        <h1 className="text-center display-3 pb-2"> Results for: "{props.match.params.slug || props.location.state}"</h1>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <PostResults data={props}/>
                                        </div>
                                        <div className="col-md-6">
                                            <UserResults data={props}/>
                                        </div>
                                    </div>
                                </div>
                            </Fragment>
                        )
                }
                return (
                <Fragment>
                        <Header props={props}/>
                        <NoSearchResults props={props.match.params.slug}/>
                    </Fragment>
                )
                
            }
        }
    </Query>
)

export default searchResults