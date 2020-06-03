import React , { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import {addAuthorMutation} from '../queries/queries';

const AddAuthor = () => {
  const [state, setState] = useState({
    name: '',
    age: null,
  });
  
  const handleChange = (e) => {
    const value = e.target.value;
    setState({
    ...state, // Spread Opertor(...) to take all the args of state
    [e.target.name]: value
    });
  };
  
  const [mutation, { mutationData }] = useMutation(addAuthorMutation);
  const submitForm = (event) => {
    event.preventDefault();
    // console.log(state)
    mutation({ 
      variables: { 
        name: state.name,
        age: state.age,
      }
    });
  }
  
  // Main Render
  return (
     <form id="add-author" onSubmit={submitForm}>
        <div className="field"> 
          <label>Name:</label>
          <input type="text" name="name" onChange={handleChange}/>
        </div>
        <div className="field"> 
          <label>Age:</label>
          <input type="number" name="age" onChange={handleChange}/>
        </div>
        <button type="submit">+</button>
     </form>
  );
};
export default AddAuthor;