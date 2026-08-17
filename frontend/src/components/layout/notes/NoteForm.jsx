function NoteForm({
    formData,
    onChange,
    onSubmit,
    loading,
    submitText = "Save Note",
  }) {
    return (
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="title">Title</label>
  
          <input
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={onChange}
            disabled={loading}
          />
        </div>
  
        <br />
  
        <div>
          <label htmlFor="content">Content</label>
  
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={onChange}
            disabled={loading}
          />
        </div>
  
        <br />
  
        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : submitText}
        </button>
      </form>
    );
  }
  
  export default NoteForm;