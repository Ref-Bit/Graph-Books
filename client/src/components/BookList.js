import React , { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getBooksQuery } from '../queries/queries';

//Components
import BookDetails from './BookDetails';

const BookList = () => {
  const [selected, setSelected] = useState(null);

  const { loading, error, data } = useQuery(getBooksQuery);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error ❌</p>;

  const { books } = data;

  const bookListItems = books.map(({ id, name }) => {
    return (
      <li onClick={() => setSelected(id)} key={id}>
          {name}
      </li>
    );
 });

  // Main Render
  return (
     <div>
        <ul id="book-list">{bookListItems}</ul>
        <BookDetails bookId={selected}/>
     </div>
  );
};
export default BookList;
