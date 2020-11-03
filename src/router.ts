import express from 'express';

import notesController from './controllers/notesController';
const router = express.Router();

router.get('/', notesController.index);
router.post('/', notesController.setSession);

router.get('/note', notesController.createSample);
router.post('/note', notesController.create);

router.get('/note/:id', notesController.showUpdate)
router.put('/note/:id', notesController.update);

router.get('/notes/:id/finish/:state', notesController.finishNote)

router.get('/reset', notesController.reset);

export default router;
