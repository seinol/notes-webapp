import Datastore from 'nedb-promises';
import Note from './Note'

const db = new Datastore({filename: './data/notes.db', autoload: false});

async function getOne(id: number) {
    return db.findOne({_id: id});
}

async function getAllSortedByDueToDate(ascending: boolean, includeFinished: boolean) {
    if (includeFinished) {
        return db.find({}).sort({_dueToDate: ascending ? 1 : -1});
    }
    return db.find({_finished: {$ne: true}}).sort({_dueToDate: ascending ? 1 : -1});
}

async function getAllSortedByCreateDate(ascending: boolean, includeFinished: boolean) {
    if (includeFinished) {
        return db.find({}).sort({_createDate: ascending ? 1 : -1});
    }
    return db.find({_finished: {$ne: true}}).sort({_createDate: ascending ? 1 : -1});
}

async function getAllSortedByImportance(ascending: boolean, includeFinished: boolean) {
    if (includeFinished) {
        return db.find({}).sort({_importance: ascending ? 1 : -1});
    }
    return db.find({_finished: {$ne: true}}).sort({_importance: ascending ? 1 : -1});
}

async function create(note: Note) {
    return db.insert(note);
}

async function createRandomNote() {
    let testNote = new Note('Note' + Math.floor(Math.random() * 50), 'This is a description',
        Math.floor(Math.random() * 5), new Date(), new Date(), Math.random() >= 0.5);
    return db.insert(testNote);
}

async function update(id: number, note: Note) {
    return db.update({_id: id}, {$set: {...note}})
}

async function updateFinished(id: number, finished: boolean) {
    return db.update({_id: id}, {$set: {finished: finished}})
}

async function deleteAll() {
    return db.remove({}, {multi: true});
}

export default {
    getAllSortedByDueToDate,
    getAllSortedByCreateDate,
    getAllSortedByImportance,
    getOne,
    create,
    createRandomNote,
    update,
    updateFinished,
    deleteAll
}
