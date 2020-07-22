import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'

const SearchForm = props => {
    const [ search, setSearch ] = useState('')

    const handleSubmit = event => {
        event.preventDefault();
        props.props.props.history.push({
            pathname:`/search/${search}`,
            state:search
        })
    }

    const handleChange = event => setSearch(event.target.value)

    return (
        <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
        <input 
        className="form-control mr-sm-2" 
        type="search" 
        placeholder="Search" 
        aria-label="Search" 
        name="search"
        onChange={handleChange}
        required
        />
        <button className="btn search" type="submit"><FaSearch></FaSearch></button>
      </form>
    )
}

export default SearchForm