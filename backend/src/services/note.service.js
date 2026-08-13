const prisma = require("../config/prisma");

const createNote = async ({ title, content, userId }) => {
  try {
    return await prisma.note.create({
      data: {
        title,
        content,
        userId,
      },
    });
  } catch (error) {
    throw new Error("Failed to create note.", {
      cause: error,
    });
  }
};

const getNotes = async (userId) => {
  try {
    return await prisma.note.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    throw new Error("Failed to fetch notes.", {
      cause: error,
    });
  }
};

const getNoteById = async ({ noteId, userId }) => {
  try {
    const note = await prisma.note.findFirst({
      where: {
        id: noteId,
        userId,
      },
    });

    if (!note) {
      throw new Error("Note not found.");
    }

    return note;
  } catch (error) {
    if (error.message === "Note not found.") {
      throw error;
    }

    throw new Error("Failed to fetch note.", {
      cause: error,
    });
  }
};

const updateNote = async ({ noteId, userId, title, content }) => {
  try {
    const result = await prisma.note.updateMany({
      where: {
        id: noteId,
        userId,
      },
      data: {
        title,
        content,
      },
    });

    if (result.count === 0) {
      throw new Error("Note not found.");
    }

    return await prisma.note.findFirst({
      where: {
        id: noteId,
        userId,
      },
    });
  } catch (error) {
    if (error.message === "Note not found.") {
      throw error;
    }

    throw new Error("Failed to update note.", {
      cause: error,
    });
  }
};

const deleteNote = async ({ noteId, userId }) => {
  try {
    const result = await prisma.note.deleteMany({
      where: {
        id: noteId,
        userId,
      },
    });

    if (result.count === 0) {
      throw new Error("Note not found.");
    }

    return {
      message: "Note deleted successfully.",
    };
  } catch (error) {
    if (error.message === "Note not found.") {
      throw error;
    }

    throw new Error("Failed to delete note.", {
      cause: error,
    });
  }
};

module.exports = {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
};