import IProject from "./IProject";

interface ITeam {
    id : number,
    teamCode : string,
    teamName : string,
    coverImage : string,
    createdOn : string
    project : IProject
}

export default ITeam;