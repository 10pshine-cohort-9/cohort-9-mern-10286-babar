const prisma = require("../config/prisma");
const AppError = require("../utils/AppError");

const createNote = async ({ title, content, userId }) => {
  return await prisma.note.create({
    data: { title, content, userId },
  });
};

const getNotes = async (userId, searchQuery) => {
  const where = { userId };

  if (searchQuery) {
    where.OR = [
      { title: { contains: searchQuery, mode: "insensitive" } },
      { content: { contains: searchQuery, mode: "insensitive" } },
    ];
  }

  return await prisma.note.findMany({
    where,
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

// --- NEW EXPORT & IMPORT SERVICES ---
const exportUserNotes = async (userId) => {
  return await prisma.note.findMany({
    where: { userId },
    select: {
      title: true,
      content: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

const importUserNotes = async (userId, notesArray) => {
  if (!Array.isArray(notesArray) || notesArray.length === 0) {
    throw new AppError("Invalid or empty notes array provided for import.", 400);
  }

  const validNotes = notesArray
    .filter((note) => note.title && note.content)
    .map((note) => ({
      title: note.title,
      content: note.content,
      userId: userId,
    }));

  if (validNotes.length === 0) {
    throw new AppError("No valid notes with title and content found to import.", 400);
  }

  const batchResult = await prisma.note.createMany({
    data: validNotes,
    skipDuplicates: true,
  });

  return {
    importedCount: batchResult.count,
    message: `Successfully imported ${batchResult.count} notes.`,
  };
};

module.exports = {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
  exportUserNotes,
  importUserNotes,
};