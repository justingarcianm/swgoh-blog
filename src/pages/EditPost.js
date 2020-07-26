import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import Loading from '../Components/Loading'

const EditPost = props => (
    <Query query={gql`
    {
        post(id:${props.match.params.slug || props.location.state}){
            title
            id
            image {
                formats
            }
            content
            category {
                catTitle
            }
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
                console.log(data)
                return (
                    <h2>EditPost</h2>
                )
            }
        }
    </Query>
   
)

export default EditPost