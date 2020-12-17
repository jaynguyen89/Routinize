interface IAddress {
    id : string | number,
    name : string | null,
    building : string | null,
    street : string | null,
    suburb : string | null,
    postcode : string | null,
    state : string | null,
    country : string | null,
    coordination : ICoordination
}

export default IAddress;

export interface ICoordination {
    lat : number,
    long : number
}

export const refineAddress = (thing : any) : IAddress => {
    return {
        ...thing,
        coordination : {
            lat : thing.latitude,
            long : thing.longitude
        }
    } as IAddress;
}