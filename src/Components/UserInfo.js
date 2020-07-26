import React, { useState } from 'react'

import LoggedInUser from './LoggedInUser'
import EditProfileForm from './EditProfileForm'

const UserInfo = props => {

    const [ state, setState ] = useState({
        editing:false
    })

    const setToEdit = () => {
        setState({editing:!state.editing})
    }

    const { created_at, tagline, userImage, username, id } = props.user
    const date = new Date(created_at).toLocaleDateString("en-US");
    return (
    <div className="container" style={{minHeight:"10vh"}}>
        <div className="row py-5 h-50">
            <div className="col-md-7 my-auto">
                <h3 className="display-4">{username}</h3>
                    <h4>{tagline}</h4>
                        <h6>joined: {date}</h6>
                        
            </div>
            <div className="col-md-5 text-center">
                <img src={userImage.formats.small.url} alt={username} className="img-fluid userImage" />
            </div>
        </div>
        {(sessionStorage.getItem("userID") === id && !state.editing) ? <LoggedInUser param={props.param} editing={setToEdit}/> : ""}
        {state.editing ? <EditProfileForm user={props.user} /> : ""}
    </div>
    )
}

export default UserInfo