import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FaJediOrder } from 'react-icons/fa'

import SearchForm from './SearchForm'
import LoginDisplay from './LoginDisplay'

const Header = props => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <Link className="navbar-brand" to="/">Holo <FaJediOrder></FaJediOrder> Table</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>


  <div className="collapse navbar-collapse" id="navbarSupportedContent">

      <SearchForm props={props}/>

    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <NavLink className="nav-link" to="/" activeClassName="active">Home</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/about" activeClassName="active">About</NavLink>
      </li>
        <LoginDisplay />
    </ul>
    
  </div>
</nav>
    )
}

export default Header