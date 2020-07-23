import React, { Fragment } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import MarkDown from 'react-markdown'
import { FaApple, FaGooglePlay} from 'react-icons/fa'

import Loading from '../Components/Loading'
import Header from '../Components/Header'

const About = props => (
    <Query query={gql`
    {
    about {
        aboutContent
        youtubeId
        }
    }
    `}>
        {
            ({ loading, data }) => {
                if (loading) {
                    return <Loading />
                }
                return (
                    <Fragment>
                        <Header props={props}/>
                    <div className="container" id="about">
                        <h1 className="text-center display-1">About the HoloTable</h1>
                        <div className="row">
                            <div className="col-md-7">
                                <MarkDown source={data.about.aboutContent}/>
                            </div>
                            <div className="col-md-5">
                            <iframe style={{width:"100%", height:"300px"}} title="about video" src={`https://www.youtube.com/embed/${data.about.youtubeId}`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            </div>
                        </div>
                        <h2 className="display-3 text-center">
                            Download the app Today!
                        </h2>
                        <div className="row text-center py-5">
                            <div className="col-md-3"></div>
                            <div className="col-md-3 mt-1">
                                <a href="https://apps.apple.com/us/app/star-wars-galaxy-of-heroes/id921022358" target="_blank" rel="noopener noreferrer" className="btn btn-dark"> <FaApple></FaApple> <span>Apple Store</span></a>
                            </div>
                            <div className="col-md-3 mt-1">
                            <a href="https://play.google.com/store/apps/details?id=com.ea.game.starwarscapital_row&hl=en_US" target="_blank" rel="noopener noreferrer" className="btn btn-dark"> <FaGooglePlay></FaGooglePlay> <span>Google Play</span>  </a>
                            </div>
                            <div className="col-md-3"></div>
                        </div>
                    </div>
                    </Fragment>
                )
            }
        }
    </Query>
)

export default About