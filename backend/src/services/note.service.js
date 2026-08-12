const prisma = require("../config/prisma");

const createNote = async ({ title, content, userId }) => {
  const note = await prisma.note.create({
    data: {
      title,
      content,
      userId,
    },
  });

  return note;
};

const getNotes = async (userId) => {
  const notes = await prisma.note.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return notes;
};

const getNoteById = async ({ noteId, userId }) => {
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
};

const updateNote = async ({ noteId, userId, title, content }) => {
  const existingNote = await prisma.note.findFirst({
    where: {
      id: noteId,
      userId,
    },
  });

  if (!existingNote) {
    throw new Error("Note not found.");
  }

  const note = await prisma.note.update({
    where: {
      id: noteId,
    },
    data: {
      title,
      content,
    },
  });

  return note;
};

const deleteNote = async ({ noteId, userId }) => {
  const existingNote = await prisma.note.findFirst({
    where: {
      id: noteId,
      userId,
    },
  });

  if (!existingNote) {
    throw new Error("Note not found.");
  }

  await prisma.note.delete({
    where: {
      id: noteId,
    },
  });
};

module.exports = {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
};