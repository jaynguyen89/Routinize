import ICollaborator from "./ICollaborator";

interface IThing {
    id : number,
    isPersonal : boolean,
    emphasized : boolean,
    title : string,
    createdOn : string,
    assignees : Array<ICollaborator>
}

export default IThing;
