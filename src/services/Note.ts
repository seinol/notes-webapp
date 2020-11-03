class Note {
    private _title: string;
    private _description: string;
    private _importance: number;
    private _createDate: Date;
    private _dueToDate: Date;
    private _finished: boolean;

    constructor(title: string, description: string, importance: number, createDate: Date, dueToDate: Date, finished = false) {
        this._title = title;
        this._description = description;
        this._importance = importance;
        this._createDate = createDate;
        this._dueToDate = dueToDate;
        this._finished = finished;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get importance(): number {
        return this._importance;
    }

    set importance(value: number) {
        this._importance = value;
    }

    get dueToDate(): Date {
        return this._dueToDate;
    }

    set dueToDate(value: Date) {
        this._dueToDate = value;
    }

    get createdDate(): Date {
        return this._createDate;
    }

    set createdDate(value: Date) {
        this._createDate = value;
    }

    get finished(): boolean {
        return this._finished;
    }

    set finished(value: boolean) {
        this._finished = value;
    }
}

export default Note;
