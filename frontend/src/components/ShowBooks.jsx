import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'; // Don't forget to import axios

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
    <div>
      {data.title}
    </div>
  );
}

export default ShowBooks;
