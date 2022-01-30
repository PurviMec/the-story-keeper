import React from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import Header from './components/Header';
import Footer from './components/Footer';

 import Login from './pages/Login';
// import NoMatch from './pages/NoMatch';
 import SingleBook from './pages/SingleBook';
// import Profile from './pages/Profile';
 import Signup from './pages/SignUp';

import Home from "./pages/Home";
const httpLink = createHttpLink({
  uri: '/graphql',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
        <Header />
          <div className="container">
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            {/* <Route exact path="/profile" component={Profile} /> */}
            <Route exact path="/book" component={SingleBook} />
          </div>
        <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
