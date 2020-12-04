import ICollaborator from "./ICollaborator";

interface IThing {
    id : number,
    author : ICollaborator | null,
    isPersonal : boolean,
    emphasized : boolean,
    title : string | null,
    createdOn : string
}

export default IThing;
