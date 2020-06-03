import { gql } from 'apollo-boost';

const getAuthorsQuery = gql`
{
  authors{
    name
    age
    id
  }
}
`

const getBooksQuery = gql`
{
  books{
    name
    genre
    id
  }
}
`

const getBookQuery = gql`
query($id: ID!){
  book(id: $id){
    id
    name
    genre
    author{
      id
      name
      age
      books{
        id
        name
        genre
      }
    }
  }
}
`

const addBookMutation=gql`
  mutation($name: String!, $genre: String!, $authorId: ID!){
    addBook(name:$name, genre:$genre, authorId:$authorId){
      id
      name
      genre
    }
  }
`
const addAuthorMutation=gql`
  mutation($name: String!, $age: Int!){
    addAuthor(name:$name, age:$age){
      id
      name
      age
    }
  }
`

export { getAuthorsQuery, getBooksQuery, addBookMutation, addAuthorMutation, getBookQuery}