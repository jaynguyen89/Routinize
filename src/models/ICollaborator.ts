import IPlace from './IPlace';

interface ICollaborator {
    id : string | number,
    avatar : string,
    uniqueId : string,
    firstName : string,
    lastName : string,
    gender : boolean, //true for Male
    title : string | null,
    address : IPlace,
    phoneNumber : string
}

export default ICollaborator;
