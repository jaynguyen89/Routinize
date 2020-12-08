import IAddress from './IAddress';

interface IAccount {
    username : string | null,
    email : string | null,
    avatar : string | null,
    uniqueId : string | null,
    firstName : string | null,
    lastName : string | null,
    shortName : string | null,
    gender : boolean | null,
    phoneNumber : string | null,
    address : IAddress | null
}

export default IAccount;