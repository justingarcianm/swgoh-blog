import React from 'react';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
// Pages
import Home from './pages/Home'
import About from './pages/About'
import Post from './pages/Post'
import searchResults from './pages/searchResults'
import User from './pages/User'
import Login from './pages/Login'
import Register from './pages/Register'
import notFound from './pages/404'
// Styles
import './css/style.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const client = new ApolloClient({
  uri: 'https://strapi-blog-swgoh.herokuapp.com/graphql'
})


function App () {
    return (
        <ApolloProvider client={client}>
            <BrowserRouter>
                <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/author/:slug" component={User} />
        <Route path="/post/:slug" component={Post} />
        <Route path="/search/:slug" component={searchResults} />
        <Route component={notFound} />
        </Switch>
            </BrowserRouter>
            
        </ApolloProvider>
    )
}

export default App