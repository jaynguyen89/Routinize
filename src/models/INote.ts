import IPlace from "./IPlace";
import IThing from "./IThing";
import { IFile, IMedia } from "./others";
import INoteSegment from "./INoteSegment";

interface INote extends IThing {
    id : number,
    body? : string,
    attachments : Array<IPlace | IMedia | IFile>,
    segments : Array<INoteSegment>
}

export default INote;
