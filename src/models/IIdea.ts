import ICollaborator from "./ICollaborator";

interface IIdea {
    id : number,
    author : ICollaborator,
    isPersonal : boolean,
    content : string,
    createdOn : string
}

export default IIdea;
