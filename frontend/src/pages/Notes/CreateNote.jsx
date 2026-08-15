import { useState } from "react";
import { useNavigate } from "react-router-dom";

import NoteForm from "../../components/layout/notes/NoteForm";
import { createNote } from "../../services/note.api";

function CreateNote() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setError("");
      setLoading(true);

      await createNote(formData);

      navigate("/notes");
    } catch (error) {
      setError(error.message || "Unable to create note.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Create Note</h1>

      {error && <p>{error}</p>}

      <NoteForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        loading={loading}
        submitText="Create Note"
      />
    </div>
  );
}

export default CreateNote;