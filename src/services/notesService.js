const Datastore = require('nedb');
const db = new Datastore({ filename: '../data/notesData.db', autoload: true });

const note = { title: "Task 1",
  description: "Hello World task",
  importance: "5",
  dueTo: "09/22/2020",
  finished: false };

function getAll() {
  db.find({}, function (err, docs) {
    console.log(docs);
    return docs;
  });
}

function getById(id) {

}

function create(payload) {
  db.insert(payload, function (err, doc) {
    console.log(doc);
  })
}

function update(id, payload) {

}

function deleteAll() {
  db.remove({}, { multi: true }, function (err, numRemoved) {
    console.log("removed all")
  });
}

module.exports = {getAll, getById, create, update, deleteAll}
