import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import Loading from './Loading'

const LoginDisplay = () => (
    <Query query={gql`
    {
        user ( id:"${sessionStorage.getItem("userID")}" ) {
            username,
            userImage {
                formats
            },
            id
        }
    }
    `}>
        {
            ({ loading, data }) => {
                if( loading ) {
                    return <Loading/>
                }
                if(!data) {
                    return (
                        <Fragment>
                   <li className="nav-item">
         <NavLink className="nav-link" to="/login" activeClassName="active">Login</NavLink>
       </li>
         </Fragment>
                    )
                }

                const logOut = () => {
                    sessionStorage.clear();
                    window.location.reload();
                }

                return (
                    <Fragment>
              <li className="nav-item">
                <NavLink className="nav-link" to={{pathname:`/author/${data.user.id}`, state:`${data.user.id}`}}>
                    <img className="headerAvatar" alt={data.user.username} src={data.user.userImage.formats.thumbnail.url} /> 
                    </NavLink>
       </li>
              <li className="nav-item">
         <NavLink className="nav-link" to="/" onClick={logOut}>Logout</NavLink>
       </li>
         </Fragment>
                )
            }
        }
    </Query>
)

export default LoginDisplay