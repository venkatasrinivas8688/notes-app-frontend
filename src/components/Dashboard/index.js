import React, { useState, useEffect } from "react";
import "./index.css";

const Dashboard = () => {
  const [formDetails, setFormDetails] = useState({
    title: "",
    category: "personal",
    content: "",
  });
  const [selectedNote, setSelectedNote] = useState(null);
  const [notes, setNotes] = useState([]);

  const fetchDataFromSql = async () => {
    const url = "http://localhost:5000/notes";
    const options = {
      method: "GET",
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Fetching failed!");
    }
    console.log(data.rows);
    setNotes(data.rows);
  };
  useEffect(() => {
    fetchDataFromSql();
  }, []);
  const handleNoteClick = (note) => {
    setSelectedNote(note);
    setFormDetails({
      title: note.title,
      category: note.category,
      content: note.content,
    });
  };

  const handleAddNote = async (event) => {
    event.preventDefault();
    if (!formDetails.title || !formDetails.content || !formDetails.category) {
    }
    const newNote = {
      title: formDetails.title,
      content: formDetails.content,
      category: formDetails.category,
    };
    const url = "http://localhost:5000/notes";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNote),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Fetching failed!");
    }
    fetchDataFromSql();
    setFormDetails({ title: "", category: "personal", content: "" });
  };

  const handleUpdateNote = async (event) => {
    event.preventDefault();

    if (!selectedNote) {
      return;
    }

    const updatedNote = {
      id: selectedNote.id,
      title: formDetails.title,
      content: formDetails.content,
      category: formDetails.category,
    };
    const url = `http://localhost:5000/notes`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedNote),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "updation failed!");
    }
    console.log("note updated");
    fetchDataFromSql();

    setFormDetails({ title: "", content: "", category: "personal" });
    setSelectedNote(null);
  };
  const handleCancel = () => {
    setFormDetails({ title: "", content: "", category: "personal" });
    setSelectedNote(null);
  };
  const deleteNote = async (event, noteId) => {
    event.stopPropagation();
    const url = `http://localhost:5000/notes/${noteId}`;
    console.log(noteId);
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "deletion failed!");
    }
    console.log("note deleted");
    console.log(data);
    const updatedNotes = notes.filter((note) => note.id !== noteId);

    setNotes(updatedNotes);
  };
  const handleOnChange = (event) => {
    setFormDetails({ ...formDetails, [event.target.name]: event.target.value });
  };

  return (
    <div className="dashboard-container">
      <form
        className="note-form"
        onSubmit={(event) =>
          selectedNote ? handleUpdateNote(event) : handleAddNote(event)
        }
      >
        <div>
          <input
            value={formDetails.title}
            name="title"
            onChange={handleOnChange}
            placeholder="Title"
            required
          ></input>

          <p className="pt-2 pb-0">select category</p>
          <select
            className="w-100"
            name="category"
            value={formDetails.category}
            onChange={handleOnChange}
          >
            <option value="personal">Personal</option>
            <option value="work">Work</option>
            <option value="study">Study</option>
          </select>
        </div>

        <textarea
          value={formDetails.content}
          onChange={handleOnChange}
          name="content"
          placeholder="Content"
          rows={10}
          required
        ></textarea>

        {selectedNote ? (
          <div className="edit-buttons">
            <button type="submit">Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        ) : (
          <button type="submit">Add Note</button>
        )}
      </form>
      <div className="notes-grid">
        {notes.map((note) => (
          <div
            key={note.id}
            className="notes-item"
            onClick={() => handleNoteClick(note)}
          >
            <div className="notes-header">
              <button onClick={(event) => deleteNote(event, note.id)}>x</button>
            </div>
            <p>
              <span className="span-element">Title:</span>
              {note.title}
            </p>
            <p>
              <span className="span-element">category:</span>
              {note.category}
            </p>
            <p>
              <span className="span-element">Description: </span>
              {note.content}
            </p>
            <p>
              <span className="span-element">Created At:</span>
              {note.created_at}
            </p>
            <p>
              <span className="span-element">Updated At:</span>
              {note.updated_at}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Dashboard;
