import { useNavigate } from "react-router-dom";

import { deleteNote } from "../../../services/note.api";

function NoteCard({ note, onDelete }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteNote(note.id);

      onDelete(note.id);
    } catch (error) {
      alert(error.message || "Unable to delete note.");
    }
  };

  return (
    <article>
      <h2>{note.title}</h2>

      <p>{note.content}</p>

      <small>
        Created: {new Date(note.createdAt).toLocaleString()}
      </small>

      <br />
      <br />

      <button
        type="button"
        onClick={() => navigate(`/notes/edit/${note.id}`)}
      >
        Edit
      </button>

      <button type="button" onClick={handleDelete}>
        Delete
      </button>
    </article>
  );
}

export default NoteCard;