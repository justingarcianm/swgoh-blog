import React, { Fragment, useState } from 'react'
import axios from 'axios'
import ReactMarkdown from 'react-markdown';

import Loading from './Loading'

const EditPostForm = props => {
    const config = {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
    };
    const { title, content, id, category, image } = props.data
    const [ state, setState ] = useState({
        title:'',
        content:'',
        cat:'',
        loading:false,
        image:'',
        imageID:'',
        categories:'',
        postID: id
    })

    const handleChange = event => {
        const { name, value } = event.target
        setState((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const updateImage = event => {
        if (event.target) {
            setState((prevState) => ({
                ...prevState,
                loading: true
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
                        loading: false,
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

    const updatePost = () => {
        const body = {
            "title": state.title || title,
            "content": state.content || content,
            "user": sessionStorage.getItem("userID"),
            "image": state.imageID || image.id,
            "category": state.cat || category.id
        };
        axios.put(`https://strapi-blog-swgoh.herokuapp.com/posts/${id}`,
        body,
        config
        ).then( () => {
            if(!state.image === "") {
                axios.delete(`https://strapi-blog-swgoh.herokuapp.com/upload/files/${image.id}`, config )
                .then( () => {
                    props.route.history.push({pathname:`/post/${id}`, state:`${id}`})
                    window.location.reload()
                })
                .catch( err => console.log(err))  
            }
            props.route.history.push({pathname:`/post/${id}`, state:`${id}`})
            window.location.reload()
        })
        .catch( err => console.log(err))
    }

    const deletePost = () => {
        let response = prompt("Enter the word 'delete' to confirm")

        if(response === "delete") {
            axios.delete(`https://strapi-blog-swgoh.herokuapp.com/posts/${id}`,
            config)
            .then( () => {
                axios.delete(`https://strapi-blog-swgoh.herokuapp.com/upload/files/${image.id}`, config )
                props.route.history.push({pathname:`/author/${sessionStorage.getItem("userID")}`,state:`${sessionStorage.getItem("userID")}`})
                alert("Post Successfully Deleted")
            })
            .catch( err => console.log(err)) 
        }
    }
    return (
        <Fragment>
            <div className="container mt-5">
            <h2 className="text-center">Editing "{title}"</h2>
            <form onSubmit={e => e.preventDefault()}>
                <div className="form-row">
                    <div className="col-md-9 form-group">
                        <label>Title</label>
                        <input 
                        className="form-control"
                        name="title"
                        onChange={handleChange}
                        defaultValue={title}
                        />
                    </div>
                    <div className="col-md-3 form-group">
                        <label>Select Category | Currently: {category.catTitle}</label>
                        <select multiple className="form-control" onChange={handleChange} name="cat" >
                            {props.categories.map( category => {
                                return (
                                <option key={category.id} value={category.id}>{category.catTitle}</option>
                                )
                            })}
                        </select>
                    </div>
                </div>
                <div className="form-row image-row">
                    <div className="col-md-6">
                        <label>Upload a new Image</label>
                        <input 
                        type="file" 
                        className="form-control-file" 
                        name="file" 
                        onChange={updateImage}
                        />
                    </div>
                    <div className="col-md-6">
                        {state.image ? <img className="img-fluid" src={state.image} alt="uploaded" /> : <img className="img-fluid" src={image.formats.medium.url} alt="uploaded" />}
                        {state.loading ? <Loading uploading={true} /> : ""}
                        {state.image ? <button className="btn btn-danger my-1" onClick={removeImage}>Choose Another</button> : ""}
                    </div>
                </div>
                <div className="form-group mt-3">
                <label>Edit your content here in Markdown - <a href="https://www.markdownguide.org/cheat-sheet/" target="_blank" rel="noopener noreferrer">need help?</a></label>
                <textarea
                className="form-control textarea"
                required
                onChange={handleChange}
                name="content"
                defaultValue={content}
                        ></textarea>
                </div>
                <div className="form-group mt-3">
                            <label>Markdown Preview</label>
                            <ReactMarkdown className="preview" source={state.content || content} />
                        </div>
                        <div className="form-row">
                            <button className="btn btn-danger m-3" onClick={deletePost} >Delete Post</button>
                            <button className="btn btn-success m-3" disabled={state.loading} onClick={updatePost} >Confirm Changes</button>
                        </div>
            </form>
            </div>
        </Fragment>
    )
}

export default EditPostForm