import IPlace from "./IPlace";
import IThing from "./IThing";
import { IFile, IMedia } from "./others";
import INote from "./INote";

interface ITodo extends IThing {
    id : number,
    description : string,
    details : string,
    dueDate : string,
    dueTime : string,
    places : Array<IPlace>,
    images : Array<IMedia>,
    files : Array<IFile>,
    related : Array<ITodo | INote>,
    doneDate : string | null
}

export default ITodo;
