import React, { useState } from "react";
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
import {Toaster, toast } from 'sonner'
const Homepage = () => {
  const queryClient = new QueryClient();

  // Using tanStack React Query to fetch data
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["data"],
    queryFn: async () => {
      try {
        const response = await axios.get("http://localhost:5555/books");
        return response.data.data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  });

  // Mutation for deleting a book
  const deleteBook = useMutation({
    mutationFn: (id) => axios.delete(`http://localhost:5555/books/${id}`),
    onSuccess: () => {
      // Invalidate cache and refetch data after deletion
      queryClient.invalidateQueries("books");
      refetch();
    },
  });

  // State for managing edit modal
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedAuthor, setEditedAuthor] = useState("");
  const [editedPublisher, setEditedPublisher] = useState("");
  const [editedPublishYear, setEditedPublishYear] = useState("");

  // Function to handle edit button click
  const handleEditClick = (book) => {
    setEditingBook(book);
    setEditedTitle(book.title);
    setEditedAuthor(book.author);
    setEditedPublisher(book.publisher);
    setEditedPublishYear(book.publishYear);
    setEditModalOpen(true);
  };

  // Function to handle save button click
  const handleSave = async () => {
    // Perform update mutation
    try {
      await axios.put(`http://localhost:5555/books/${editingBook._id}`, {
        title: editedTitle,
        author: editedAuthor,
        publisher: editedPublisher,
        publishYear: editedPublishYear,
      });
      setEditingBook(null);
      refetch();
      setEditModalOpen(false);
      toast.success( 'Book Update Successfull', { position: 'top-center', richColors: true, duration: 2000 });

    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  // Function to handle delete button click
  const handleDelete = async (id,title) => {
    try {
      await deleteBook.mutateAsync(id);
      toast.error(`${title} deleted`, { position: 'top-center', richColors: true, duration: 2000 });
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div className="p-4 w-full justify-between items-center">
      <div className=" w-full flex justify-between items-center">
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
        <table className="w-full bg-white p-4 rounded-lg overflow-hidden shadow-xl ">
          <thead className="border-b border-zinc-400 bg-[#b9b7b7] text-black p-3 rounded-lg">
            <tr className="p-3 bg-[#b9b7b7] rounded-lg">
              <th className="p-3 text-left">Sl.No</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Author</th>
              <th className="p-3 text-left ">Publisher</th>
              <th className="p-3 text-left ">Publish Year</th>
              <th className="p-3 text-left">Operations</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="h-8 font-semibold">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{item.title}</td>
                <td className="p-2">{item.author}</td>
                <td className="p-2">{item.publisher}</td>
                <td className="p-2">{item.publishYear}</td>
                <td className="p-2">
                  <div className="flex items-center gap-x-4">
                    {/* Pass book data to handleEditClick */}
                    <button onClick={() => handleEditClick(item)} className="bg-green-700 px-4 py-1 rounded-md font-bold text-white hover:opacity-80 transition-all duration-300">Edit</button>
                    <button onClick={() => handleDelete(item._id, item.title)} className="bg-red-700 px-4 py-1 rounded-md font-bold text-white hover:opacity-80 transition-all duration-300">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Edit modal */}
      {editModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg w-[30%]">
            <h2 className="text-xl font-bold mb-4">Edit Book</h2>
            <label>Title:</label>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="block w-full border border-gray-300 rounded-md px-4 py-2 mb-2"
            />
            <label>Author:</label>
            <input
              type="text"
              value={editedAuthor}
              onChange={(e) => setEditedAuthor(e.target.value)}
              className="block w-full border border-gray-300 rounded-md px-4 py-2 mb-2"
            />
            <label>Publisher:</label>
            <input
              type="text"
              value={editedPublisher}
              onChange={(e) => setEditedPublisher(e.target.value)}
              className="block w-full border border-gray-300 rounded-md px-4 py-2 mb-2"
            />
            <label>Publish Year:</label>
            <input
              type="text"
              value={editedPublishYear}
              onChange={(e) => setEditedPublishYear(e.target.value)}
              className="block w-full border border-gray-300 rounded-md px-4 py-2 mb-2"
            />
            <div className="flex justify-end">
              <button onClick={handleSave} className="bg-green-500 text-white font-bold rounded-md px-4 py-2 mr-2 hover:opacity-80 transition-all duration-300">Save</button>
              <button onClick={() => setEditModalOpen(false)} className="bg-gray-300 text-gray-800 rounded-md px-4 py-2 hover:opacity-80 transition-all duration-300">Cancel</button>
            </div>
          </div>
        </div>
      )}

 <Toaster position="top-center" richColors duration={2000}/>

    </div>
  );
};

export default Homepage;
