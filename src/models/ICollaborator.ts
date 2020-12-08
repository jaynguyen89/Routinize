import IAddress from './IAddress';

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
    address : IAddress,
    phoneNumber : string
}

export default ICollaborator;
