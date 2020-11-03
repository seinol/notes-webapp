import notesService from '../services/notesService';
import { Request, Response } from 'express';

async function index({session}: Request, req: Response) {
    if (session!.ascending === undefined) session!.ascending = true;
    if (session!.showFinished === undefined) session!.showFinished = false;
    if (session!.darkTheme === undefined) session!.darkTheme = false;

    console.log('SortedBy ' + session!.sortedBy);
    console.log('Ascending ' + session!.ascending);
    console.log('ShowFinished ' + session!.showFinished);
    console.log('DarkTheme ' + session!.darkTheme);

    switch (session!.sortedBy) {
        case 'createDate': {
            req.render('index', {
                'notes': await notesService.getAllSortedByCreateDate(session!.ascending, session!.showFinished),
                'darkTheme': session!.darkTheme
            });
            break;
        }
        case 'importance': {
            req.render('index', {
                'notes': await notesService.getAllSortedByImportance(session!.ascending, session!.showFinished),
                'darkTheme': session!.darkTheme
            });
            break;
        }
        case 'dueToDate':
        default: {
            req.render('index', {
                'notes': await notesService.getAllSortedByDueToDate(session!.ascending, session!.showFinished),
                'darkTheme': session!.darkTheme
            });
        }
    }
}

async function setSession({body, session}: Request, req: Response) {
    if (body.sortedBy) {
        if (session!.sortedBy === body.sortedBy) {
            session!.ascending = !session!.ascending;
        } else {
            session!.ascending = true;
            session!.sortedBy = body.sortedBy;
        }
    }

    if (body.ascending) session!.ascending = !session!.ascending;
    if (body.showFinished) session!.showFinished = !session!.showFinished;
    if (body.darkTheme) session!.darkTheme = !session!.darkTheme;

    req.redirect('/');
}

async function showCreate(req: Request, res: Response) {

}

async function create(req: Request, res: Response) {
    res.send('index');
}

async function createSample(req: Request, res: Response) {
    await notesService.createRandomNote();
    res.redirect('/');
}

async function showUpdate(req: Request, res: Response) {

}

async function update(req: Request, res: Response) {

}

async function finishNote(req: Request, res: Response) {

}

async function reset(req: Request, res: Response) {
    await notesService.deleteAll();
    res.redirect('/');
}

export default {index, setSession, showCreate, create, createSample, showUpdate, update, finishNote, reset};
