class Note {
    _title: string;
    _description: string;
    _importance: number;
    _createDate: Date;
    _dueToDate: Date;
    _finished: boolean;

    constructor(title: string, description: string, importance: number,
                createDate: Date, dueToDate: Date, finished = false) {
        this._title = title;
        this._description = description;
        this._importance = importance;
        this._createDate = createDate;
        this._dueToDate = dueToDate;
        this._finished = finished;
    }
}

export default Note;
