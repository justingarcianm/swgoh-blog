import React from 'react'
import { Timeline } from 'react-twitter-widgets'
import { Link } from 'react-router-dom'
import Resources from './Resources'

const SideBar = () => {
    return (
        <div id="sideBar">
            <h2>Twitter Feed</h2>
            <Timeline
  dataSource={{
    sourceType: 'url',
    url:'https://twitter.com/swgoh_news'
  }}
  options={{
    height: '400'
  }}
/>
            <Resources />
            <hr/>
            <div className="sidebar-links">
                <Link to="/about">About</Link>
                <Link to="/login">Login</Link>
<a href="https://www.codingjustin.com/" target="_blank" rel="noopener noreferrer">&copy;Justin Garcia {new Date().getFullYear()}</a>
            </div>
        </div>
    )
}

export default SideBar