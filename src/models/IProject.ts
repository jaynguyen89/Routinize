import ICollaborator from "./ICollaborator";
import { IMedia } from './others';

interface IProject {
    id : number,
    projectName : string,
    projectCode : string,
    description : string,
    coverImage : IMedia | null,
    createdOn : string,
    createdBy : ICollaborator
}

export default IProject;