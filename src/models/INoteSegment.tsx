import IAddress from "./IAddress";
import { IFile, IMedia } from "./others";

interface INoteSegment {
    id : number,
    body : string,
    places : Array<IAddress> | null,
    attachments : Array<IMedia | IFile> | null
}

export default INoteSegment;
