const prisma = require("../config/prisma");
const AppError = require("../utils/AppError");

const createNote = async ({ title, content, userId }) => {
  return await prisma.note.create({
    data: { title, content, userId },
  });
};

const getNotes = async (userId) => {
  return await prisma.note.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};

const getNoteById = async ({ noteId, userId }) => {
  const note = await prisma.note.findFirst({
    where: { id: noteId, userId },
  });

  if (!note) {
    throw new AppError("Note not found.", 404);
  }

  return note;
};

const updateNote = async ({ noteId, userId, title, content }) => {
  const result = await prisma.note.updateMany({
    where: { id: noteId, userId },
    data: { title, content },
  });

  if (result.count === 0) {
    throw new AppError("Note not found.", 404);
  }

  return await prisma.note.findFirst({
    where: { id: noteId, userId },
  });
};

const deleteNote = async ({ noteId, userId }) => {
  const result = await prisma.note.deleteMany({
    where: { id: noteId, userId },
  });

  if (result.count === 0) {
    throw new AppError("Note not found.", 404);
  }

  return { message: "Note deleted successfully." };
};

module.exports = {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
};