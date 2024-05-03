import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";
import {
  RiAddBoxFill,
  RiDeleteBin2Fill,
  RiEdit2Fill,
  RiFileAddLine,
  RiHeartFill,
  RiInformation2Fill,
} from "@remixicon/react";

 //traditional method
  // const [books, setBooks] = useState([]);
  // const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   setLoading(true);
  //   axios
  //     .get("http://localhost:5555/books")
  //     .then((response) => {
  //       setBooks(response.data.data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setLoading(false);
  //     });
  // }, []);

const Homepage = () => {
 
  const queryClient = new QueryClient()
  //using tanStack React Query
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['data'],
    queryFn: async () => {
      try {
        const response = await axios.get("http://localhost:5555/books");
        return response.data.data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  });

  const deleteBook = useMutation({
    mutationFn: (id) => axios.delete(`http://localhost:5555/books/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries("books");
      refetch()
    },
  });
  const handleDelete = async (id) => {
    try {
      await deleteBook.mutateAsync(id);
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Books List</h1>
        <Link
          to="books/create"
          className="flex gap-3 justify-center items-center"
        >
          Add Books <RiFileAddLine size={48} />
        </Link>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <table className="w-full border-spacing-2">
          <thead>
            <tr>
              <th className="border border-slate-600 rounded-md">Sl.No</th>
              <th className="border border-slate-600 rounded-md">Title</th>
              <th className="border border-slate-600 rounded-md">Author</th>
              <th className="border border-slate-600 rounded-md">Publisher</th>
              <th className="border border-slate-600 rounded-md">
                Publish Year
              </th>
              <th className="border border-slate-600 rounded-md">Operations</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="h-8">
                <td className="border border-slate-700 rounded-md text-center">
                  {index + 1}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {item.title}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {item.author}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {item.publisher}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {item.publishYear}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  <div className="flex justify-center gap-x-4">
                    <Link to={`/books/details/${item._id}`}>
                      <RiInformation2Fill />
                    </Link>
                    <Link to={`/books/edit/${item._id}`}>
                      <RiEdit2Fill />
                    </Link>
                    <button onClick={() => handleDelete(item._id)}>
                      <RiDeleteBin2Fill />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Homepage;
