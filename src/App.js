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
import EditPost from './pages/EditPost'
import EditUser from './pages/EditUser'
import CreatePost from './pages/CreatePost'
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
        <Route path="/edit-post/:slug" component={EditPost} />
        <Route path="/edit-author/:slug" component={EditUser} />
        <Route path="/create-post/:slug" component={CreatePost} />
        <Route component={notFound} />
        </Switch>
            </BrowserRouter>
            
        </ApolloProvider>
    )
}

export default App