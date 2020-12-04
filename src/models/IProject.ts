import ICollaborator from "./ICollaborator";

interface IProject {
    id : number,
    projectName : string,
    projectCode : string,
    description : string,
    coverImage : string,
    createdOn : string,
    createdBy : ICollaborator
}

export default IProject;