import React, { useState } from 'react'
import axios from 'axios'

import Loading from './Loading'

const EditProfileForm = ({ user }) => {

    const config = {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
    };

    const [ state, setState ] = useState({
        username:'',
        tagline:'',
        image:'',
        side:'',
        imageID:'',
        userID: sessionStorage.getItem("userID"),
        uploading:false
    })

    const handleChange = event => {
        const { name, value } = event.target
        setState((prevState) => ({
            ...prevState,
            [name]:value
        }))
    }

    const handleImageChange = event => {
        if (event.target) {
            setState((prevState) => ({
                ...prevState,
                uploading: true
            }
            ))
            const data = new FormData()
            data.append('files', event.target.files[0])

            axios.post("https://strapi-blog-swgoh.herokuapp.com/upload",
                data,
                config
            )
                .then(res => {
                    setState((prevState) => ({
                        ...prevState,
                        image: res.data[0].url,
                        uploading: false,
                        imageID: res.data[0].id
                    }))
                })
                .catch(err => console.log(err))
        }
    }

    const removeImage = () => {
        if (state.image) {
            axios.delete(`https://strapi-blog-swgoh.herokuapp.com/upload/files/${state.imageID}`,
                config
            )
                .then(res => {
                    console.log(res)
                    setState((prevState) => ({
                        ...prevState,
                        image: '',
                        imageID: ''
                    }))
                })
                .catch(err => console.log(err))
        }
    }

    const handleSubmit = event => {
        event.preventDefault()

        const body = {
            "username": state.username || user.username,
            "tagline": state.tagline || user.tagline,
            "userImage": state.imageID || user.userImage.id,
            "side": state.side || user.side
        };
        axios.put(`https://strapi-blog-swgoh.herokuapp.com/users/${sessionStorage.getItem("userID")}`,
        body,
        config
        ).then( () => {
            if(state.image) {
                axios.delete(`https://strapi-blog-swgoh.herokuapp.com/upload/files/${user.userImage.id}`, config )
                .then( () => window.location.reload() )
                .catch( err => console.log(err))  
            }
            window.location.reload()
        })
        .catch( err => console.log(err))
    }
    console.log(user)
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-row">
                <div className="col-md-5">
                    <label>Update Username</label>
                    <div className="form-group">

                    <input 
                    type="text" 
                    className="form-control" 
                    defaultValue={user.username} 
                    name="username" 
                    onChange={handleChange}
                    />

                    </div>
                    <div className="form-group">
                    <label>Update Tagline</label>

                    <input 
                    type="text" 
                    className="form-control" 
                    defaultValue={user.tagline} 
                    name="tagline" 
                    onChange={handleChange} 
                    />

                    </div>
                    <div className="form-group">
                        <label>Choose your Side!</label>
                        <select className="form-control" onChange={handleChange} name="side">
                            <option value="Light">Light</option>
                            <option value="Dark">Dark</option>
                        </select>
                    </div>
                </div>
                <div className="col-md-7 text-center">
                <div className="form-group"> 
                    <label>Update Avatar</label>
                    <input type="file" className="form-control-file m-3" onChange={handleImageChange} />
                    </div>
                <div className="form-group">
                    <img src={ state.image || user.userImage.formats.small.url} className="img-fluid userImage" alt={user.userImage} />
                    {state.uploading ? <Loading uploading={true} /> : ""}
                    {state.image ? <button className="btn btn-danger my-2" onClick={removeImage} >Choose Another</button> : ""}
                    </div>
                </div>
            </div>
            <button className="btn btn-success">Save Changes</button>
        </form>
    )
}

export default EditProfileForm