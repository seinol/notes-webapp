import Datastore from 'nedb-promises';
import Note from './Note';

const db = new Datastore({filename: './data/notes.db', autoload: false});

async function getOne(id: string): Promise<Note> {
    return db.findOne({_id: id});
}

//Info: There is a strange problem with nedb, which prevents the correct return type for all three getAll* functions
async function getAllSortedByDueToDate(ascending: boolean, includeFinished: boolean): Promise<any> {
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

async function createRandomNotes(): Promise<Note[]> {
    let testNotes = [];
    for (let i = 0; i < 10; i++) {
        testNotes.push(getRandomNote());
    }
    return db.insert(testNotes);
}

async function update(id: string, note: Note): Promise<number> {
    return db.update({_id: id}, {$set: {...note}})
}

async function deleteAll(): Promise<number> {
    return db.remove({}, {multi: true});
}

function getRandomNote() {
    return new Note('Note' + getRandomNumber(1, 500), 'This is a description',
        getRandomNumber(1, 5), new Date('2020-10-15'), new Date(), Math.random() >= 0.5);
}

function getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default {
    getAllSortedByDueToDate,
    getAllSortedByCreateDate,
    getAllSortedByImportance,
    getOne,
    create,
    createRandomNotes,
    update,
    deleteAll
}
