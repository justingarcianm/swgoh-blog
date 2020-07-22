import React from 'react'

const UserInfo = props => {
    const { created_at, tagline, userImage, username } = props.user
    const date = new Date(created_at).toLocaleDateString("en-US");
    return (
    <div className="container">
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
    </div>
    )
}

export default UserInfo