const express = require("express");

const {
  create,
  getAll,
  getOne,
  update,
  remove,
} = require("../controllers/note.controller");

const { authenticate } = require("../middleware/auth.middleware");

const { validateNote } = require("../middleware/validation.middleware");

const router = express.Router();

router.use(authenticate);

router.get("/", getAll);
router.get("/:id", getOne);
router.post("/", validateNote, create);
router.put("/:id", validateNote, update);
router.delete("/:id", remove);

module.exports = router;