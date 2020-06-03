import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import './App.css';

// Compontents
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import AddAuthor from './components/AddAuthor';

// Apollo Client Config
const client = new ApolloClient({
  uri: "http://127.0.0.1:8080/graphql"
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>My Book List</h1>
        <BookList />
        <AddBook />
        <AddAuthor />
      </div>
    </ApolloProvider>
  );
}

export default App;
