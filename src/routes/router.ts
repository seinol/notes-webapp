import express from 'express';

import notesController from '../controllers/notesController';

const router = express.Router();

router.get('/', notesController.index);
router.post('/', notesController.setSession);

router.get('/note', notesController.showNote);
router.post('/note', notesController.create);

router.get('/note/:id', notesController.showNote)
router.post('/note/:id', notesController.update);

// Endpoints to make development easier
router.get('/create-note', notesController.createSample);
router.get('/reset', notesController.reset);

export default router;
