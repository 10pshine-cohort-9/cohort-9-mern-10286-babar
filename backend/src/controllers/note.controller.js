const {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
  exportUserNotes,
  importUserNotes,
} = require("../services/note.service");
const AppError = require("../utils/AppError");

const create = async (req, res, next) => {
  try {
    const note = await createNote({
      title: req.body.title,
      content: req.body.content,
      userId: req.user.id,
    });

    // Emit real-time event
    const io = req.app.get("io");
    if (io) {
      io.to(`user_${req.user.id}`).emit("note_created", note);
    }

    return res.status(201).json({
      success: true,
      message: "Note created successfully.",
      data: note,
    });
  } catch (error) {
    return next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const { search } = req.query;
    const notes = await getNotes(req.user.id, search);

    return res.status(200).json({
      success: true,
      data: notes,
    });
  } catch (error) {
    return next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const note = await getNoteById({
      noteId: req.params.id,
      userId: req.user.id,
    });

    return res.status(200).json({
      success: true,
      data: note,
    });
  } catch (error) {
    return next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const note = await updateNote({
      noteId: req.params.id,
      userId: req.user.id,
      title: req.body.title,
      content: req.body.content,
    });

    // Emit real-time event
    const io = req.app.get("io");
    if (io) {
      io.to(`user_${req.user.id}`).emit("note_updated", note);
    }

    return res.status(200).json({
      success: true,
      message: "Note updated successfully.",
      data: note,
    });
  } catch (error) {
    return next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    await deleteNote({
      noteId: req.params.id,
      userId: req.user.id,
    });

    // Emit real-time event
    const io = req.app.get("io");
    if (io) {
      io.to(`user_${req.user.id}`).emit("note_deleted", { id: req.params.id });
    }

    return res.status(200).json({
      success: true,
      message: "Note deleted successfully.",
    });
  } catch (error) {
    return next(error);
  }
};

const exportNotes = async (req, res, next) => {
  try {
    const notes = await exportUserNotes(req.user.id);

    return res.status(200).json({
      success: true,
      count: notes.length,
      data: notes,
    });
  } catch (error) {
    return next(error);
  }
};

const importNotes = async (req, res, next) => {
  try {
    const result = await importUserNotes(req.user.id, req.body.notes);

    // Emit real-time event for bulk import
    const io = req.app.get("io");
    if (io) {
      io.to(`user_${req.user.id}`).emit("notes_imported", { count: result.importedCount });
    }

    return res.status(201).json({
      success: true,
      message: result.message,
      importedCount: result.importedCount,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  create,
  getAll,
  getOne,
  update,
  remove,
  exportNotes,
  importNotes,
};