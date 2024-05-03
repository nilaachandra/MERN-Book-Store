import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';

const CreateBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publisher, setPublisher] = useState('');
  const [publishYear, setPublishYear] = useState('');

  const addBooks = useMutation({
    mutationFn: (newBook) =>
      axios.post('http://localhost:5555/books', newBook),
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newBook = {
        title,
        author,
        publisher,
        publishYear: parseInt(publishYear),
      };

      await addBooks.mutateAsync(newBook);

      // Clear form fields after successful submission
      setTitle('');
      setAuthor('');
      setPublisher('');
      setPublishYear('');
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <form
      className='max-w-sm mx-auto p-4 border border-black rounded-md mt-8'
      onSubmit={handleSubmit}
    >
      <h1 className='text-xl mb-4 font-bold'>Add Your Books</h1>
      <input
        type='text'
        placeholder='Add Your Title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className='block w-full border border-gray-300 rounded px-4 py-2 mb-2'
      />

      <input
        type='text'
        placeholder='Add Your Author'
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className='block w-full border border-gray-300 rounded px-4 py-2 mb-2'
      />
      <input
        type='text'
        placeholder='Add Your Publisher'
        value={publisher}
        onChange={(e) => setPublisher(e.target.value)}
        className='block w-full border border-gray-300 rounded px-4 py-2 mb-2'
      />
      <input
        type='text'
        placeholder='Add Your Publish Year'
        value={publishYear}
        onChange={(e) => setPublishYear(e.target.value)}
        className='block w-full border border-gray-300 rounded px-4 py-2 mb-2'
      />

      <button
        type='submit'
        disabled={addBooks.isLoading}
        className='block w-full bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600'
      >
        {addBooks.isLoading ? 'Adding...' : 'Add Book'}
      </button>
    </form>
  );
};

export default CreateBook;
