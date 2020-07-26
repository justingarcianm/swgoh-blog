import React, { Fragment } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import Loading from '../Components/Loading'
import EditPostForm from '../Components/EditPostForm'
import Header from '../Components/Header'

const EditPost = props => (
    <Query query={gql`
    {
        post(id:${props.match.params.slug || props.location.state}){
            title
            id
            image {
                formats
                id
            }
            content
            category {
                catTitle
                id
            }
        }
        categories {
            catTitle
            id
        }
    }
    `}>
        {
            ({ loading, data }) => {
                if( loading ) {
                    return <Loading />
                }
                if(!sessionStorage.getItem("userID")){
                    props.history.push('/')
                    alert("Please Log in to Edit this Post")
                    return <h2>Not Authorized</h2>
                }
                return (
                    <Fragment>
                        <Header props={props}/>
                        <EditPostForm data={data.post} categories={data.categories} route={props} />
                    </Fragment>
                )
            }
        }
    </Query>
   
)

export default EditPost