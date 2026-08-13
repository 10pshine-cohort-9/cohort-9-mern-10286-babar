const {
    createNote,
    getNotes,
    getNoteById,
    updateNote,
    deleteNote,
  } = require("../services/note.service");
  
  const create = async (req, res, next) => {
    try {
      const note = await createNote({
        title: req.body.title,
        content: req.body.content,
        userId: req.user.id,
      });
  
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
      const notes = await getNotes(req.user.id);
  
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
      if (error.message === "Note not found.") {
        return res.status(404).json({
          success: false,
          message: error.message,
        });
      }
  
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
  
      return res.status(200).json({
        success: true,
        message: "Note updated successfully.",
        data: note,
      });
    } catch (error) {
      if (error.message === "Note not found.") {
        return res.status(404).json({
          success: false,
          message: error.message,
        });
      }
  
      return next(error);
    }
  };
  
  const remove = async (req, res, next) => {
    try {
      await deleteNote({
        noteId: req.params.id,
        userId: req.user.id,
      });
  
      return res.status(200).json({
        success: true,
        message: "Note deleted successfully.",
      });
    } catch (error) {
      if (error.message === "Note not found.") {
        return res.status(404).json({
          success: false,
          message: error.message,
        });
      }
  
      return next(error);
    }
  };
  
  module.exports = {
    create,
    getAll,
    getOne,
    update,
    remove,
  };