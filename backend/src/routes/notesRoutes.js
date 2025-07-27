import express, { Router } from "express"
import { createNotes, deleteNotes, fetchNotes, fetchNotesByID, updateNotes } from "../controllers/notesController.js";

const router = express.Router();

router.get("/", fetchNotes);
router.get("/:id", fetchNotesByID);
router.post("/", createNotes); 
router.put("/:id", updateNotes);
router.delete("/:id", deleteNotes);

export default router;
