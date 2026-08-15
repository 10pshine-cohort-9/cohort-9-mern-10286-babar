import { useNavigate } from "react-router-dom";


function NoteCard({ note, onDelete }) {
  const navigate = useNavigate();

  const handleDelete = () => {
    onDelete(note.id);
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