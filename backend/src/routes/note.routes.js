const express = require("express");

const {
  create,
  getAll,
  getOne,
  update,
  remove,
  exportNotes,
  importNotes,
} = require("../controllers/note.controller");

const { authenticate } = require("../middleware/auth.middleware");
const { validateNote } = require("../middleware/validation.middleware");

const router = express.Router();

router.use(authenticate);

router.get("/", getAll);
router.post("/", validateNote, create);

router.get("/export", exportNotes);
router.post("/import", importNotes);

router.get("/:id", getOne);
router.put("/:id", validateNote, update);
router.delete("/:id", remove);

module.exports = router;