import React, { useContext, useEffect, useState } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNote, editNote } = context;
  let navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      alert("Please login first.");
      navigate("/login");
      
    } else {
      getNote();
    }
  }, [navigate, getNote]);

  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState({
    id: "",
    title: "",
    description: "",
    tag: "",
  });

  const updateNote = (note) => {
    setCurrentNote(note);
    setIsModalOpen(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (
      currentNote.title.length < 5 ||
      currentNote.description.length < 5
    ) {
      alert("Title and description must be at least 5 characters long.");
      return;
    }
    editNote(
      currentNote._id,
      currentNote.title,
      currentNote.description,
      currentNote.tag
    );
    setIsModalOpen(false);
  };

  return (
    <div className="bg-gray-800 min-h-screen">
      <AddNote />
      <div className="max-w-5xl mx-auto">
        <h1 className="text-center text-3xl text-blue-400">Your Notes</h1>
        {notes.length === 0 && <p className="text-white">No notes to display</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          {notes.map((note) => (
            <NoteItem key={note._id} note={note} updateNote={updateNote} />
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-lg shadow dark:bg-gray-700 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Edit Note
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8"
                onClick={() => setIsModalOpen(false)}
              >
                <svg
                  className="w-3 h-3"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>

            <div className="p-4">
              <form className="space-y-4" onSubmit={handleUpdate}>
                <div>
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={currentNote.title}
                    onChange={(e) =>
                      setCurrentNote({
                        ...currentNote,
                        title: e.target.value,
                      })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={currentNote.description}
                    onChange={(e) =>
                      setCurrentNote({
                        ...currentNote,
                        description: e.target.value,
                      })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  ></textarea>
                </div>
                <div>
                  <label
                    htmlFor="tag"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Tag
                  </label>
                  <input
                    type="text"
                    id="tag"
                    value={currentNote.tag}
                    onChange={(e) =>
                      setCurrentNote({ ...currentNote, tag: e.target.value })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  Update Note
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notes;
