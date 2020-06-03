import React , { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';

const AddBook = () => {
  const [state, setState] = useState({
    name: '',
    genre: '',
    authorId: ''
  });
  
  const handleChange = (e) => {
    const value = e.target.value;
    setState({
    ...state, // Spread Opertor(...) to take all the args of state
    [e.target.name]: value
    });
  };
  
  const [mutation] = useMutation(addBookMutation);
  const submitForm = (event) => {
    event.preventDefault();
    mutation({ 
      variables: { 
        name: state.name,
        genre: state.genre,
        authorId: state.authorId,
      },
      refetchQueries: [{query: getBooksQuery}]
    });
  }

  const { loading, error, data } = useQuery(getAuthorsQuery);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error ❌</p>;

  const { authors } = data;
  const authorListItems = authors.map( ({ id, name }) => {
     return <option key={id} value={id}>{name}</option>;
  });

  
  // Main Render
  return (
     <form id="add-book" onSubmit={submitForm}>
        <div className="field"> 
          <label>Book Name:</label>
          <input type="text" name="name" onChange={handleChange}/>
        </div>
        <div className="field"> 
          <label>Genre:</label>
          <input type="text" name="genre" onChange={handleChange}/>
        </div>
        <div className="field"> 
          <label>Author:</label>
          <select name="authorId" onChange={handleChange}>
            <option>Select Author</option>
            {authorListItems}
          </select>
        </div>
        <button type="submit">+</button>
     </form>
  );
};
export default AddBook;