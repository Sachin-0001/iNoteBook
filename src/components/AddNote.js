import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = () => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({ title: "", description: "", tag: "default" });

  const handleClick = (e) => {
    e.preventDefault();
    if (!note.title.trim() || !note.description.trim()) {
      alert("Title and Description are required!");
      return;
    }

    if (note.title.length < 5 || note.description.length < 5) {
      alert("Title and Description should be at least 5 characters long!");
      return;
    }
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" }); // Clear the form
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-gray-800 mb-24">
      <h1 className="text-center pt-3 text-3xl text-blue-400">ADD NOTE</h1>
      <form className="max-w-sm mx-auto">
        <div className="mb-5">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white pt-8"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            value={note.title}
            onChange={onChange}
            placeholder="Enter the title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <textarea
            name="description"
            value={note.description}
            onChange={onChange}
            placeholder="Enter the description"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-32"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="tag"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white pt-8"
          >
            Tag
          </label>
          <input
            type="text"
            name="tag"
            value={note.tag}
            onChange={onChange}
            placeholder="Enter the tag"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          // disabled={!note.title.length <5 || note.description.length < 5}
          onClick={handleClick}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          ADD NOTE
        </button>
      </form>
    </div>
  );
};

export default AddNote;
