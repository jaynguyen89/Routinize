interface IPlace {
    id : string | number,
    name : string | null,
    address : string,
    coordination : ICoordination
}

export default IPlace;

export interface ICoordination {
    lat : number,
    long : number
}
