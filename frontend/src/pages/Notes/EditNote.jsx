import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getNote, updateNote } from "../../services/note.api";

function EditNote() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadNote = async () => {
      try {
        setError("");

        const response = await getNote(id);

        setFormData({
          title: response.data.title,
          content: response.data.content,
        });
      } catch (error) {
        setError(error.message || "Unable to load note.");
      } finally {
        setLoading(false);
      }
    };

    loadNote();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSaving(true);

    try {
      await updateNote(id, {
        title: formData.title.trim(),
        content: formData.content.trim(),
      });

      navigate("/notes");
    } catch (error) {
      setError(error.message || "Unable to update note.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p>Loading note...</p>;
  }

  if (error){
    return (
      <div>
        <p>{error}</p>
  
        <button type="button" onClick={() => navigate("/notes")}>
          Back to Notes
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1>Edit Note</h1>

      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>

          <input
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <br />

        <div>
          <label htmlFor="content">Content</label>

          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
          />
        </div>

        <br />

        <button type="submit" disabled={saving}>
          {saving ? "Updating..." : "Update Note"}
        </button>

        <button
          type="button"
          onClick={() => navigate("/notes")}
          disabled={saving}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditNote;