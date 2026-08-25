import api from "./api";

export const getNotes = async (searchQuery = "") => {
  try {
    const url = searchQuery ? `/notes?search=${encodeURIComponent(searchQuery)}` : "/notes";
    const response = await api.get(url);

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to load notes.",
      { cause: error }
    );
  }
};

export const getNote = async (id) => {
  try {
    const response = await api.get(`/notes/${id}`);

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to load note.",
      { cause: error }
    );
  }
};

export const createNote = async (noteData) => {
  try {
    const response = await api.post("/notes", noteData);

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to create note.",
      { cause: error }
    );
  }
};

export const updateNote = async (id, noteData) => {
  try {
    const response = await api.put(`/notes/${id}`, noteData);

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to update note.",
      { cause: error }
    );
  }
};

export const deleteNote = async (id) => {
  try {
    const response = await api.delete(`/notes/${id}`);

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to delete note.",
      { cause: error }
    );
  }
};

// --- NEW EXPORT & IMPORT API CALLS ---
export const exportNotesApi = async () => {
  try {
    const response = await api.get("/notes/export");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to export notes.",
      { cause: error }
    );
  }
};

export const importNotesApi = async (notesArray) => {
  try {
    const response = await api.post("/notes/import", { notes: notesArray });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to import notes.",
      { cause: error }
    );
  }
};