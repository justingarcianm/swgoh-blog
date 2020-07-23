import React, { Fragment, useState } from 'react'
import Header from '../Components/Header'

import Axios from 'axios'

const Login = props => {

    const [ state, setState ] = useState({
        username: '',
        password: ''
    })

    const handleSubmit = event => {
        event.preventDefault();
        Axios.post('https://strapi-blog-swgoh.herokuapp.com/auth/local', {
            "identifier": state.username,
	        "password": state.password
        })
        .then(res => {
            sessionStorage.setItem("token", res.data.jwt)
            sessionStorage.setItem("userID", res.data.user.id)
            props.history.push({
                pathname:`/author/${res.data.user.id}`
            })
        })
        .catch(err => {
            console.log(err)
            alert("Incorrect Password or Username entered Try again")
        })
    }

    const handleChange = event => {
        const { name, value } = event.target
        setState((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }
    return (
        <Fragment>
            <Header props={props} />
            <div className="container" id="login">
                <div className="row">
                        <div className="col-md-3"></div>
                    <div className="col-md-6 my-auto">
                    <form className="loginForm" onSubmit={handleSubmit}>
                        <h2 className="text-center ">Login</h2>
                        <div className="form-group">
                            <input 
                            type="text" 
                            className="form-control" 
                             placeholder="Enter username"
                             name="username"
                             required
                             onChange={handleChange}
                             />
                        </div>
                        <div className="form-group">
                            <input 
                            type="password" 
                            className="form-control" 
                            placeholder="Password"
                            name="password"
                            required
                            onChange={handleChange}
                            />
                        </div>
                        <div className="text-center">
                        <button type="submit" className="btn btn-dark">Submit</button>
                        <p className="pt-2">If you would like to get some login credentials, <a href="https://www.codingjustin.com">click here </a>to contact him for a full demo!</p>
                        </div>
                        
                        </form>
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>
        </Fragment>
        )
}

export default Login