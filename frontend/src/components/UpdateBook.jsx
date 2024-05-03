import { useQuery, useMutation, QueryClient } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateBook = () => {
  const { id } = useParams();
  const queryClient = new QueryClient();
  
  const { data, isLoading, isError, refetch, isSuccess } = useQuery({
    queryKey: ['book', id],
    queryFn: async () => {
      try {
        const response = await axios.get(`http://localhost:5555/books/${id}`);
        return response.data;
      } catch (error) {
        throw new Error(error.message);
      }
    }
  });

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publisher, setPublisher] = useState('');
  const [publishYear, setPublishYear] = useState('');

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setAuthor(data.author);
      setPublisher(data.publisher);
      setPublishYear(data.publishYear);
    }
  }, [data]);

  const editBook = useMutation({
    mutationFn: async () => {
      try {
        await axios.put(`http://localhost:5555/books/${id}`, {
          title,
          author,
          publisher,
          publishYear
        });
      
        queryClient.invalidateQueries(['book', id]);
        // Handle success (e.g., show a success message or redirect)
      } catch (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries("books");
      refetch()
      console.log('updated')
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editBook.mutateAsync();
    } catch (error) {
      console.error('Error editing book:', error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <form
      className='max-w-sm mx-auto p-4 border flex flex-col border-black rounded-md mt-8'
      onSubmit={handleSubmit}
    >
      <h1 className='text-xl mb-4 font-bold'>Add Your Books</h1>
      <span>Title</span>
      <input
        type='text'
        placeholder='Add Your Title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className='block w-full border border-gray-300 rounded px-4 py-2 mb-2'
      />
<span>Author</span>
      <input
        type='text'
        placeholder='Add Your Author'
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className='block w-full border border-gray-300 rounded px-4 py-2 mb-2'
      />
      <span>Publisher</span>
      <input
        type='text'
        placeholder='Add Your Publisher'
        value={publisher}
        onChange={(e) => setPublisher(e.target.value)}
        className='block w-full border border-gray-300 rounded px-4 py-2 mb-2'
      />
      <span>Publish Year</span>
      <input
        type='text'
        placeholder='Add Your Publish Year'
        value={publishYear}
        onChange={(e) => setPublishYear(e.target.value)}
        className='block w-full border border-gray-300 rounded px-4 py-2 mb-2'
      />

      <button
        type='submit'
        disabled={editBook.isLoading}
        className='block w-full bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600'
      >
        {editBook.isLoading ? 'Updating...' : 'Update Book'}
      </button>
      {editBook.isSuccess ? 'Books Updated' : null}
      {editBook.isError ? 'books Update fail' : null}
    </form>
  );
};

export default UpdateBook;
