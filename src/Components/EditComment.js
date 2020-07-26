import React, { Fragment, useState } from 'react'
import Axios from 'axios'

const EditComment = (props) => {

const [ state, setState ] = useState({
    toggleEdit:false,
    update:''
})

const config = {
    headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
};

const editPost = () => {
    setState((prevState) => ({
        ...prevState,
        toggleEdit:!state.toggleEdit
    }))
}

const handleChange = event => {
    const { name, value } = event.target
    setState((prevState) => ({
        ...prevState,
        [name]:value
    }))
}

const handleSubmit = event => {
    event.preventDefault();
    let id = event.target.getAttribute("id")
    if(id === "delete"){
        Axios.delete(`https://strapi-blog-swgoh.herokuapp.com/comments/${props.id}`, config)
        .then( () =>  window.location.reload())
        .catch( err => console.log(err))
    }
    if(id === "update"){
        if(state.update === ""){
            editPost();
        }
        else {
            Axios.put(`https://strapi-blog-swgoh.herokuapp.com/comments/${props.id}`,
            { "commentBody": state.update },config)
            .then( () => window.location.reload())
            .catch( err => console.log(err))
        }
    }
}

    if (state.toggleEdit) {
        return (
            <Fragment>
                <form>
                <div className="row mb-2">
                    <div className="col-8">
                        <input 
                        className="form-control" 
                        type="text" 
                        name="update"
                        placeholder={props.comment}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="col-4">
                    <button type="submit" className="btn btn-danger mx-1" onClick={handleSubmit} id="delete">DELETE</button>
                    <button type="submit" className="btn btn-info mx-1" onClick={handleSubmit} id="update">UPDATE</button>
                    </div>
                </div>
                </form>
            </Fragment>
        )
    }
    return (
        <Fragment>
            <button className="btn btn-warning mb-2" onClick={editPost}>EDIT</button>
        </Fragment>
    )
}

export default EditComment