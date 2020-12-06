import ITeam from '../../../../models/ITeam';

export interface IMyTeams {
    settings : any,
    navigation : any,
    teams : Array<ITeam>
}

export interface ITeamCard {
    key? : number,
    settings : any,
    navigation? : any,
    team : ITeam
}