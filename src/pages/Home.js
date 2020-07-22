import React, { Fragment } from 'react'
import Hero from '../Components/Hero'
import HomeFeed from '../Components/HomeFeed'
import Featured from '../Components/Featured'
import SideBar from '../Components/SideBar'
import Header from '../Components/Header'

const Home = props => {
    return (
        <Fragment>
            <Header props={props}/>
        <Hero/>
        <Featured />
        <div className="container pb-5">
            <hr/>
            <div className="row">
                <div className="col-md-8">
                <HomeFeed />
                </div>
                <div className="col-md-4">
                    <SideBar />
                </div>
            </div>
        </div>
        </Fragment>
    )
}

export default Home