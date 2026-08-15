import api from "./api";

export const getNotes = async () => {
  try {
    const response = await api.get("/notes");

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to load notes.",
      { cause: error }
    );
  }
};

export const getNoteById = async (id) => {
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