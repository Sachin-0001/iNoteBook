import React,{useContext} from "react";
import noteContext from "../context/notes/noteContext";
const NoteItem = (props) => {
  const context = useContext(noteContext);
  // const { addNote } = context;
  const { note ,updateNote} = props;
  const {deleteNote} = context
  return (
    <div>
      <div
        className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {note.title}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400 whitespace-normal">
          {note.description}
        </p>
        <i className="fa-solid fa-trash mr-10" style={{ color: "#74C0FC" }} onClick={() => {deleteNote(note._id) }}></i>
        <i className="fa-solid fa-pencil" style={{ color: "#74C0FC" }} onClick={() => {updateNote(note) }}></i>
          </div>
          
    </div>
  );
};

export default NoteItem;
