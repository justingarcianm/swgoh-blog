import React, { Fragment } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Loading from './Loading'

const Hero = () => (
    <Query query={gql`
     {
        banner {
            heroTitle
            heroSubtitle
            heroImage {
              url
            }
          }
      }
    `}>
        {
            ({ loading, error, data }) => {
                if (loading) {
                    return <Loading />
                }
                if (error) {
                    window.location.reload()
                    return <h2>OPPS!!!</h2>
                }
                const { heroTitle, heroSubtitle, heroImage } = data.banner
                return (
                    <Fragment>
                        <div id="hero" style={{ backgroundImage: `url(${heroImage.url})` }}>
                            <div className="overlay">
                                <div className="container-fluid">
                                    <div className="row h-40">
                                        <div className="col-12 my-auto text-center">
                <h1 className="display-1">{heroTitle}</h1>
                <p className="lead">{heroSubtitle}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                )
            }
        }
    </Query>
)

export default Hero