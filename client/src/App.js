import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
//import {bookcase.png} from "./images/bookcase.png"

import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";

import { setContext } from '@apollo/client/link/context';

import Header from "./components/Header";
import Footer from "./components/Footer";

import Login from "./pages/Login";
// import NoMatch from './pages/NoMatch';
import SingleBook from "./pages/SingleBook";
import Profile from "./pages/Profile";
import Signup from "./pages/SignUp";

import Home from "./pages/Home";
const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div style={{ backgroundImage: "url(/bookcase.png)" }}>
        <div className="flex-column justify-flex-start">
          <Header />
          <div className="" >
            <div className="container">
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/profile/:username?" component={Profile} />
              <Route exact path="/book/:id" component={SingleBook} />
            </div>
          </div>
          <Footer />
        </div>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
