import { Request, Response } from 'express';
import notesService from '../services/notesService';
import Note from '../services/Note';

async function index({session}: Request, res: Response) {
    if (session!.ascending === undefined) session!.ascending = true;
    if (session!.showFinished === undefined) session!.showFinished = false;
    if (session!.darkTheme === undefined) session!.darkTheme = false;

    switch (session!.sortedBy) {
        case 'createDate': {
            res.render('index', {
                'notes': await notesService.getAllSortedByCreateDate(session!.ascending, session!.showFinished),
                'theme': getTheme(session!.darkTheme),
                'showFinished': session!.showFinished
            });
            break;
        }
        case 'importance': {
            res.render('index', {
                'notes': await notesService.getAllSortedByImportance(session!.ascending, session!.showFinished),
                'theme': getTheme(session!.darkTheme),
                'showFinished': session!.showFinished
            });
            break;
        }
        case 'dueToDate':
        default: {
            res.render('index', {
                'notes': await notesService.getAllSortedByDueToDate(session!.ascending, session!.showFinished),
                'theme': getTheme(session!.darkTheme),
                'showFinished': session!.showFinished
            });
        }
    }
}

async function setSession({body, session}: Request, res: Response) {
    if (body.sortedBy) {
        if (session!.sortedBy === body.sortedBy) {
            session!.ascending = !session!.ascending;
        } else {
            session!.ascending = true;
            session!.sortedBy = body.sortedBy;
        }
    }

    if (body.showFinished) session!.showFinished = !session!.showFinished;
    if (body.darkTheme) session!.darkTheme = !session!.darkTheme;
    res.status(201);
    res.redirect('/');
}

async function showNote({params, session}: Request, res: Response) {
    const note = params.id ? await notesService.getOne(params.id) : {}
    res.render('note', {
        'note': note,
        'theme': getTheme(session!.darkTheme),
        'showFinished': session!.showFinished
    });
}

async function create({body}: Request, res: Response) {
    await notesService.create(
        new Note(body.title, body.description, +body.importance, new Date, new Date(body.dueToDate), !!body.finished)
    );
    res.status(201);
    res.redirect('/');
}

async function createSamples(req: Request, res: Response) {
    await notesService.createRandomNotes();
    res.status(201);
    res.redirect('/');
}

async function update({params, body}: Request, res: Response) {
    const note = await notesService.getOne(params.id);
    note._title = body.title;
    note._description = body.description;
    note._importance = +body.importance;
    note._dueToDate = new Date(body.dueToDate);
    note._finished = !!body.finished;
    await notesService.update(params.id, note);
    res.status(200);
    res.redirect('/');
}

async function reset(req: Request, res: Response) {
    await notesService.deleteAll();
    res.status(200);
    res.redirect('/');
}

function getTheme(darkTheme: boolean) {
    return darkTheme ? 'dark' : 'light';
}

export default {index, setSession, showNote, create, createSamples, update, reset};
