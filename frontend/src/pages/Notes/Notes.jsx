import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getNotes, deleteNote } from "../../services/note.api";
import NoteList from "../../components/layout/notes/NoteList";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchNotes = async () => {
      try {
        const response = await getNotes();

        if (isMounted) {
          setNotes(response.data);
          setError("");
        }
      } catch (error) {
        if (isMounted) {
          setError(error.message || "Unable to load notes.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchNotes();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleDelete = async (noteId) => {
    try {
      await deleteNote(noteId);

      setNotes((previousNotes) =>
        previousNotes.filter((note) => note.id !== noteId)
      );
    } catch (error) {
      setError(error.message || "Unable to delete note.");
    }
  };

  if (loading) {
    return <p>Loading notes...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>My Notes</h1>

      <Link to="/notes/create">
        Create Note
      </Link>

      {notes.length === 0 ? (
        <p>You don't have any notes yet.</p>
      ) : (
        <NoteList
          notes={notes}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default Notes;