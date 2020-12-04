import IProject from "./IProject";
import ICollaborator from './ICollaborator';

interface ITeam {
    id : number,
    teamCode : string,
    teamName : string,
    coverImage : string | null,
    createdOn : string,
    createdBy : ICollaborator,
    project : IProject | null
}

export default ITeam;