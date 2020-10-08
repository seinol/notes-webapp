const express = require('express');
const router = express.Router();

const notesController = require('./controllers/notesController');

router.get('/', notesController.index);
router.get('/notes', notesController.getAllNotes);
router.post('/notes', notesController.createNote);
router.delete('/notes', notesController.deleteAll)
router.get('/notes/:id', notesController.getNoteById);
router.put('/notes/:id', notesController.updateNote);
router.get('/notes/:id/finish/:state', notesController.finishNote)

module.exports = router;
