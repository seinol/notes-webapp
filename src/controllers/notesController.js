const notesService = require('../services/notesService');

function index(req, res) {
  res.render('index', { title: 'Express' });
}

function getAllNotes(req, res) {
  res.send(JSON.stringify(notesService.getAll()));
}

function getNoteById(req, res) {

}

function createNote(req, res) {
  res.send(notesService.create());
}

function updateNote(req, res) {

}

function finishNote(req, res) {

}

function deleteAll(req, res) {
  notesService.deleteAll();
}

module.exports = {index, getAllNotes, getNoteById, createNote, updateNote, finishNote, deleteAll};
