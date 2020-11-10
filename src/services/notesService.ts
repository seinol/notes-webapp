import Datastore from 'nedb-promises';
import Note from './Note';

const db = new Datastore({filename: './data/notes.db', autoload: false});

async function getOne(id: string): Promise<Note> {
    return db.findOne({_id: id});
}

//TODO fix return types for all getAll functions
async function getAllSortedByDueToDate(ascending: boolean, includeFinished: boolean): Promise<any> /*Promise<Nedb.Cursor<Document[]>>*/ {
    if (includeFinished) {
        return db.find({}).sort({_dueToDate: ascending ? 1 : -1});
    }
    return db.find({_finished: {$ne: true}}).sort({_dueToDate: ascending ? 1 : -1});
}

async function getAllSortedByCreateDate(ascending: boolean, includeFinished: boolean): Promise<any> {
    if (includeFinished) {
        return db.find({}).sort({_createDate: ascending ? 1 : -1});
    }
    return db.find({_finished: {$ne: true}}).sort({_createDate: ascending ? 1 : -1});
}

async function getAllSortedByImportance(ascending: boolean, includeFinished: boolean): Promise<any> {
    if (includeFinished) {
        return db.find({}).sort({_importance: ascending ? 1 : -1});
    }
    return db.find({_finished: {$ne: true}}).sort({_importance: ascending ? 1 : -1});
}

async function create(note: Note): Promise<Note> {
    return db.insert(note);
}

async function createRandomNote(): Promise<Note> {
    let testNote = new Note('Note' + Math.floor(Math.random() * 50), 'This is a description',
        Math.floor(Math.random() * 5), new Date('2020-10-15'), new Date(), Math.random() >= 0.5);
    return db.insert(testNote);
}

async function update(id: string, note: Note): Promise<number> {
    return db.update({_id: id}, {$set: {...note}})
}

async function deleteAll(): Promise<number> {
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
    deleteAll
}
