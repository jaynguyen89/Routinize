import ICollaborator from "./ICollaborator";

interface IThing {
    id : number,
    author : ICollaborator,
    isPersonal : boolean,
    emphasized : boolean,
    title : string | null,
    createdOn : string,
    assignees : Array<ICollaborator>
}

export default IThing;
