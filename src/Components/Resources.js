import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Loading from './Loading'

const Resources = () => (
<Query query={gql`
{
    resourceLinks(sort:"id") {
      linkTitle
      linkUrl
      id
    }
  }    
`}>
    {
        ({ loading, data }) => {
            if ( loading ) {
                return <Loading />
            }
            return (
                <div id="resourceLinks">
                    <h3>Resources</h3>
                    <hr/>
                    <ol>
                        {data.resourceLinks.map( link => {
                            return (
                                <li key={link.id}>
                                    <a href={link.linkUrl} target="_blank" rel="noopener noreferrer">
                                        <span>0{link.id}</span> {link.linkTitle}
                                        </a>
                                </li>
                            )
                        })}
                    </ol>
                </div>
            )
        }
    }
</Query>
)

export default Resources