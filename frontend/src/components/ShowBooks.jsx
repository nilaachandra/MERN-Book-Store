import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ShowBooks = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey:['book', id],
    queryFn: async () => {
      try {
        const response = await axios.get(`http://localhost:5555/books/${id}`);
        return response.data;
      } catch (error) {
        throw new Error(error.message);
      }
    }
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div className="max-w-md mx-auto mt-12 p-4 border rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
      <p className="text-gray-600 mb-2"><span className="font-semibold">Author:</span> {data.author}</p>
      <p className="text-gray-600 mb-2"><span className="font-semibold">Publisher:</span> {data.publisher}</p>
      <p className="text-gray-600 mb-2"><span className="font-semibold">Publish Year:</span> {data.publishYear}</p>
    </div>
  );
}

export default ShowBooks;
