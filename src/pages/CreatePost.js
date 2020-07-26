import React, { Fragment, useState, useEffect } from 'react'
import axios from 'axios'
import ReactMarkdown from 'react-markdown';

import Header from '../Components/Header'
import Loading from '../Components/Loading'

const CreatePost = props => {

    const config = {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
    };

    const [state, setState] = useState({
        title: '',
        content: '',
        cat: '',
        loading: false,
        image: '',
        imageID: '',
        categories: []
    })

    useEffect(() => {
        axios.get('https://strapi-blog-swgoh.herokuapp.com/categories')
            .then(res => {
                setState((prevState) => ({
                    ...prevState,
                    categories: res.data
                }))
            })
            .catch(err => console.log(err))
    })

    const handleImageUpload = event => {
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

    const removeImage = event => {
        event.preventDefault()
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

    const handleChange = event => {
        const { name, value } = event.target
        setState((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = async event => {
        event.preventDefault()

        if (!state.cat) {
            alert("Please select a valid category!")
        }
        else {
            const body = {
                "title": state.title,
                "content": state.content,
                "user": sessionStorage.getItem("userID"),
                "image": state.imageID,
                "category": state.cat
            };
            axios.post("https://strapi-blog-swgoh.herokuapp.com/posts",
                body,
                config
            ).then(res => {
                console.log(res)
                props.history.push({ pathname: `/post/${res.data.id}`, state: `${res.data.id}` })
            })
                .catch(err => console.log(err))
        }


    }
    if (!sessionStorage.getItem("userID")) {
        props.history.push('/')
        alert("Please Log in to Create a Post")
        return <h2>Not Authorized</h2>
    }
    return (
        <Fragment>
            <Header props={props} />
            <div className="container pt-5">
                <h2 className="text-center display-4">Create a New Post</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group col-md-9">
                            <label>Title</label>
                            <input
                                type="text"
                                className="form-control"
                                required
                                onChange={handleChange}
                                name="title"
                            />
                        </div>
                        <div className="form-group col-md-3">
                            <label>Select a Category</label>
                            <select multiple className="form-control" required onChange={handleChange} name="cat">
                                {state.categories.map(cat => {
                                    return (
                                        <option key={cat.id} value={cat.id}>{cat.catTitle}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="form-row image-row">
                        <div className="col-md-6">
                            <label>Upload a Cover Image</label>
                            <input
                                type="file"
                                className="form-control-file"
                                onChange={handleImageUpload}
                                name="file"
                                required
                            />

                        </div>
                        <div className="col-md-6">
                            {state.loading ? <Loading uploading={true} /> : ""}
                            {state.image ? <img src={state.image} alt="uploaded" className="img-fluid" /> : ""}
                            {state.image ? <button className="btn btn-danger my-1" onClick={removeImage}>Choose Another</button> : ""}
                        </div>
                    </div>
                    <div className="form-group mt-3">
                        <label>Type out your content here in Markdown - <a href="https://www.markdownguide.org/cheat-sheet/" target="_blank" rel="noopener noreferrer">need help?</a></label>
                        <textarea
                            className="form-control textarea"
                            required
                            onChange={handleChange}
                            name="content"
                        ></textarea>
                        <div className="form-group mt-3">
                            <label>Markdown Preview</label>
                            <ReactMarkdown className="preview" source={state.content} />
                        </div>
                        <button className="btn btn-success my-3" disabled={state.loading}>Create Post!</button>
                    </div>
                </form>
            </div>
        </Fragment>
    )
}

export default CreatePost