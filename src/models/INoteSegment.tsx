import IPlace from "./IPlace";
import { IFile, IMedia } from "./others";

interface INoteSegment {
    id : number,
    body : string,
    places : Array<IPlace> | null,
    attachments : Array<IMedia | IFile> | null
}

export default INoteSegment;
