import IPlace from "./IPlace";
import {IFile, IMedia} from "./others";

interface INoteSegment {
    id : number,
    title? : string,
    body : string,
    attachments : Array<IPlace | IMedia | IFile>
}

export default INoteSegment;
