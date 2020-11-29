import IPlace from "./IPlace";

interface ICollaborator {
    id : string | number,
    firstName : string,
    lastName : string,
    gender : boolean, //true for Male
    title : string | null,
    address : IPlace,
    phoneNumber : string
}

export default ICollaborator;
