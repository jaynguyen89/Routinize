import IPlace from './IPlace';

interface ICollaborator {
    id : string | number,
    email : string,
    avatar : string | null,
    uniqueId : string,
    firstName : string,
    lastName : string,
    shortName : string | null,
    gender : boolean, //true for Male
    title : string,
    address : IPlace,
    phoneNumber : string
}

export default ICollaborator;
