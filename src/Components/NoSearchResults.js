import React from 'react'
import { Link } from 'react-router-dom'

import ObiWan from '../images/obi-wan.jpg'

const NoSearchResults = props => {
    return (
        <div className="container text-center mt-5">
            <img src={ObiWan} className="img-fluid" alt="obi-wan"/>
            <h2>"{props.props}" is not the term you are looking for... </h2>
            <p>Try a post title or an username! <Link to="/">Move Along!</Link></p>
        </div>
    )
}

export default NoSearchResults